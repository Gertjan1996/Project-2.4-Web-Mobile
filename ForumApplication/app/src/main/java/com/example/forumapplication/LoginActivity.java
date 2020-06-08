package com.example.forumapplication;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;

public class LoginActivity extends AppCompatActivity {
    EditText mGebruiksnaam,mWachtwoord;
    Button mLoginBtn;
    FirebaseAuth firebaseAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mGebruiksnaam = findViewById(R.id.gebruiksnaam);
        mWachtwoord = findViewById(R.id.type_wachtwoord);
        mLoginBtn = findViewById(R.id.LoginButton);
        firebaseAuth = FirebaseAuth.getInstance();

        mLoginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String gebruiksnaam = mGebruiksnaam.getText().toString().trim();
                String wachtwoord = mWachtwoord.getText().toString().trim();
                if(TextUtils.isEmpty(gebruiksnaam)){
                    mGebruiksnaam.setError("Uw emailadress mag niet leeg zijn.");
                    return;
                }
                if(TextUtils.isEmpty(wachtwoord)){
                    mWachtwoord.setError("Uw wachtwoord mag niet leeg zijn.");
                    return;
                }
                //authenticatie login
                firebaseAuth.signInWithEmailAndPassword(gebruiksnaam,wachtwoord).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if(task.isSuccessful()){
                            Toast.makeText(LoginActivity.this, "U bent ingelogd",Toast.LENGTH_SHORT).show();
                            startActivity(new Intent(getApplicationContext(),MainActivity.class));
                        }else{
                            Toast.makeText(LoginActivity.this, "Ongedige gebruiksgegevens",Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        });
    }


    public void Registeren(View view){
        startActivity(new Intent(getApplicationContext(),RegistrateActivity.class));
    }

}
