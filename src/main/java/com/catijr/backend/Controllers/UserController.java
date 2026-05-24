package com.catijr.backend.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/user/")
@RequiredArgsConstructor
public class UserController {
    
    /*
    GET METHOD:

    This method is used to list all the playlists of the user
    
    **since there is only a single user in this project, this is
    equivalent to listing all the playlists of the database

    */
    @GetMapping("/playlists")
    public String getUserPlaylists(@RequestParam String param) {
        return new String();
    }

    /*
    GET METHOD:

    This method is used to list (the last 5) artists the user recently listened to,
    since this project has no support for metrics that allow this to be
    a functional route, the result of this method will be a fixed set of artists
    initialized in the database
    */
    @GetMapping("/recentArtists")
    public String getUserRecentArtists(@RequestParam String param) {
        return new String();
    }
    

    /*
    GET METHOD:

    This method is used to list the 5 most played artists of the user,
    since this project has no support for metrics that allow this to be
    a functional route, the result of this method will be a fixed set of artists
    initialized in the database

    */
    @GetMapping("/mostPlayedArtists")
    public String getUserMostPlayedArtists(@RequestParam String param) {
        return new String();
    }

    /*
    GET METHOD:
    
    This method is used to list the user's (last 5) recently played musics,
    since this project has no support for metrics that allow this to be
    a functional route, the result of this method will be a fixed set of musics
    initialized in the database
    */
    @GetMapping("/recentMusics")
    public String getUserRecentMusics(@RequestParam String param) {
        return new String();
    }

    /*
    GET METHOD:
    
    This method is used to list the user's 5 most played musics,
    since this project has no support for metrics that allow this to be
    a functional route, the result of this method will be a fixed set of musics
    initialized in the database
    */
    @GetMapping("/mostPlayedMusics")
    public String getUserMostPlayedMusics(@RequestParam String param) {
        return new String();
    }

     /*
    GET METHOD:
    
    This method is used to list the user's (last 5) recently played albums,
    since this project has no support for metrics that allow this to be
    a functional route, the result of this method will be a fixed set of albums
    initialized in the database
    */
    @GetMapping("/recentAlbums")
    public String getUserRecentAlbums(@RequestParam String param) {
        return new String();
    }

    /*
    GET METHOD:

    THis method is used to list the user's followers, since this project
    has no support for this logic, the result of this method will be a
    fixed set of data not initialized in the database
    */ 
    @GetMapping("/followers")
    public List<String> getUserFollowers(@RequestParam String param) {
        List<String> followers =new ArrayList<>(List.of("deadbeat7","xmc0-Infinity","John Doe", "Jose Manuel Alberto Lopez","XCS_2026"));

        return followers;
    }
    
    
    
    
    

    
}
