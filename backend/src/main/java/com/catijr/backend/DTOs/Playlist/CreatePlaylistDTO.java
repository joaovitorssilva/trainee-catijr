package com.catijr.backend.DTOs.Playlist;

import com.catijr.backend.Entities.Playlist;


public record CreatePlaylistDTO(String name, String description, Boolean isPublic){

    public CreatePlaylistDTO(Playlist playlist){
        this(
            playlist.getName(),
            playlist.getDescription(),
            playlist.getIsPublic()

        );
    }
}