package com.example.forumapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;

import com.google.firebase.auth.FirebaseAuth;

public class RegistrateActivity extends AppCompatActivity {
    EditText mEmailadress,mWachtwoord,mWachtwoord_confire;
    Button registratieButton;
    FirebaseAuth fAuth;
    ProgressBar progressBar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registrate);

        mEmailadress = findViewById(R.id.emailadress);
        mWachtwoord = findViewById(R.id.wachtwoord);
        mWachtwoord_confire = findViewById(R.id.confirewachtwoord);
        registratieButton = findViewById(R.id.Registratie_Button);
        fAuth = FirebaseAuth.getInstance();
        progressBar = findViewById(R.id.progressBar);

        registratieButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email = mEmailadress.getText().toString().trim();
                String wachtwoord = mWachtwoord.getText().toString().trim();
                String wachtwoord_confire = mWachtwoord_confire.getText().toString().trim();

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
            }
        });
    }
}