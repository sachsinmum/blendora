package com.blendora.backend.controller;

import com.blendora.backend.dto.NotificationDTO;
import com.blendora.backend.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<NotificationDTO>> getNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.getNotificationsForUser(userId));
    }
}
