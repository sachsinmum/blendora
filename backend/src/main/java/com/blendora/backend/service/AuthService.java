package com.blendora.backend.service;

import com.blendora.backend.model.User;
import com.blendora.backend.repository.UserRepository;
import com.blendora.backend.dto.AuthRequest;
import com.blendora.backend.dto.VerifyOtpRequest;
import org.springframework.stereotype.Service;
import com.blendora.backend.security.JwtUtil;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public void sendOtp(AuthRequest request) {
        // Mocking OTP send logic
        System.out.println("Sending OTP 123456 to " + request.getMobile());
    }

    public Object verifyOtp(VerifyOtpRequest request) {
        // Mocking validation: only 123456 is valid
        if ("123456".equals(request.getOtp())) {
            User user = userRepository.findByMobile(request.getMobile())
                .orElseGet(() -> {
                    User newUser = User.builder()
                        .mobile(request.getMobile())
                        .role(User.UserRole.CUSTOMER) // Default role
                        .name("New User")
                        .build();
                    return userRepository.save(newUser);
                });
            
            String token = jwtUtil.generateToken(user.getMobile());
            return java.util.Map.of("user", user, "token", token);
        }
        throw new RuntimeException("Invalid OTP");
    }
}
