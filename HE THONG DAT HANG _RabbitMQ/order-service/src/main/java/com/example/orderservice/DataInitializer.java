package com.example.orderservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final InventoryRepository inventoryRepository;

    public DataInitializer(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Seed some inventory if not present
        if (inventoryRepository.findByProductId("P-001").isEmpty()) {
            inventoryRepository.save(new Inventory("P-001", 100));
        }
        if (inventoryRepository.findByProductId("P-002").isEmpty()) {
            inventoryRepository.save(new Inventory("P-002", 50));
        }
    }
}
