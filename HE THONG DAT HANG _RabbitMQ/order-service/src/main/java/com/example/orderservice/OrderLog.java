package com.example.orderservice;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_logs")
public class OrderLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;

    @Lob
    private String message;

    private LocalDateTime createdAt;

    public OrderLog() {}

    public OrderLog(Long orderId, String message) {
        this.orderId = orderId;
        this.message = message;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
