package com.example.forumapplication.Activities;

import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.constraintlayout.widget.ConstraintLayout;

import android.os.Bundle;

import com.example.forumapplication.R;

public class HomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        Toolbar toolbar = findViewById(R.id.tool);
        setSupportActionBar(toolbar);
        ConstraintLayout constraintLayout = findViewById(R.id.constraintlayout);
        //ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this,constraintLayout,toolbar,R.string.)
    }
}