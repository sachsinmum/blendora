package com.blendora.backend.service;

import com.blendora.backend.dto.MixRequestDTO;
import com.blendora.backend.dto.MixResponseDTO;
import com.blendora.backend.model.Ingredient;
import com.blendora.backend.repository.IngredientRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class MixService {

    private final IngredientRepository ingredientRepository;

    public MixService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public MixResponseDTO calculateMix(MixRequestDTO request) {
        BigDecimal totalWeight = BigDecimal.ZERO;
        BigDecimal totalPrice = BigDecimal.ZERO;
        List<MixResponseDTO.MixDetailDTO> details = new ArrayList<>();

        for (var item : request.getItems()) {
            Ingredient ingredient = ingredientRepository.findById(item.getIngredientId())
                    .orElseThrow(() -> new RuntimeException("Ingredient not found: " + item.getIngredientId()));

            BigDecimal subtotal = ingredient.getPricePerKg().multiply(item.getQuantityKg());
            
            totalWeight = totalWeight.add(item.getQuantityKg());
            totalPrice = totalPrice.add(subtotal);

            details.add(MixResponseDTO.MixDetailDTO.builder()
                    .ingredientName(ingredient.getName())
                    .quantity(item.getQuantityKg())
                    .subtotal(subtotal)
                    .build());
        }

        return MixResponseDTO.builder()
                .totalWeight(totalWeight)
                .totalPrice(totalPrice)
                .details(details)
                .build();
    }
}
