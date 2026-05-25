package com.catijr.backend.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catijr.backend.DTOs.Album.GetAlbumNoMusicsDTO;
import com.catijr.backend.DTOs.Artist.GetArtistDTO;
import com.catijr.backend.DTOs.Music.GetMusicDTO;
import com.catijr.backend.DTOs.Playlist.GetPlaylistNoMusicDTO;
import com.catijr.backend.Services.UserService;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/user/")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    /*
    GET METHOD:

    This method is used to list all the playlists of the user
    
    **since there is only a single user in this project, this is
    equivalent to listing all the playlists of the database

    */
    @GetMapping("/playlists")
    public List<GetPlaylistNoMusicDTO> getUserPlaylists() {
        return userService.getUserPlaylists();
    }

    /*
    GET METHOD:

    This method is used to list (the last 5) artists the user recently listened to,
    since this project has no support for metrics that allow this to be
    a functional route, the result of this method will be a fixed set of artists
    initialized in the database
    */
    @GetMapping("/recentArtists")
    public List<GetArtistDTO> getUserRecentArtists() {
        return userService.getUserRecentArtists();
    }
    

    /*
    GET METHOD:

    This method is used to list the 5 most played artists of the user,
    since this project has no support for metrics that allow this to be
    a functional route, the result of this method will be a fixed set of artists
    initialized in the database

    */
    @GetMapping("/mostPlayedArtists")
    public List<GetArtistDTO> getUserMostPlayedArtists() {
        return userService.getUserMostPlayedArtists();
    }

    /*
    GET METHOD:
    
    This method is used to list the user's (last 5) recently played musics,
    since this project has no support for metrics that allow this to be
    a functional route, the result of this method will be a fixed set of musics
    initialized in the database
    */
    @GetMapping("/recentMusics")
    public List<GetMusicDTO> getUserRecentMusics() {
        return userService.getUserRecentMusics();
    }

    /*
    GET METHOD:
    
    This method is used to list the user's 5 most played musics,
    since this project has no support for metrics that allow this to be
    a functional route, the result of this method will be a fixed set of musics
    initialized in the database
    */
    @GetMapping("/mostPlayedMusics")
    public List<GetMusicDTO> getUserMostPlayedMusics() {
        return userService.getUserMostPlayedMusics();
    }

     /*
    GET METHOD:
    
    This method is used to list the user's (last 5) recently played albums,
    since this project has no support for metrics that allow this to be
    a functional route, the result of this method will be a fixed set of albums
    initialized in the database
    */
    @GetMapping("/recentAlbums")
    public List<GetAlbumNoMusicsDTO> getUserRecentAlbums() {
        return userService.getUserRecentAlbums();
    }

    /*
    GET METHOD:

    THis method is used to list the user's followers, since this project
    has no support for this logic, the result of this method will be a
    fixed set of data not initialized in the database
    */ 
    @GetMapping("/followers")
    public List<String> getUserFollowers() {
        List<String> followers =new ArrayList<>(List.of("deadbeat7","xmc0-Infinity","John Doe", "Jose Manuel Alberto Lopez","XCS_2026"));

        return followers;
    }
    
    
    
    
    

    
}
