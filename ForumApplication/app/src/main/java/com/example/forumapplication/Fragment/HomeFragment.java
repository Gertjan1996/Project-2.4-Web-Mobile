package com.example.forumapplication.Fragment;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.forumapplication.Activities.homeItemAdapter;
import com.example.forumapplication.R;
import com.example.forumapplication.Data.home_items;

import java.util.ArrayList;
import java.util.Objects;

public class HomeFragment extends Fragment {
    private DrawerLayout drawerLayout;
    private RecyclerView recyclerView;
    private homeItemAdapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home,container,false);
        final ArrayList<home_items> home_items_list = new ArrayList<>();
        home_items_list.add(new home_items(R.drawable.voetball,"Voetball"));
        home_items_list.add(new home_items(R.drawable.basketball,"Basketball"));
        home_items_list.add(new home_items(R.drawable.veldhockey,"Veldhockey"));
        home_items_list.add(new home_items(R.drawable.swim,"Swimming"));
        home_items_list.add(new home_items(R.drawable.volleyball,"Volleyball"));
        recyclerView =(RecyclerView)view.findViewById(R.id.recycle_view);
        recyclerView.setHasFixedSize(true);
        mLayoutManager = new LinearLayoutManager(getContext());
        mAdapter = new homeItemAdapter(home_items_list);
        recyclerView.setLayoutManager(mLayoutManager);
        recyclerView.setAdapter(mAdapter);
        mAdapter.setOnItemClickListener(new homeItemAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(int position) {
                System.out.println(home_items_list.toString());
            }
        });
        return view;
    }
}
