package com.example.orderservice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody OrderDTO dto) {
        Order saved = orderService.createOrder(dto);
        Map<String, Object> body = new HashMap<>();
        body.put("message", "Đơn hàng của bạn đã được ghi nhận. Vui lòng kiểm tra email xác nhận.");
        body.put("orderId", saved.getId());
        return ResponseEntity.ok(body);
    }
}
