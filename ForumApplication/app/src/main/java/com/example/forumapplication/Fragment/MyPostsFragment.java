package com.example.forumapplication.Fragment;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.forumapplication.Activities.MainActivity;
import com.example.forumapplication.R;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Objects;
import java.util.zip.Inflater;

public class MyPostsFragment extends Fragment {
private TextView posts;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        ViewGroup root = (ViewGroup)inflater .inflate(R.layout.fragment_my_posts, container, false);
        posts = (TextView)root.findViewById(R.id.post_text);
        return root;
    }
/*
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {

        String post;
        Bundle bundle = getArguments();
        Log.e("Hoi",bundle.toString());
        if(bundle!=null){
            post = bundle.getString("post");
            posts.setText(post);
        }
        }
*/
    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        String post;
        Bundle bundle = getArguments();
        Log.e("Hoi", bundle.toString());
        if (bundle != null) {
            post = bundle.getString("post");
            posts.setText(post);
        }
    }
}
