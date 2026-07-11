package com.catijr.backend.DTOs.Playlist;

import com.catijr.backend.Entities.Playlist;

import java.time.Instant;
import java.util.UUID;

public record GetPlaylistNoMusicDTO(UUID id, String name, String description, int musicQtd,
                                    int duration, Boolean isPublic, Instant createdAt, Instant updatedAt ){

    public GetPlaylistNoMusicDTO(Playlist playlist){
        this(
            playlist.getId(),
            playlist.getName(),
            playlist.getDescription(),
            playlist.getMusicQtd(),
            playlist.getDuration(),
            playlist.getIsPublic(),
            playlist.getCreatedAt(),
            playlist.getUpdatedAt()

        );
    }
}