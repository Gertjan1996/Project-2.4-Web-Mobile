package com.example.forumapplication;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public  class itemAdapter extends RecyclerView.Adapter<itemAdapter.ItemViewHolder> {
    private ArrayList<home_items>mHome_item_list;

    public static class  ItemViewHolder extends RecyclerView.ViewHolder{
        public ImageView mImageView;
        public TextView mTextView;

        public ItemViewHolder(@NonNull View itemView) {
            super(itemView);
            mImageView = itemView.findViewById(R.id.image_view);
            mTextView = itemView.findViewById(R.id.text_view);

        }
    }
    public itemAdapter(ArrayList<home_items>item_list){
        mHome_item_list = item_list;
    }

    @NonNull
    @Override
    public ItemViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.sport_item,parent,false);
        ItemViewHolder ivh =  new ItemViewHolder(v);
        return ivh;
    }

    @Override
    public void onBindViewHolder(@NonNull ItemViewHolder holder, int position) {
            home_items currentItem = mHome_item_list.get(position);
            holder.mImageView.setImageResource(currentItem.getImageResource());
            holder.mTextView.setText(currentItem.getText());
    }

    @Override
    public int getItemCount() {
        return mHome_item_list.size();
    }


}
