package com.example.orderservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InventoryService {

    private static final Logger logger = LoggerFactory.getLogger(InventoryService.class);

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Transactional
    public void decreaseStock(String productId, int qty) {
        Inventory inv = inventoryRepository.findByProductId(productId)
                .orElseGet(() -> new Inventory(productId, 0));
        int current = inv.getStock() == null ? 0 : inv.getStock();
        int updated = Math.max(0, current - qty);
        inv.setStock(updated);
        inventoryRepository.save(inv);
        logger.info("Inventory updated for product {}: {} -> {}", productId, current, updated);
    }

}
