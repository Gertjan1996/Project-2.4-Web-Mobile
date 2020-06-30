package com.example.forumapplication.Activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import com.example.forumapplication.Fragment.ChatFragment;
import com.example.forumapplication.Fragment.HomeFragment;
import com.example.forumapplication.Fragment.MyPostsFragment;
import com.example.forumapplication.Fragment.ProfileFragment;
import com.example.forumapplication.R;
import com.google.android.material.navigation.NavigationView;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {
    private DrawerLayout drawerLayout;
    public HomeFragment homeFragment;
    public  Bundle data;
    public static String posts_endpoint = "http://192.168.178.21:4000/categories/5ef4f70491afe34b30c67726/posts";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar toolbar = findViewById(R.id.tool_bar);
        setSupportActionBar(toolbar);
        drawerLayout = findViewById(R.id.drawer_layout);
        NavigationView navigationView = findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this,drawerLayout,toolbar,R.string.navigation_drawer_open,
                R.string.navigation_drawer_close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();
        if(savedInstanceState == null) {
            homeFragment = new HomeFragment();
            getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container, homeFragment).commit();
            navigationView.setCheckedItem(R.id.nav_poster);
        }

    }

    @Override
    public void onBackPressed() {
        if(drawerLayout.isDrawerOpen(GravityCompat.START)){
            drawerLayout.closeDrawer(GravityCompat.START);
        }else {
            super.onBackPressed();
        }
    }

    public void logout(View view){
        Toast.makeText(this, "U bent uitgelogd", Toast.LENGTH_SHORT).show();
        startActivity(new Intent(getApplicationContext(),LoginActivity.class));
        finish();
    }


    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()){
            case R.id.nav_home:
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,new HomeFragment()).commit();
                break;
            case R.id.nav_poster:

                MyPostsFragment mypostFragment = new MyPostsFragment();
               // mypostFragment.getPostData();
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,mypostFragment).commit();
                break;
            case R.id.nav_chat:
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,new ChatFragment()).commit();
                break;
            case R.id.nav_profile:
                ProfileFragment profileFragment = new ProfileFragment();
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,profileFragment).commit();
                break;
            case R.id.nav_postAanmaken:
                String token = getIntent().getStringExtra("Token");
                Intent intent = new Intent(MainActivity.this,PostAanMakenActivity.class);
                intent.putExtra("Token",token);
                startActivity(intent);
                break;
            case R.id.LogOut:
                logout(null);
        }
        drawerLayout.closeDrawer(GravityCompat.START);
        return true;
    }

}
