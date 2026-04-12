package com.blendora.backend.repository;

import com.blendora.backend.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByActiveTrueAndNextRefillDateBefore(LocalDateTime dateTime);
    List<Subscription> findByUserId(Long userId);
}
