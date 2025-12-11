package com.example.orderservice;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final BackgroundTaskService backgroundTaskService;

    public OrderService(OrderRepository orderRepository, BackgroundTaskService backgroundTaskService) {
        this.orderRepository = orderRepository;
        this.backgroundTaskService = backgroundTaskService;
    }

    public Order createOrder(OrderDTO dto) {
        Order o = new Order();
        o.setCustomerName(dto.getCustomerName());
        o.setProductId(dto.getProductId());
        o.setQuantity(dto.getQuantity());
        o.setTotalPrice(dto.getTotalPrice());
        o.setCreatedAt(LocalDateTime.now());
        Order saved = orderRepository.save(o);
        // Trigger background processing asynchronously
        backgroundTaskService.processOrder(saved);
        return saved;
    }
}
