package com.blendora.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MixItemDTO {
    private Long ingredientId;
    private BigDecimal quantityKg;
}
