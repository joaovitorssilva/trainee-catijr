package com.catijr.backend.DTOs.Search;

public record SearchResultItemDTO(
    String id,
    String name,
    String type,
    String subtitle,
    String albumId,
    Boolean isExplicit,
    Boolean isSaved
) {}
