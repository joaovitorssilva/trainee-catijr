package com.catijr.backend.Services;

import com.catijr.backend.DTOs.Search.SearchResultItemDTO;
import com.catijr.backend.Repositories.AlbumRepository;
import com.catijr.backend.Repositories.ArtistRepository;
import com.catijr.backend.Repositories.MusicRepository;
import com.catijr.backend.Repositories.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final MusicRepository musicRepository;                  
    private final ArtistRepository artistRepository;
    private final AlbumRepository albumRepository;
    private final PlaylistRepository playlistRepository;

    public List<SearchResultItemDTO> search(String query) {
        var results = new ArrayList<SearchResultItemDTO>();

        musicRepository.searchByTitle(query).forEach(m ->
            results.add(new SearchResultItemDTO(
                m.getId().toString(),
                m.getTitle(),
                "track",
                "Música • " + (m.getArtist() != null ? m.getArtist().getName() : "Artista desconhecido"),
                m.getAlbum() != null ? m.getAlbum().getId().toString() : null,
                m.getExplicit(),
                m.getLiked() != null ? m.getLiked() : false
            ))
        );

        artistRepository.searchByName(query).forEach(a ->
            results.add(new SearchResultItemDTO(
                a.getId().toString(),
                a.getName(),
                "artist",
                "Artista",
                null,
                null,
                null
            ))
        );

        albumRepository.searchByTitle(query).forEach(a ->
            results.add(new SearchResultItemDTO(
                a.getId().toString(),
                a.getTitle(),
                "album",
                "Álbum • " + (a.getOwner() != null ? a.getOwner().getName() : "Artista desconhecido") + " • " + a.getYear(),
                a.getId().toString(),
                null,
                null
            ))
        );

        playlistRepository.searchByName(query).forEach(p ->
            results.add(new SearchResultItemDTO(
                p.getId().toString(),
                p.getName(),
                "playlist",
                "Playlist",
                null,
                null,
                null
            ))
        );

        return results;
    }
}
