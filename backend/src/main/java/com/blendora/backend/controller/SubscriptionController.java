package com.blendora.backend.controller;

import com.blendora.backend.model.Subscription;
import com.blendora.backend.service.SubscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping
    public ResponseEntity<Subscription> create(@RequestBody Subscription subscription) {
        return ResponseEntity.ok(subscriptionService.createSubscription(subscription));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Subscription>> getUserSubscriptions(@PathVariable Long userId) {
        return ResponseEntity.ok(subscriptionService.getUserSubscriptions(userId));
    }
}
