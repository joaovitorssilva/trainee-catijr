package com.catijr.backend.DTOs.Artist;

import com.catijr.backend.Entities.Artist;

import java.time.Instant;
import java.util.UUID;

public record GetArtistDTO(UUID id, String name, int listeners, String about,
    Instant createdAt, Instant updatedAt, String coverUrl
){

    public GetArtistDTO(Artist artist){
        this(
            artist.getId(),
            artist.getName(),
            artist.getListeners(),
            artist.getAbout(),
            artist.getCreatedAt(),
            artist.getUpdatedAt(),
            artist.getCoverUrl()

        );
    }
}