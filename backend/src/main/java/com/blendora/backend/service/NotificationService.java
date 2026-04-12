package com.blendora.backend.service;

import com.blendora.backend.dto.NotificationDTO;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class NotificationService {

    // Mocking a notification database per user
    private final Map<Long, List<NotificationDTO>> userNotifications = new ConcurrentHashMap<>();
    private long notificationIdCounter = 1;

    public void sendNotification(Long userId, String title, String message, String type) {
        NotificationDTO notification = NotificationDTO.builder()
                .id(notificationIdCounter++)
                .title(title)
                .message(message)
                .type(type)
                .timestamp(System.currentTimeMillis())
                .build();

        userNotifications.computeIfAbsent(userId, k -> new ArrayList<>()).add(0, notification);
        System.out.println("NOTIFICATION to User " + userId + ": [" + title + "] " + message);
    }

    public List<NotificationDTO> getNotificationsForUser(Long userId) {
        return userNotifications.getOrDefault(userId, Collections.emptyList());
    }
}
