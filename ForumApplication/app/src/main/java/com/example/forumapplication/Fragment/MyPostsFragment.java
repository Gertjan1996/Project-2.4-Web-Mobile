package com.example.forumapplication.Fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.example.forumapplication.Adapter.PostItemAdapter;
import com.example.forumapplication.Data.PostItem;
import com.example.forumapplication.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MyPostsFragment extends Fragment {

    private TextView posts;
    public  String postdata;
    public  String postUserID;
    private RecyclerView recyclerView;
    private RecyclerView.LayoutManager mLayoutManager;
    private RecyclerView.Adapter mAdapter;
    public PostItem post_item;
    public ArrayList<PostItem>post_itemsArrayList;
    public static String posts_endpoint = "http://192.168.178.103:4000/posts";
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View root = inflater .inflate(R.layout.fragment_my_posts, container, false);
        post_itemsArrayList = new ArrayList<>();
        recyclerView =(RecyclerView)root.findViewById(R.id.post_recycleView);
        recyclerView.setHasFixedSize(true);
        mLayoutManager = new LinearLayoutManager(getContext());

        getPostData();
        return root;
    }

    public void getPostData() {
        getPostData(posts_endpoint);
    }

    public void getPostData(String url){
        RequestQueue requestQueue = Volley.newRequestQueue(getActivity().getApplicationContext());
        JsonArrayRequest jsonArrayRequest=  new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                for (int i = 0; i < response.length(); i++) {
                    try {
                        JSONObject jsonObject = response.getJSONObject(i);
                        recyclerView.setLayoutManager(mLayoutManager);
                        recyclerView.setAdapter(mAdapter);
                        postUserID = jsonObject.getString("user");
                        postdata = jsonObject.getString("text");

                        post_item = new PostItem(postUserID,postdata);
                        post_itemsArrayList.add(post_item);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });
        requestQueue.add(jsonArrayRequest);
        mAdapter = new PostItemAdapter(post_itemsArrayList);
    }

}
