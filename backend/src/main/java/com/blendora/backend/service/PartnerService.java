package com.blendora.backend.service;

import com.blendora.backend.model.Partner;
import com.blendora.backend.repository.PartnerRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PartnerService {

    private final PartnerRepository partnerRepository;

    public PartnerService(PartnerRepository partnerRepository) {
        this.partnerRepository = partnerRepository;
    }

    public List<Partner> getPartnersByType(Partner.PartnerType type) {
        return partnerRepository.findByType(type);
    }

    public List<Partner> getAllPartners() {
        return partnerRepository.findAll();
    }
}
