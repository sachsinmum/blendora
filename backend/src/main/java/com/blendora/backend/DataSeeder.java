package com.blendora.backend;

import com.blendora.backend.model.Ingredient;
import com.blendora.backend.model.Partner;
import com.blendora.backend.repository.IngredientRepository;
import com.blendora.backend.repository.PartnerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

    private final IngredientRepository ingredientRepository;
    private final PartnerRepository partnerRepository;

    public DataSeeder(IngredientRepository ingredientRepository, PartnerRepository partnerRepository) {
        this.ingredientRepository = ingredientRepository;
        this.partnerRepository = partnerRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (ingredientRepository.count() == 0) {
            ingredientRepository.save(Ingredient.builder().name("Sharbati Wheat").pricePerKg(new BigDecimal("45.00")).build());
            ingredientRepository.save(Ingredient.builder().name("Bajra (Pearl Millet)").pricePerKg(new BigDecimal("32.00")).build());
            ingredientRepository.save(Ingredient.builder().name("Chana Dal").pricePerKg(new BigDecimal("65.00")).build());
            ingredientRepository.save(Ingredient.builder().name("Jowar").pricePerKg(new BigDecimal("42.00")).build());
        }

        if (partnerRepository.count() == 0) {
            partnerRepository.save(Partner.builder().name("Local Wholesaler Hub").type(Partner.PartnerType.WHOLESALER).address("Market Rd, Mumbai").build());
            partnerRepository.save(Partner.builder().name("Master Chakki - Bandra").type(Partner.PartnerType.CHAKKI).address("Station Rd, Bandra").rating(4.8).build());
            partnerRepository.save(Partner.builder().name("Purity Flour Mill").type(Partner.PartnerType.CHAKKI).address("Linking Rd, Khar").rating(4.5).build());
        }
    }
}
