package com.blendora.backend.controller;

import com.blendora.backend.model.Ingredient;
import com.blendora.backend.repository.IngredientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

    private final IngredientRepository ingredientRepository;

    public IngredientController(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @GetMapping
    public ResponseEntity<List<Ingredient>> getAll() {
        return ResponseEntity.ok(ingredientRepository.findAll());
    }
}
