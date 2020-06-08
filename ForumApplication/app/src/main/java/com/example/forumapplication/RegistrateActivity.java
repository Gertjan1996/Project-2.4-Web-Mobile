package com.example.forumapplication;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
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

        //controleer of de gebruiker al ingelogd of geregistreerd is
        if(fAuth.getCurrentUser()!= null){
            startActivity(new Intent(getApplicationContext(),MainActivity.class));
            finish();
        }

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

                //Registreren de gebruiker in de firebase
                fAuth.createUserWithEmailAndPassword(email,wachtwoord).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if(task.isSuccessful()){
                            Toast.makeText(RegistrateActivity.this, "Uw account is geregistreerd",Toast.LENGTH_SHORT).show();
                            startActivity(new Intent(getApplicationContext(),MainActivity.class));
                        }else{
                            Toast.makeText(RegistrateActivity.this, "Foutmelding!"+task.getException().getMessage(),Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        });
    }
}