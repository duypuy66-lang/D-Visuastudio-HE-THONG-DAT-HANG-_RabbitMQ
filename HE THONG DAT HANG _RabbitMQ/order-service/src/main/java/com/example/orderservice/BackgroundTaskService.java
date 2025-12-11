package com.example.orderservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class BackgroundTaskService {

    private static final Logger logger = LoggerFactory.getLogger(BackgroundTaskService.class);

    private final InventoryService inventoryService;
    private final OrderLogRepository orderLogRepository;
    private final OrderStatusRepository orderStatusRepository;
    private final DashboardService dashboardService;

    public BackgroundTaskService(InventoryService inventoryService, OrderLogRepository orderLogRepository,
                                 OrderStatusRepository orderStatusRepository, DashboardService dashboardService) {
        this.inventoryService = inventoryService;
        this.orderLogRepository = orderLogRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.dashboardService = dashboardService;
    }

    @Async("taskExecutor")
    public void processOrder(Order order) {
        OrderStatus status = new OrderStatus(order.getId());
        try {
            // Mark as saved
            status.setSaved(true);
            orderStatusRepository.save(status);
            logger.info("Order {} marked as saved", order.getId());

            // Send confirmation email
            sendConfirmationEmail(order);
            status.setEmailSent(true);
            orderStatusRepository.save(status);
            logger.info("Order {} email sent status updated", order.getId());

            // Update inventory
            inventoryService.decreaseStock(order.getProductId(), order.getQuantity() == null ? 0 : order.getQuantity());
            status.setInventoryUpdated(true);
            orderStatusRepository.save(status);
            logger.info("Order {} inventory updated status", order.getId());

            // Write order log
            writeOrderLog(order);
            status.setLogWritten(true);
            orderStatusRepository.save(status);
            logger.info("Order {} log written status updated", order.getId());

            // Push to dashboard
            dashboardService.push(order);

        } catch (Exception ex) {
            logger.error("Error processing background tasks for order {}", order.getId(), ex);
            status.setErrorMessage(ex.getMessage());
            orderStatusRepository.save(status);
        }
    }

    private void sendConfirmationEmail(Order order) {
        // Simulate sending email by logging
        logger.info("[EMAIL] To: {} - Subject: Order Confirmation - Order#{} - Message: Your order was received.", order.getCustomerName(), order.getId());
    }

    private void writeOrderLog(Order order) {
        String msg = String.format("Order saved: id=%d, customer=%s, product=%s, qty=%d, total=%s, createdAt=%s",
                order.getId(), order.getCustomerName(), order.getProductId(), order.getQuantity(), order.getTotalPrice(), order.getCreatedAt());
        OrderLog log = new OrderLog(order.getId(), msg);
        orderLogRepository.save(log);
        logger.info("Order log written for order {}", order.getId());
    }
}
