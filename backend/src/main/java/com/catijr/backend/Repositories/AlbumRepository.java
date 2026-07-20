package com.catijr.backend.Repositories;


import com.catijr.backend.Entities.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AlbumRepository extends JpaRepository<Album, UUID> {

    List<Album> findTop5By();

    @Query(value = "SELECT a.* FROM tb_albums a WHERE unaccent(LOWER(a.album_title)) LIKE unaccent(LOWER(CONCAT('%', :query, '%')))", nativeQuery = true)
    List<Album> searchByTitle(@Param("query") String query);
}
