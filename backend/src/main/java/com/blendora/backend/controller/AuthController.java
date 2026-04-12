package com.blendora.backend.controller;

import com.blendora.backend.dto.AuthRequest;
import com.blendora.backend.dto.VerifyOtpRequest;
import com.blendora.backend.model.User;
import com.blendora.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody AuthRequest request) {
        authService.sendOtp(request);
        return ResponseEntity.ok("OTP Sent");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Object> verifyOtp(@RequestBody VerifyOtpRequest request) {
        return ResponseEntity.ok(authService.verifyOtp(request));
    }
}
