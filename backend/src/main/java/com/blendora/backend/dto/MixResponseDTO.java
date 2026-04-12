package com.blendora.backend.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class MixResponseDTO {
    private BigDecimal totalWeight;
    private BigDecimal totalPrice;
    private List<MixDetailDTO> details;

    @Data
    @Builder
    public static class MixDetailDTO {
        private String ingredientName;
        private BigDecimal quantity;
        private BigDecimal subtotal;
    }
}
