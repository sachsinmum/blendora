package com.blendora.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/media/view/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                .anyRequest().permitAll() // Temporary for demo/polish - hardening to authenticated() later
            )
            .headers(headers -> headers.frameOptions(f -> f.disable())) // For H2 console
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
            
        return http.build();
    }
}
