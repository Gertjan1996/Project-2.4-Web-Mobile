package com.example.forumapplication.Activities;

import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.forumapplication.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class PostAanMakenActivity extends AppCompatActivity {
   private EditText editCategorie;
   private EditText editBody;
   private Button verzendButton;
   private String categorie;
   private String body;
   public String token;

   public String url = "http://192.168.178.103:4000/categories/";
   public static String categorieID;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_post_aanmaken);
        token = getIntent().getStringExtra("Token");
        Log.e("Token",token);
        editCategorie= findViewById(R.id.postCategorie);
        editBody = findViewById(R.id.postBody);
        verzendButton = findViewById(R.id.verzendButton);

        verzendButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                categorie = editCategorie.getText().toString().trim();
                body = editBody.getText().toString().trim();
                if(TextUtils.isEmpty(categorie)){
                    editCategorie.setError("De categorie mag niet leeg zijn.");
                    return;
                }
                if(TextUtils.isEmpty(body)){
                    editBody.setError("De postbody mag niet leeg zijn.");
                    return;
                }
                try {
                    SendPostAanmakenRequest();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public void SendPostAanmakenRequest() throws JSONException {
        JSONObject jsonObject= new JSONObject();
        jsonObject.put("text",body);
        String post_plaatsenUrl;
        String getCategorieIDUrl = url+categorie;
        final RequestQueue requestQueue = Volley.newRequestQueue(this);
        StringRequest stringRequest = new StringRequest(Request.Method.GET, getCategorieIDUrl, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                categorieID = response;
                System.out.println(response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(PostAanMakenActivity.this, "Mislukt", Toast.LENGTH_SHORT).show();
            }
        });
        requestQueue.add(stringRequest);
        System.out.println(categorie);
        if(categorieID!=null) {
            post_plaatsenUrl = String.format("http://192.168.178.103:4000/categories/%s/posts", categorieID.substring(1, 25));
            System.out.println(jsonObject.toString());
            RequestQueue queue = Volley.newRequestQueue(this);
            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, post_plaatsenUrl, jsonObject, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Log.e("verzonden post", response.toString());
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(PostAanMakenActivity.this, "Verzenden mislukt", Toast.LENGTH_SHORT).show();
                }
            }) {
                @Override
                public Map<String, String> getHeaders() {
                    Map<String, String> header = new HashMap<String, String>();
                    header.put("Content-Type", "application/json");
                    header.put("Token", "Bearer" + token);
                    return header;
                }

            };
            queue.add(jsonObjectRequest);
        }
    }
}
