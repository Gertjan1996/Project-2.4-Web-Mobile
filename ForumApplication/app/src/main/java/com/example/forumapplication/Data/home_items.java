package com.example.forumapplication.Data;

import androidx.fragment.app.Fragment;


import com.example.forumapplication.R;

public class home_items {
    private int mImageResource;
    private String mText;
    public home_items(int imageResource,String text){
        mImageResource = imageResource;
        mText = text;
    }
    public void toDiffirentPostTheme(){
        if(mText.equals("Voetball")){

        }
    }
    public int getImageResource(){
        return mImageResource;
    }
    public String getText(){
        return mText;
    }


}
