package com.example.orderservice;

import org.springframework.stereotype.Service;

import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final Deque<Order> recent = new LinkedList<>();
    private final int max = 50;

    public synchronized void push(Order order) {
        recent.addFirst(order);
        if (recent.size() > max) {
            recent.removeLast();
        }
    }

    public synchronized List<OrderSummary> getRecentOrders() {
        return recent.stream()
                .map(o -> new OrderSummary(o.getId(), o.getCustomerName(), o.getProductId(), o.getQuantity(), o.getTotalPrice(), o.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public static record OrderSummary(Long id, String customerName, String productId, Integer quantity, java.math.BigDecimal totalPrice, java.time.LocalDateTime createdAt) {}
}
