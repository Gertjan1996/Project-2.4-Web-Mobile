package com.example.forumapplication.Data;



public class HomeItem {
    private int mImageResource;
    private String mText;
    private String id;

    public HomeItem(int imageResource, String text){
        mImageResource = imageResource;
        mText = text;
    }

    public void setId(String id) { this.id = id; }
    public String getID() { return this.id; }

    public int getImageResource(){
        return mImageResource;
    }
    public String getText(){
        return mText;
    }

    @Override
    public String toString() {
        return String.format("HomeItem: %s met id %s", mText, this.id);
    }


}
