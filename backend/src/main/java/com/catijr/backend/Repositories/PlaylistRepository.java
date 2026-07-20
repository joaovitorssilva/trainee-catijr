package com.catijr.backend.Repositories;

import com.catijr.backend.Entities.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, UUID> {

    @Query("SELECT COUNT(p) > 0 FROM Playlist p JOIN p.songs s WHERE p.id = :playlistId AND s.id = :musicId")
    boolean musicExistsById(@Param("playlistId") UUID playlistId, @Param("musicId") UUID musicId);

    Optional<Playlist> findByType(String type);

    @Query(value = "SELECT p.* FROM tb_playlists p WHERE unaccent(LOWER(p.name)) LIKE unaccent(LOWER(CONCAT('%', :query, '%'))) AND (p.type IS NULL OR p.type != 'liked_songs')", nativeQuery = true)
    List<Playlist> searchByName(@Param("query") String query);
}
