package com.example.forumapplication;

public class home_items {
    private int mImageResource;
    private String mText;
    public home_items(int imageResource,String text){
        mImageResource = imageResource;
        mText = text;
    }
    public int getImageResource(){
        return mImageResource;
    }
    public String getText(){
        return mText;
    }


}
