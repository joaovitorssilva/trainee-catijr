package com.catijr.backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.catijr.backend.Entities.Album;
import com.catijr.backend.Entities.Artist;
import com.catijr.backend.Entities.Music;
import com.catijr.backend.Entities.Playlist;
import com.catijr.backend.Repositories.AlbumRepository;
import com.catijr.backend.Repositories.ArtistRepository;
import com.catijr.backend.Repositories.MusicRepository;
import com.catijr.backend.Repositories.PlaylistRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final AlbumRepository       albumRepository;
    private final MusicRepository       musicRepository;
    private final PlaylistRepository    playlistRepository;
    private final ArtistRepository      artistRepository;


    public List<Playlist> getUserPlaylists(){
        return playlistRepository.findAll();
    }

    public List<Artist> getUserRecentArtists(){
        return artistRepository.findTop5By();
    }

    public List<Artist> getUserMostPlayedArtists(){
        return artistRepository.findTop5ByListeners();
    }

    public List<Music> getUserMostRecentMusics(){
        return musicRepository.findTop5By();
    }

    public List<Music> getUserMostPlayedMusics(){
        return musicRepository.findTop5ByTimesListen();
    }

    public List<Album> getRecentAlbums(){
        return albumRepository.findTop5By();
    }








}
