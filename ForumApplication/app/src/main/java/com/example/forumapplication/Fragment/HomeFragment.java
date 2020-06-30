package com.example.forumapplication.Fragment;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
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
import com.example.forumapplication.Data.HomeItem;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class HomeFragment extends Fragment {
    private DrawerLayout drawerLayout;
    private RecyclerView recyclerView;
    private homeItemAdapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    public JSONObject jsonObject;
    public String category;
    public ArrayList<HomeItem> home_items_list;
    public HomeItem item;
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

                        recyclerView.setLayoutManager(mLayoutManager);
                        recyclerView.setAdapter(mAdapter);
                        
                        category = jsonObject.getString("category");
                        Log.e("Voorbeeld", category);
                        
                        item = new HomeItem(R.drawable.ic_post, category); //HomeItem
                        item.setId(jsonObject.getString("id"));

                        home_items_list.add(item);
                        System.out.println(category);


                        Log.e("Home_item", item.toString());
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
        mAdapter = new homeItemAdapter(home_items_list);
        mAdapter.setOnItemClickListener(new homeItemAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(int position) {
                Fragment fragment ;
                //ArrayList<HomeItem> temp = new ArrayList<>();
                // call naar de backend met de id van de categorie waar je op hebt geklikt
                // vervolgens vul je de arraylist met de reponse
                // daarmee maak je een nieuwe main

                System.out.println(home_items_list.get(position));
                if(home_items_list.get(position).equals("Fitness")){
                    getActivity().getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,new FitnessFragment()).commit();
                }else if(home_items_list.get(position).equals("Voetbal")){
                    getActivity().getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,new VoetballFragment()).commit();
                }
              /*HomeItem tmp = home_items_list.get(position);
                String url = String.format("http://192.168.178.103:4000/categories/%s/posts", tmp.getID() );
                MyPostsFragment mypostFragment = new MyPostsFragment();
                mypostFragment.getPostData(url);
                getActivity().getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,mypostFragment).commit();

                 */
                /*
                switch (category) {
                    case "Voetbal":fragment = new VoetballFragment();
                        break;
                    case "Fitness": fragment = new FitnessFragment();
                        break;
                    default:fragment = new Fragment();
                }
                getActivity().getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,fragment).commit();
             */

            }
        });
    }
}
