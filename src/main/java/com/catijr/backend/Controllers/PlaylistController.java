package com.catijr.backend.Controllers;


import com.catijr.backend.DTOs.Music.GetMusicDTO;
import com.catijr.backend.DTOs.Playlist.CreatePlaylistDTO;
import com.catijr.backend.DTOs.Playlist.GetPlaylistDTO;
import com.catijr.backend.Services.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/playlist/")
@RequiredArgsConstructor
public class PlaylistController {

    private final PlaylistService playlistService;

    @GetMapping("{playlistId}/musics")
    public ResponseEntity<List<GetMusicDTO>> getMusicsByPlaylistId(@PathVariable String playlistId) {
        var musics = playlistService.getMusicsByPlaylistId(UUID.fromString(playlistId));

        List<GetMusicDTO> responseDTO = musics.stream().map(music -> new GetMusicDTO(music)).toList();

        return ResponseEntity.ok(responseDTO);
    }
    
    @PostMapping("/")
    public GetPlaylistDTO postMethodName(@RequestBody CreatePlaylistDTO playlist) {
        return playlistService.createPlaylist(playlist);
    }
    

    @DeleteMapping("{playlistId}")
    public ResponseEntity<Void> deletePlaylistById(@PathVariable String playlistId) {
        playlistService.deletePlaylistById(UUID.fromString(playlistId));

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{playlistId}/{musicId}")
    public ResponseEntity<Void> deleteMusicById(@PathVariable String playlistId,
                                                @PathVariable String musicId) {
        playlistService.deleteMusicById(UUID.fromString(playlistId), UUID.fromString(musicId));

        return ResponseEntity.ok().build();
    }
}
