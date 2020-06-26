package com.example.forumapplication.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.forumapplication.Fragment.MyPostsFragment;
import com.example.forumapplication.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

public class TestActivity extends AppCompatActivity {
    public static String posts_endpoint = "http://192.168.178.21:4000/posts";
    public TextView textView;
    String hoi;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
        textView = findViewById(R.id.test_post);
        String data = getIntent().getStringExtra("post_Text");
        textView.setText(data);
        //getPostData();
    }
    private void getPostData() {
        final RequestQueue requestQueue = Volley.newRequestQueue(this);
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, posts_endpoint, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                    try {
                        JSONObject jsonObject = response.getJSONObject(0);
                        hoi = jsonObject.getString("text");
                        textView.setText(hoi);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
            }

        } ,new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
            }
        });
        requestQueue.add(jsonArrayRequest);
    }
}