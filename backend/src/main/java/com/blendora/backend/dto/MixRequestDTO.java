package com.blendora.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class MixRequestDTO {
    private String name;
    private List<MixItemDTO> items;
}
