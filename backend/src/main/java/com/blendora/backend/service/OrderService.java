package com.blendora.backend.service;

import com.blendora.backend.dto.MixRequestDTO;
import com.blendora.backend.dto.MixResponseDTO;
import com.blendora.backend.dto.OrderRequestDTO;
import com.blendora.backend.model.Order;
import com.blendora.backend.model.OrderStatus;
import com.blendora.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final MixService mixService;
    private final NotificationService notificationService;

    public OrderService(OrderRepository orderRepository, MixService mixService, NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.mixService = mixService;
        this.notificationService = notificationService;
    }

    public Order placeOrder(OrderRequestDTO request) {
        // Calculate price using MixService
        MixRequestDTO mixRequest = new MixRequestDTO();
        mixRequest.setItems(request.getMixItems());
        MixResponseDTO mixResponse = mixService.calculateMix(mixRequest);

        Order order = Order.builder()
                .customerId(request.getCustomerId())
                .sourcePartnerId(request.getSourcePartnerId())
                .chakkiPartnerId(request.getChakkiPartnerId())
                .status(OrderStatus.ORDER_PLACED)
                .totalPrice(mixResponse.getTotalPrice())
                .mixDetailsJson(mixResponse.getDetails().toString()) // Simple summary
                .build();

        Order savedOrder = orderRepository.save(order);
        notificationService.sendNotification(savedOrder.getCustomerId(), "Order Placed", 
                "Your custom mix has been received and is being sourced.", "ORDER_UPDATE");
        return savedOrder;
    }

    public Order updateStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        Order savedOrder = orderRepository.save(order);
        
        notificationService.sendNotification(savedOrder.getCustomerId(), "Order Update", 
                "Your order status has changed to: " + status.toString().replace("_", " "), "ORDER_UPDATE");
        
        return savedOrder;
    }

    public Order getOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
}
