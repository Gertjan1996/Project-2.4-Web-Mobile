package com.example.forumapplication.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.forumapplication.R;
import com.google.firebase.auth.FirebaseAuth;

import org.json.JSONObject;

public class RegistrateActivity extends AppCompatActivity {
    EditText mEmailadress,mWachtwoord,mWachtwoord_confire,mUsernaem;
    Button registratieButton;
    FirebaseAuth fAuth;
    ProgressBar progressBar;
    String email,wachtwoord,wachtwoord_confire,username;
    public static String signup_endpoint = "http://192.168.178.21:4000/users/register";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registrate);

        mEmailadress = findViewById(R.id.emailadress);
        mWachtwoord = findViewById(R.id.wachtwoord);
        mWachtwoord_confire = findViewById(R.id.confirewachtwoord);
        registratieButton = findViewById(R.id.Registratie_Button);
        mUsernaem = findViewById(R.id.username);
        progressBar = findViewById(R.id.progressBar);

        registratieButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                email = mEmailadress.getText().toString().trim();
                wachtwoord = mWachtwoord.getText().toString().trim();
                wachtwoord_confire = mWachtwoord_confire.getText().toString().trim();
                username = mUsernaem.getText().toString().trim();
                if(TextUtils.isEmpty(email)){
                    mEmailadress.setError("Uw emailadress mag niet leeg zijn.");
                    return;
                }
                if(TextUtils.isEmpty(wachtwoord)){
                    mWachtwoord.setError("Uw wachtwoord mag niet leeg zijn.");
                    return;
                }
                if(!wachtwoord_confire.equals(wachtwoord)){
                    mWachtwoord_confire.setError("Wachtwoord is niet gelijk.");
                }
                if(wachtwoord.length()< 6){
                    mWachtwoord.setError("Uw wachtwoord moet langer dan 6 karakters zijn");
                    return;
                }
                progressBar.setVisibility(View.VISIBLE);

                //Registreren de gebruiker
                Registratie();
            }
        });
    }
    private void Registratie(){
        try {
            JSONObject obj = new JSONObject();
            obj.put("email",email );
            obj.put("password",wachtwoord);
            obj.put("username",username);
            obj.put("returnSecureToken", true);
            final RequestQueue requestQueue = Volley.newRequestQueue(this);
            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, signup_endpoint, obj, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    startActivity(new Intent(getApplicationContext(),LoginActivity.class));
                    Log.e("Respsonse:", response.toString());
                    Toast.makeText(RegistrateActivity.this, "U bent geregistreed", Toast.LENGTH_SHORT).show();
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(getApplicationContext(), "De geregistreerde account bestaat al", Toast.LENGTH_SHORT).show();
                    Log.e("Error",error.toString());
                }
            });
            requestQueue.add(jsonObjectRequest);
        }catch (Exception e){
            Log.e("Werk niet","Shit");
        }
    }
}