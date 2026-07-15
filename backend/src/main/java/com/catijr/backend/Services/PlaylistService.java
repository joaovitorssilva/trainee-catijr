package com.catijr.backend.Services;


import com.catijr.backend.DTOs.Playlist.GetPlaylistNoMusicDTO;
import com.catijr.backend.DTOs.Playlist.PutPlaylistDTO;
import com.catijr.backend.Entities.Music;
import com.catijr.backend.Entities.Playlist;
import com.catijr.backend.Repositories.MusicRepository;
import com.catijr.backend.DTOs.Playlist.CreatePlaylistDTO;
import com.catijr.backend.DTOs.Playlist.GetPlaylistDTO;
import com.catijr.backend.Entities.Music;
import com.catijr.backend.Entities.Playlist;
import com.catijr.backend.Mappers.PlaylistMapper;
import com.catijr.backend.Repositories.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final MusicRepository musicRepository;
    private final PlaylistMapper playlistMapper;

    public Playlist getPlaylistById(UUID playlistId) {
        var playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return playlist;
    }

    public Playlist editPlaylistAttributes(UUID playlistId, PutPlaylistDTO changesDTO) {
        var playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if ("liked_songs".equals(playlist.getType())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot edit liked songs playlist");
        }

        if (changesDTO.name() != null) {
            playlist.setName(changesDTO.name());
        }

        if (changesDTO.description() != null) {
            playlist.setDescription(changesDTO.description());
        }

        if (changesDTO.isPublic() != null) {
            playlist.setIsPublic(changesDTO.isPublic());
        }

        var edited = playlistRepository.save(playlist);

        return edited;
    }

    public Playlist addMusicToPlaylist(UUID playlistId, UUID musicId) {
        var playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!playlistRepository.musicExistsById(playlistId, musicId)) {
            var music = musicRepository.findById(musicId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

            List<Music> musics = new ArrayList<>(playlist.getSongs());

            musics.add(music);

            playlist.setSongs(musics);
            playlist.setMusicQtd(playlist.getMusicQtd() + 1);
            playlist.setDuration(playlist.getDuration() + music.getDuration());

            var updated = playlistRepository.save(playlist);

            return updated;
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
  
    public GetPlaylistNoMusicDTO createPlaylist(CreatePlaylistDTO playlist){
        Playlist playlistEntity = playlistMapper.toEntity(playlist);
        if (playlistEntity.getIsPublic() == null) {
            playlistEntity.setIsPublic(true);
        }
        if (playlistEntity.getType() == null) {
            playlistEntity.setType("normal");
        }
        Playlist savedEntity = playlistRepository.save(playlistEntity);

        return playlistMapper.toDTO(savedEntity);
    }


    public void deletePlaylistById(UUID playlistId) {
        var playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if ("liked_songs".equals(playlist.getType())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot delete liked songs playlist");
        }

        playlistRepository.deleteById(playlistId);
    }

    public void deleteMusicById(UUID playlistId, UUID musicId) {
        var playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (playlistRepository.musicExistsById(playlistId, musicId)) {
            var music = musicRepository.findById(musicId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            List<Music> musics = new ArrayList<>(playlist.getSongs());

            musics.removeIf(tgt_music -> tgt_music.getId().equals(musicId));

            playlist.setMusicQtd(Math.max(0, playlist.getMusicQtd() - 1));
            playlist.setDuration(Math.max(0, playlist.getDuration() - music.getDuration()));

            playlist.setSongs(musics);

            playlistRepository.save(playlist);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
