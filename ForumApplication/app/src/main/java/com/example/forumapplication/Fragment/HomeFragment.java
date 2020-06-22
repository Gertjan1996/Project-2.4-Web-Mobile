package com.example.forumapplication.Fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.forumapplication.Activities.itemAdapter;
import com.example.forumapplication.R;
import com.example.forumapplication.Data.home_items;

import java.util.ArrayList;

public class HomeFragment extends Fragment {
    private DrawerLayout drawerLayout;
    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home,container,false);
        ArrayList<home_items> home_items_list = new ArrayList<>();
        home_items_list.add(new home_items(R.drawable.voetball,"Voetball"));
        home_items_list.add(new home_items(R.drawable.basketball,"Basketball"));
        home_items_list.add(new home_items(R.drawable.veldhockey,"Veldhockey"));
        home_items_list.add(new home_items(R.drawable.swim,"Swimming"));
        home_items_list.add(new home_items(R.drawable.volleyball,"Volleyball"));
        recyclerView =(RecyclerView)view.findViewById(R.id.recycle_view);
        recyclerView.setHasFixedSize(true);
        mLayoutManager = new LinearLayoutManager(getContext());
        mAdapter = new itemAdapter(home_items_list);
        recyclerView.setLayoutManager(mLayoutManager);
        recyclerView.setAdapter(mAdapter);
        return view;
    }
}
