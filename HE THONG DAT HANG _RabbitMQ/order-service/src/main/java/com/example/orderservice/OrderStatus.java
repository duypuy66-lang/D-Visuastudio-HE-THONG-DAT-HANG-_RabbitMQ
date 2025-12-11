package com.example.orderservice;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_status")
public class OrderStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private Long orderId;

    private Boolean saved = false;
    private LocalDateTime savedAt;

    private Boolean emailSent = false;
    private LocalDateTime emailSentAt;

    private Boolean inventoryUpdated = false;
    private LocalDateTime inventoryUpdatedAt;

    private Boolean logWritten = false;
    private LocalDateTime logWrittenAt;

    private String errorMessage;
    private LocalDateTime updatedAt;

    public OrderStatus() {}

    public OrderStatus(Long orderId) {
        this.orderId = orderId;
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public Boolean getSaved() { return saved; }
    public void setSaved(Boolean saved) { this.saved = saved; this.savedAt = LocalDateTime.now(); this.updatedAt = LocalDateTime.now(); }

    public LocalDateTime getSavedAt() { return savedAt; }
    public void setSavedAt(LocalDateTime savedAt) { this.savedAt = savedAt; }

    public Boolean getEmailSent() { return emailSent; }
    public void setEmailSent(Boolean emailSent) { this.emailSent = emailSent; this.emailSentAt = LocalDateTime.now(); this.updatedAt = LocalDateTime.now(); }

    public LocalDateTime getEmailSentAt() { return emailSentAt; }
    public void setEmailSentAt(LocalDateTime emailSentAt) { this.emailSentAt = emailSentAt; }

    public Boolean getInventoryUpdated() { return inventoryUpdated; }
    public void setInventoryUpdated(Boolean inventoryUpdated) { this.inventoryUpdated = inventoryUpdated; this.inventoryUpdatedAt = LocalDateTime.now(); this.updatedAt = LocalDateTime.now(); }

    public LocalDateTime getInventoryUpdatedAt() { return inventoryUpdatedAt; }
    public void setInventoryUpdatedAt(LocalDateTime inventoryUpdatedAt) { this.inventoryUpdatedAt = inventoryUpdatedAt; }

    public Boolean getLogWritten() { return logWritten; }
    public void setLogWritten(Boolean logWritten) { this.logWritten = logWritten; this.logWrittenAt = LocalDateTime.now(); this.updatedAt = LocalDateTime.now(); }

    public LocalDateTime getLogWrittenAt() { return logWrittenAt; }
    public void setLogWrittenAt(LocalDateTime logWrittenAt) { this.logWrittenAt = logWrittenAt; }

    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; this.updatedAt = LocalDateTime.now(); }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
