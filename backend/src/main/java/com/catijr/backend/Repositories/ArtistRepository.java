package com.catijr.backend.Repositories;


import com.catijr.backend.Entities.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, UUID> {

    List<Artist> findTop5By();

    List<Artist> findTop5ByOrderByListenersDesc();

    @Query(value = "SELECT a.* FROM tb_artists a WHERE unaccent(LOWER(a.artist_name)) LIKE unaccent(LOWER(CONCAT('%', :query, '%')))", nativeQuery = true)
    List<Artist> searchByName(@Param("query") String query);
}
