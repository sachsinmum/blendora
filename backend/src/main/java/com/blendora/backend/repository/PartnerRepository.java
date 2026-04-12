package com.blendora.backend.repository;

import com.blendora.backend.model.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartnerRepository extends JpaRepository<Partner, Long> {
    List<Partner> findByType(Partner.PartnerType type);
}
