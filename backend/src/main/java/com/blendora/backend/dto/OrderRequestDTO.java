package com.blendora.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequestDTO {
    private Long customerId;
    private Long sourcePartnerId;
    private Long chakkiPartnerId;
    private List<MixItemDTO> mixItems;
}
