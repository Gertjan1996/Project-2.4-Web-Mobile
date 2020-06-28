package com.example.forumapplication.Activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.example.forumapplication.Fragment.ChatFragment;
import com.example.forumapplication.Fragment.HomeFragment;
import com.example.forumapplication.Fragment.MyPostsFragment;
import com.example.forumapplication.Fragment.ProfileFragment;
import com.example.forumapplication.R;
import com.google.android.material.navigation.NavigationView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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
                //startActivity();
                MyPostsFragment mypostFragment = new MyPostsFragment();
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,mypostFragment).commit();
                break;
            case R.id.nav_chat:
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,new ChatFragment()).commit();
                break;
            case R.id.nav_profile:
                ProfileFragment profileFragment = new ProfileFragment();

                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,profileFragment).commit();

                break;
            case R.id.LogOut:
                logout(null);
        }
        drawerLayout.closeDrawer(GravityCompat.START);
        return true;
    }
    public Bundle getPostData() {

        final RequestQueue requestQueue = Volley.newRequestQueue(this);
        data = new Bundle();
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, posts_endpoint, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                try {
                    JSONObject jsonObject = response.getJSONObject(0);
                   String post = jsonObject.getString("text");
                   data.putString("post",post);
                    /*Bundle post_bundle = new Bundle();
                    post_bundle.putString("post_text", post_body);
                    MyPostsFragment myPostsFragment = new MyPostsFragment();
                    myPostsFragment.setArguments(post_bundle);

                    Log.e("tips", post_bundle.toString());
                     */
                    Log.e("Hi",data.toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
            }
        });

        requestQueue.add(jsonArrayRequest);
        return data;
    }

}
