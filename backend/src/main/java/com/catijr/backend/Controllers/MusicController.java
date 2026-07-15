package com.catijr.backend.Controllers;

import com.catijr.backend.DTOs.Music.GetMusicDTO;
import com.catijr.backend.Services.MusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/music/")
@RequiredArgsConstructor
public class MusicController {

    private final MusicService musicService;

    @PatchMapping("/{musicId}/like")
    public ResponseEntity<GetMusicDTO> toggleLike(@PathVariable String musicId) {
        var music = musicService.toggleLike(UUID.fromString(musicId));
        return ResponseEntity.ok(new GetMusicDTO(music));
    }
}
