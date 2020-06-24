package com.example.forumapplication.Data;



public class post_items {
    private String post_title;
    private String post_body;
    public post_items(String text1,String text2){
        post_title = text1;
        post_body = text2;
    }
    public String getPost_title(){
        return  post_title;
    }
    public String getPost_body() {
        return post_body;
    }

}
