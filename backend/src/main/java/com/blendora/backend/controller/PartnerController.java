package com.blendora.backend.controller;

import com.blendora.backend.model.Partner;
import com.blendora.backend.service.PartnerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/partners")
public class PartnerController {

    private final PartnerService partnerService;

    public PartnerController(PartnerService partnerService) {
        this.partnerService = partnerService;
    }

    @GetMapping
    public ResponseEntity<List<Partner>> getPartners(@RequestParam(required = false) Partner.PartnerType type) {
        if (type != null) {
            return ResponseEntity.ok(partnerService.getPartnersByType(type));
        }
        return ResponseEntity.ok(partnerService.getAllPartners());
    }
}
