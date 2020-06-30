package com.example.forumapplication.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.forumapplication.Fragment.HomeFragment;
import com.example.forumapplication.R;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {
    EditText mGebruiksnaam,mWachtwoord;
    Button mLoginBtn;

    String email;
    String password;
    public static String signin_endpoint = "http://192.168.178.103:4000/users/authenticate";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mGebruiksnaam = findViewById(R.id.gebruiksnaam);
        mWachtwoord = findViewById(R.id.type_wachtwoord);
        mLoginBtn = findViewById(R.id.LoginButton);


        mLoginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                 email = mGebruiksnaam.getText().toString().trim();
                 password = mWachtwoord.getText().toString().trim();
                if(TextUtils.isEmpty(email)){
                    mGebruiksnaam.setError("Uw emailadress mag niet leeg zijn.");
                    return;
                }
                if(TextUtils.isEmpty(password)){
                    mWachtwoord.setError("Uw wachtwoord mag niet leeg zijn.");
                    return;
                }
                sendSignInRequest();
            }
        });
    }

    private void sendSignInRequest() {
        try {
            JSONObject obj = new JSONObject();
            //obj.put("email", "email");
            obj.put("password", password);
            obj.put("username",email);
            obj.put("returnSecureToken", true);
            final RequestQueue requestQueue = Volley.newRequestQueue(this);
            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, signin_endpoint, obj, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {

                    try {
                        Log.e("Respsonse:", response.toString());
                        String token = response.getString("token");
                        Log.e("Toooooken",token);
                        Intent intent = new Intent(LoginActivity.this,MainActivity.class);
                        intent.putExtra("Token",token);
                        startActivity(intent);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }


                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(getApplicationContext(), "Incorrect gebruiksgegevens", Toast.LENGTH_SHORT).show();
                    Log.e("Error",error.toString());
                }
            });
            requestQueue.add(jsonObjectRequest);
        }catch (Exception e){
            Log.e("Werk niet","Shit");
        }
    }


    public void Registeren(View view){
        startActivity(new Intent(getApplicationContext(),RegistrateActivity.class));
    }


}
