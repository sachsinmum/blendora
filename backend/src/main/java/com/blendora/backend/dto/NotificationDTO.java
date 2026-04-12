package com.blendora.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotificationDTO {
    private Long id;
    private String title;
    private String message;
    private String type; // e.g., ORDER_UPDATE, SUBSCRIPTION
    private Long timestamp;
}
