package com.example.orderservice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderStatusController {

    private final OrderStatusRepository orderStatusRepository;

    public OrderStatusController(OrderStatusRepository orderStatusRepository) {
        this.orderStatusRepository = orderStatusRepository;
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<OrderStatus> getOrderStatus(@PathVariable Long id) {
        Optional<OrderStatus> orderStatus = orderStatusRepository.findByOrderId(id);
        if (orderStatus.isPresent()) {
            return ResponseEntity.ok(orderStatus.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
