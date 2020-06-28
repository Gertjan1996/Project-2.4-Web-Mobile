package com.example.forumapplication.Adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.forumapplication.Data.post_items;
import com.example.forumapplication.R;

import java.util.ArrayList;

public class PostItemAdapter extends RecyclerView.Adapter<PostItemAdapter.PostItemViewHolder> {
    private ArrayList<post_items>post_itemsArrayList;
    public static class PostItemViewHolder extends RecyclerView.ViewHolder{
        public TextView mTextView1;
        public TextView mTextView2;
        public PostItemViewHolder(View itemView){
            super(itemView);
            mTextView1 = itemView.findViewById(R.id.post_title);
            mTextView2 = itemView.findViewById(R.id.post_body);
        }
    }

    public PostItemAdapter(ArrayList<post_items>mPost_ItemsArrayList){ post_itemsArrayList=mPost_ItemsArrayList;}
    @NonNull
    @Override
    public PostItemViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.post_item,parent,false);
        PostItemViewHolder postItemViewHolder = new PostItemViewHolder(v);
        return postItemViewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull PostItemViewHolder holder, int position) {
        post_items currentItem =  post_itemsArrayList.get(position);
        holder.mTextView1.setText(currentItem.getPost_title());
        holder.mTextView2.setText(currentItem.getPost_body());
    }

    @Override
    public int getItemCount() {
        return post_itemsArrayList.size();
    }


}
