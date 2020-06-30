package com.example.forumapplication.Fragment;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.forumapplication.R;

public class ProfileFragment extends Fragment {
    public TextView posts;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        ViewGroup root = (ViewGroup) inflater.inflate(R.layout.fragment_my_posts, container, false);
        posts = (TextView) root.findViewById(R.id.test_text);
        Bundle bundle = getArguments();
        Log.e("Bundle",bundle.toString());
        if (bundle != null) {
            String post = bundle.getString("Hoi");
            posts.setText(post);

        }
        return root;
    }
/*
    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        String post;
        Bundle bundle = getArguments();
        if (bundle != null) {
            post = bundle.getString("Hoi");
            posts.setText(post);
        }
    }*/


}
