package com.notesapp.server.model;

public class TitleEntity {
    private int id;
    private String title;

    public TitleEntity(int id, String title) {
        this.id = id;
        this.title = title;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }
}
