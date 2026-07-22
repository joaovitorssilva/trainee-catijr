package com.catijr.backend.DTOs.Playlist;

import java.util.List;
import java.util.UUID;

public record ReorderPlaylistDTO(List<UUID> musicIds) {}
