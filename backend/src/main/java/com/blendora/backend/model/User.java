package com.blendora.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String mobile;

    private String name;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    public enum UserRole {
        CUSTOMER,
        CHAKKI,
        WHOLESALER,
        DELIVERY_PARTNER,
        ADMIN
    }
}
