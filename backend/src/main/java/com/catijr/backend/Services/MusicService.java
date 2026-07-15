package com.catijr.backend.Services;

import com.catijr.backend.Entities.Music;
import com.catijr.backend.Repositories.MusicRepository;
import com.catijr.backend.Repositories.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MusicService {

    private final MusicRepository musicRepository;
    private final PlaylistRepository playlistRepository;

    @Transactional
    public Music toggleLike(UUID musicId) {
        var music = musicRepository.findById(musicId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        music.setLiked(!music.getLiked());

        var likedSongsPlaylist = playlistRepository.findByType("liked_songs")
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var songs = new ArrayList<>(likedSongsPlaylist.getSongs());

        if (music.getLiked()) {
            if (songs.stream().noneMatch(m -> m.getId().equals(musicId))) {
                songs.add(music);
                likedSongsPlaylist.setMusicQtd(likedSongsPlaylist.getMusicQtd() + 1);
                likedSongsPlaylist.setDuration(likedSongsPlaylist.getDuration() + music.getDuration());
            }
        } else {
            if (songs.removeIf(m -> m.getId().equals(musicId))) {
                likedSongsPlaylist.setMusicQtd(Math.max(0, likedSongsPlaylist.getMusicQtd() - 1));
                likedSongsPlaylist.setDuration(Math.max(0, likedSongsPlaylist.getDuration() - music.getDuration()));
            }
        }

        likedSongsPlaylist.setSongs(songs);
        playlistRepository.save(likedSongsPlaylist);

        return musicRepository.save(music);
    }
}
