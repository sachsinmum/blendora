package com.blendora.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "partners")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Partner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PartnerType type;

    private String address;

    private BigDecimal latitude;
    private BigDecimal longitude;

    private Double rating;

    public enum PartnerType {
        WHOLESALER,
        CHAKKI
    }
}
