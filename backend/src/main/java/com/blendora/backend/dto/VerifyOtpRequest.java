package com.blendora.backend.dto;

import lombok.Data;

@Data
public class VerifyOtpRequest {
    private String mobile;
    private String otp;
}
