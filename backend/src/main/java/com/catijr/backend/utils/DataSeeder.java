package com.catijr.backend.utils;

import com.catijr.backend.Entities.*;
import com.catijr.backend.Repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.core.annotation.Order;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.*;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Stream;

@Slf4j
@Component
@Profile("dev")
@Order(1)
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ArtistRepository artistRepository;
    private final AlbumRepository albumRepository;
    private final MusicRepository musicRepository;
    private final PlaylistRepository playlistRepository;

    @Value("${app.storage.artist-upload-dir:uploads/artists}")
    private String artistUploadDir;

    @Value("${app.storage.album-upload-dir:uploads/albums}")
    private String albumUploadDir;

    private record AlbumData(String title, String year, List<TrackData> tracks) {}
    private record TrackData(String title, int durationSeconds, boolean explicit) {}
    private record ArtistData(String name, int listeners, String about, List<AlbumData> albums) {}

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        log.info("====== INICIANDO SEEDER: DADOS REALISTAS ======");

        if (artistRepository.count() > 0) {
            log.info(">>> Banco de dados já iniciado! Pulando Seeding...");
            return;
        }

        List<Music> allCreatedSongs = new ArrayList<>();
        List<ArtistData> catalog = buildCatalog();

        for (ArtistData artistData : catalog) {
            String coverUrl = findArtistImage(artistData.name());

            Artist artist = Artist.builder()
                    .name(artistData.name())
                    .listeners(artistData.listeners())
                    .about(artistData.about())
                    .coverUrl(coverUrl)
                    .build();

            artist = artistRepository.save(artist);

            List<Album> artistAlbums = new ArrayList<>();

            for (AlbumData albumData : artistData.albums()) {
                String albumCoverUrl = findAlbumImage(artistData.name(), albumData.title());

                Album album = Album.builder()
                        .title(albumData.title())
                        .year(albumData.year())
                        .owner(artist)
                        .coverUrl(albumCoverUrl)
                        .build();

                album = albumRepository.save(album);
                artistAlbums.add(album);

                List<Music> albumSongs = new ArrayList<>();
                int trackNumber = 1;

                for (TrackData trackData : albumData.tracks()) {
                    Music music = Music.builder()
                            .title(trackData.title())
                            .artist(artist)
                            .album(album)
                            .duration(trackData.durationSeconds())
                            .explicit(trackData.explicit())
                            .timesListen(50_000 + (int) (Math.random() * 5_000_000))
                            .releaseDate(Instant.now().minus(trackNumber * 10L, ChronoUnit.DAYS))
                            .coverUrl(albumCoverUrl)
                            .build();

                    albumSongs.add(music);
                    trackNumber++;
                }

                List<Music> savedSongs = musicRepository.saveAll(albumSongs);
                allCreatedSongs.addAll(savedSongs);

                album.setMusics(savedSongs);
                albumRepository.save(album);
            }

            artist.setAlbums(artistAlbums);
            artistRepository.save(artist);
        }

        log.info(">> Catálogo criado: {} músicas prontas para as playlists.", allCreatedSongs.size());

        // --- Standard Playlists (Removed 'Músicas Curtidas' to prevent overlap) ---
        List<String> playlistNames = List.of(
                "Playlist de Academia",
                "Estudo Concentrado",
                "Modo Viagem"
        );

        List<Playlist> playlistsToSave = new ArrayList<>();

        for (int p = 0; p < playlistNames.size(); p++) {
            int targetMusicCount = p + 3;
            List<Music> playlistSongs = new ArrayList<>();
            int totalDuration = 0;

            for (int s = 0; s < targetMusicCount; s++) {
                int songIndex = (p * 37 + s * 19) % allCreatedSongs.size();
                Music selectedMusic = allCreatedSongs.get(songIndex);
                playlistSongs.add(selectedMusic);
                totalDuration += selectedMusic.getDuration();
            }

            Playlist playlist = Playlist.builder()
                    .name(playlistNames.get(p))
                    .description("Sua seleção especial para: " + playlistNames.get(p))
                    .isPublic(true)
                    .type("normal")
                    .songs(playlistSongs)
                    .musicQtd(targetMusicCount)
                    .duration(totalDuration)
                    .build();

            playlistsToSave.add(playlist);
        }

        playlistRepository.saveAll(playlistsToSave);

        log.info("====== SEEDER EXECUTADO COM SUCESSO: BANCO TOTALMENTE POPULADO ======");
    }

    private String toKebabCase(String input) {
        return input.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
    }

    private String findArtistImage(String artistName) {
        String kebab = toKebabCase(artistName);
        Path uploadDir = Paths.get(artistUploadDir);

        if (!Files.exists(uploadDir)) return null;

        try (Stream<Path> stream = Files.list(uploadDir)) {
            return stream
                .filter(p -> p.getFileName().toString().toLowerCase().startsWith(kebab))
                .findFirst()
                .map(p -> "/artists/" + p.getFileName().toString())
                .orElse(null);
        } catch (IOException e) {
            log.error("Failed to find artist image for {}", artistName, e);
            return null;
        }
    }

    private String findAlbumImage(String artistName, String albumTitle) {
        String prefix = toKebabCase(artistName) + "-" + toKebabCase(albumTitle);
        Path uploadDir = Paths.get(albumUploadDir);

        if (!Files.exists(uploadDir)) return null;

        try (Stream<Path> stream = Files.list(uploadDir)) {
            return stream
                .filter(p -> p.getFileName().toString().toLowerCase().startsWith(prefix))
                .findFirst()
                .map(p -> "/albums/" + p.getFileName().toString())
                .orElse(null);
        } catch (IOException e) {
            log.error("Failed to find album image for {} - {}", artistName, albumTitle, e);
            return null;
        }
    }

    // ---------------------------------------------------------------
    // Catálogo com dados realistas (nomes de artistas, álbuns e faixas)
    // ---------------------------------------------------------------
    private List<ArtistData> buildCatalog() {
        return List.of(
                 new ArtistData(
                        "Drake",
                        30_200_000,
                        "Rapper e cantor canadense, um dos artistas de maior sucesso comercial na história do hip-hop e do R&B.",
                        List.of(
                                new AlbumData("Iceman", "2024", List.of(
                                        new TrackData("Frostbite", 214, true),
                                        new TrackData("North Star", 198, true),
                                        new TrackData("Cold Nights", 231, true),
                                        new TrackData("Winter Wave", 205, false)
                                )),
                                new AlbumData("Scorpion", "2018", List.of(
                                        new TrackData("God's Plan", 198, true),
                                        new TrackData("In My Feelings", 217, true),
                                        new TrackData("Nice for What", 208, true),
                                        new TrackData("Nonstop", 268, true)
                                ))
                        )
                ),
                new ArtistData(
                        "Bad Bunny",
                        68_000_000,
                        "Superastro porto-riquenho e um dos artistas mais ouvidos do mundo, revolucionando a música urbana com fusões de reggaeton, trap, cumbia e indie pop.",
                        List.of(
                                new AlbumData("Debí Tirar Más Fotos", "2025", List.of(
                                        new TrackData("NUEVAYoL", 184, true),
                                        new TrackData("BAILE INoLVIDABLE", 368, true),
                                        new TrackData("EL CLúB", 223, true),
                                        new TrackData("PIToRRO DE COCO", 215, true),
                                        new TrackData("DTMF", 232, true),
                                        new TrackData("EoO", 210, true)
                                )),
                                new AlbumData("Un Verano Sin Ti", "2022", List.of(
                                        new TrackData("Moscow Mule", 245, true),
                                        new TrackData("Me Porto Bonito", 178, true),
                                        new TrackData("Tití Me Preguntó", 243, true),
                                        new TrackData("Ojitos Lindos", 258, false),
                                        new TrackData("Efecto", 213, true),
                                        new TrackData("Party", 227, true),
                                        new TrackData("Callaíta", 250, true)
                                ))
                        )
                ),
                new ArtistData(
                        "Don Toliver",
                        22_000_000,
                        "Cantor e rapper americano conhecido por suas melodias hipnóticas, vocais marcantes e fusão única de trap, R&B e elementos psicodélicos.",
                        List.of(
                                new AlbumData("Love Sick", "2023", List.of(
                                        new TrackData("LoveSickness", 195, true),
                                        new TrackData("4 Me", 187, true),
                                        new TrackData("Private Landing", 238, true),
                                        new TrackData("Slow Motion", 188, true),
                                        new TrackData("Leave the Club", 209, true)
                                )),
                                new AlbumData("OCTANE", "2025", List.of(
                                        new TrackData("High Octane", 192, true),
                                        new TrackData("Tear It Down", 204, true),
                                        new TrackData("Full Throttle", 218, true),
                                        new TrackData("Speedin", 185, true)
                                ))
                        )
                ),
                new ArtistData(
                        "Travis Scott",
                        14_500_000,
                        "Rapper, cantor e produtor americano, conhecido por misturar trap, psicodelia e elementos de rock em sua produção.",
                        List.of(
                                new AlbumData("Astroworld", "2018", List.of(
                                        new TrackData("Stargazing", 269, true),
                                        new TrackData("Carousel", 249, true),
                                        new TrackData("Sicko Mode", 312, true),
                                        new TrackData("Stop Trying to Be God", 336, true)
                                )),
                                new AlbumData("Utopia", "2023", List.of(
                                        new TrackData("Hyaena", 195, true),
                                        new TrackData("Thank God", 195, true),
                                        new TrackData("Fein", 184, true),
                                        new TrackData("I Know?", 165, true)
                                ))
                        )
                ),
                new ArtistData(
                        "Kendrick Lamar",
                        19_800_000,
                        "Rapper e compositor americano, aclamado pela crítica por letras densas e álbuns conceituais.",
                        List.of(
                                new AlbumData("good kid, m.A.A.d city", "2012", List.of(
                                        new TrackData("Swimming Pools (Drank)", 313, true),
                                        new TrackData("Bitch, Don't Kill My Vibe", 302, true),
                                        new TrackData("Money Trees", 386, true),
                                        new TrackData("Poetic Justice", 300, true)
                                )),
                                new AlbumData("GNX", "2024", List.of(
                                        new TrackData("Squabble Up", 175, true),
                                        new TrackData("Luther", 213, false),
                                        new TrackData("TV Off", 232, true),
                                        new TrackData("Peekaboo", 219, true)
                                ))
                        )
                )
        );
    }
}