package com.example.forumapplication.Fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.forumapplication.R;

import java.util.Objects;

public class MyPostsFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        final RequestQueue requestQueue = Volley.newRequestQueue(requireActivity().getApplicationContext());
        //JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,)
        return inflater.inflate(R.layout.fragment_my_posts,container,false);

    }
}
