package com.blendora.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long customerId;

    @Column(nullable = false)
    private Long sourcePartnerId; // Wholesaler

    @Column(nullable = false)
    private Long chakkiPartnerId; // Processor

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private BigDecimal totalPrice;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Column(columnDefinition = "TEXT")
    private String mixDetailsJson;

    private String videoUrl;

    @Column(columnDefinition = "TEXT")
    private String imageDetailsJson;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
