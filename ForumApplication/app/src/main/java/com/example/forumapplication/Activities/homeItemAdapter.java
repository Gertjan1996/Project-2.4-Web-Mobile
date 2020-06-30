package com.example.forumapplication.Activities;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.forumapplication.R;
import com.example.forumapplication.Data.HomeItem;

import java.util.ArrayList;

public  class homeItemAdapter extends RecyclerView.Adapter<homeItemAdapter.ItemViewHolder> {
    private ArrayList<HomeItem>mHome_item_list;
    private OnItemClickListener mListener;
    public interface OnItemClickListener{
        void onItemClick(int position);
    }
    public void setOnItemClickListener(OnItemClickListener listener){
        mListener = listener;
    }
    public static class  ItemViewHolder extends RecyclerView.ViewHolder{
        public ImageView mImageView;
        public TextView mTextView;

        public ItemViewHolder(@NonNull View itemView, final OnItemClickListener listener) {
            super(itemView);
            mImageView = itemView.findViewById(R.id.image_view);
            mTextView = itemView.findViewById(R.id.text_view);
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if(listener!=null){
                        int position = getAdapterPosition();
                        if(position!=RecyclerView.NO_POSITION){
                            listener.onItemClick(position);
                        }
                    }
                }
            });
        }
    }
    public homeItemAdapter(ArrayList<HomeItem> item_list){
        mHome_item_list = item_list;
    }

    @NonNull
    @Override
    public ItemViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.sport_item,parent,false);
        ItemViewHolder ivh =  new ItemViewHolder(v,mListener);
        return ivh;
    }

    @Override
    public void onBindViewHolder(@NonNull ItemViewHolder holder, int position) {
            HomeItem currentItem = mHome_item_list.get(position);
            holder.mImageView.setImageResource(currentItem.getImageResource());
            holder.mTextView.setText(currentItem.getText());

    }

    @Override
    public int getItemCount() {
        return mHome_item_list.size();
    }



}
