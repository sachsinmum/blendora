package com.blendora.backend.controller;

import com.blendora.backend.dto.MixRequestDTO;
import com.blendora.backend.dto.MixResponseDTO;
import com.blendora.backend.service.MixService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mix")
public class MixController {

    private final MixService mixService;

    public MixController(MixService mixService) {
        this.mixService = mixService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<MixResponseDTO> calculate(@RequestBody MixRequestDTO request) {
        return ResponseEntity.ok(mixService.calculateMix(request));
    }
}
