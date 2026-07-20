package com.catijr.backend.Controllers;

import com.catijr.backend.DTOs.Search.SearchResultItemDTO;
import com.catijr.backend.Services.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    public ResponseEntity<List<SearchResultItemDTO>> search(@RequestParam String q) {
        return ResponseEntity.ok(searchService.search(q));
    }
}
