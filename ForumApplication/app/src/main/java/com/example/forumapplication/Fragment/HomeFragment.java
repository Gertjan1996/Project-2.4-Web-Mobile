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
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.example.forumapplication.Activities.homeItemAdapter;
import com.example.forumapplication.R;
import com.example.forumapplication.Data.home_items;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Objects;

public class HomeFragment extends Fragment {
    private DrawerLayout drawerLayout;
    private RecyclerView recyclerView;
    private homeItemAdapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    public JSONObject jsonObject;
    public String categorien;
    public ArrayList<home_items> home_items_list;
    public home_items items;
    private static String categorien_End_point = " http://192.168.178.103:4000/categories";
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home,container,false);
        home_items_list = new ArrayList<>();
/*
        home_items_list.add(new home_items(R.drawable.voetball,"Voetball"));
        home_items_list.add(new home_items(R.drawable.basketball,"Basketball"));
        home_items_list.add(new home_items(R.drawable.veldhockey,"Veldhockey"));
        home_items_list.add(new home_items(R.drawable.swim,"Swimming"));
        home_items_list.add(new home_items(R.drawable.volleyball,"Volleyball"));
        Log.e(" hi",home_items_list.toString());
*/      recyclerView =(RecyclerView)view.findViewById(R.id.recycle_view);
        recyclerView.setHasFixedSize(true);
        mLayoutManager = new LinearLayoutManager(getContext());
        getCategorien();


        return view;
    }
    public void getCategorien(){
        final RequestQueue requestQueue = Volley.newRequestQueue(getActivity().getApplicationContext());
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, categorien_End_point, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                System.out.println(response.toString());
                for (int i = 0; i < response.length(); i++) {
                    try {
                        jsonObject= response.getJSONObject(i);
                        mAdapter = new homeItemAdapter(home_items_list);
                        recyclerView.setLayoutManager(mLayoutManager);
                        recyclerView.setAdapter(mAdapter);

                        categorien = jsonObject.getString("category");
                        mAdapter.setOnItemClickListener(new homeItemAdapter.OnItemClickListener() {
                            @Override
                            public void onItemClick(int position) {
                                Log.e("Categorien",categorien);
                                if(categorien.equals("Voetbal")){
                                   getActivity().getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,new VoetballFragment()).commit();
                               }
                            }
                        });
                        items = new home_items(R.drawable.ic_post,categorien);

                        home_items_list.add(items);


                        Log.e("Home_item",items.toString());
                        Log.e("list",home_items_list.toString());

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
    }
}
