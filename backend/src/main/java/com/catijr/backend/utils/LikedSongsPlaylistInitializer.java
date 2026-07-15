package com.catijr.backend.utils;

import com.catijr.backend.Entities.Playlist;
import com.catijr.backend.Repositories.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Order(2)
@RequiredArgsConstructor
public class LikedSongsPlaylistInitializer implements CommandLineRunner {

    private final PlaylistRepository playlistRepository;

    @Override
    public void run(String... args) {
        var existing = playlistRepository.findByType("liked_songs");

        if (existing.isPresent()) {
            log.info(">>> Playlist de músicas curtidas já existe! Pulando Seeding...");
            return;
        }

        Playlist likedSongs = Playlist.builder()
                .name("Músicas Curtidas")
                .description("Suas músicas favoritas")
                .isPublic(false)
                .type("liked_songs")
                .musicQtd(0)
                .duration(0)
                .build();

        playlistRepository.save(likedSongs);
        log.info("Playlist de 'Músicas Curtidas' criada!");
    }
}
