package com.blendora.backend.service;

import com.blendora.backend.model.Order;
import com.blendora.backend.model.OrderStatus;
import com.blendora.backend.model.Subscription;
import com.blendora.backend.repository.OrderRepository;
import com.blendora.backend.repository.SubscriptionRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final OrderRepository orderRepository;
    private final NotificationService notificationService;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, 
                               OrderRepository orderRepository, 
                               NotificationService notificationService) {
        this.subscriptionRepository = subscriptionRepository;
        this.orderRepository = orderRepository;
        this.notificationService = notificationService;
    }

    public Subscription createSubscription(Subscription sub) {
        sub.setNextRefillDate(LocalDateTime.now().plusMinutes(2)); // Demo: Refill in 2 mins
        return subscriptionRepository.save(sub);
    }

    public List<Subscription> getUserSubscriptions(Long userId) {
        return subscriptionRepository.findByUserId(userId);
    }

    @Scheduled(fixedRate = 60000) // Every minute
    @Transactional
    public void processRefills() {
        LocalDateTime now = LocalDateTime.now();
        List<Subscription> dueSubscriptions = subscriptionRepository.findByActiveTrueAndNextRefillDateBefore(now);

        for (Subscription sub : dueSubscriptions) {
            System.out.println("Processing REFILL for Subscription: " + sub.getName());
            
            // 1. Create Auto-Order
            Order autoOrder = Order.builder()
                    .customerId(sub.getUserId())
                    .sourcePartnerId(sub.getSourcePartnerId())
                    .chakkiPartnerId(sub.getChakkiPartnerId())
                    .status(OrderStatus.ORDER_PLACED)
                    .mixDetailsJson(sub.getMixDetailsJson())
                    .totalPrice(null) // Mock logic: in real app we'd re-calculate
                    .build();
            
            orderRepository.save(autoOrder);

            // 2. Update Subscription dates
            sub.setLastRefillDate(now);
            // In demo, we just add another 2 mins. In prod, we'd add 1 month.
            sub.setNextRefillDate(now.plusMinutes(2)); 
            subscriptionRepository.save(sub);

            // 3. Notify User
            notificationService.sendNotification(sub.getUserId(), "Auto-Refill Triggered!", 
                    "Your subscription '" + sub.getName() + "' has generated a fresh order.", "SUBSCRIPTION");
        }
    }
}
