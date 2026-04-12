package com.blendora.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String mixDetailsJson; // Saved mix configuration

    @Column(nullable = false)
    private Long sourcePartnerId;

    @Column(nullable = false)
    private Long chakkiPartnerId;

    private String frequency; // WEEKLY, MONTHLY

    private LocalDateTime lastRefillDate;
    private LocalDateTime nextRefillDate;

    private boolean active;

    @PrePersist
    protected void onCreate() {
        active = true;
    }
}
