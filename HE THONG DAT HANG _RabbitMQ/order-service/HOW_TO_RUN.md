# 🎯 Hướng Dẫn Thực Thi - Dashboard Web

## 📦 Bạn Vừa Nhận Được Gì?

**Một hệ thống đặt hàng hoàn chỉnh:**
- ✅ Spring Boot 3.5.0 (upgraded)
- ✅ REST API (3 endpoints)
- ✅ Real-time status tracking
- ✅ **Dashboard Web đẹp** (mới!)
- ✅ Async processing
- ✅ In-memory database

---
````markdown
# Dashboard Web — How to run

This repository includes a small order service and a static admin dashboard. These instructions get the service running locally.

## What you get

- Spring Boot 3.5.0 backend
- A REST API (create order, get status, recent orders)
- Background processing with simple status tracking
- A static frontend served from `src/main/resources/static` (index.html, CSS, JS)
- H2 in-memory database (test data seeded at startup)

---

## Run the application (two options)

### 1) Quick (command line)

```bash
cd d:\Visuastudio\HE THONG DAT HANG _RabbitMQ\order-service
mvn clean package
java -jar target/order-service-0.0.1-SNAPSHOT.jar
```

### 2) From VS Code

1. Open the `order-service` folder in VS Code.
2. Open a new terminal (Terminal → New Terminal).
3. Run the same commands as above to build and start the JAR.

---

## Open the dashboard

Once the app starts, open:
 4re32reuhyyyyyyyyyyyyyy```
http://localhost:8080
```

Or directly:

```
http://localhost:8080/index.html
```

---

## Main UI overview

The dashboard has three tabs:

- Dashboard: overall statistics and the 50 most recent orders.
- Orders: full list with search by order ID.
- Create: a simple form to create a new order.

Orders go through four processing steps: Saved → Email → Inventory → Log. Each step records a timestamp.

---

## Example quick walkthrough

1. Create a couple of orders using the Create tab.
2. Switch to the Dashboard tab; you should see updated counts and the new orders in the recent list.
3. Click an order to open the detail modal and view the processing timeline.

---

## Technical notes

- Server port: `8080`.
- Database: H2 (in-memory). Data will be lost when the app stops.
- Initial products seeded at startup: `P-001` (stock 100), `P-002` (stock 50).

---

## Troubleshooting

- Dashboard not loading: make sure the app is running and port 8080 is free.
- Create order fails: check required fields (customerName, quantity > 0, totalPrice ≥ 0).
- Data lost after restart: expected when using H2 in-memory; use a persistent DB in production.

---

## API endpoints (for testing)

POST /api/orders
Content-Type: application/json

```json
{
  "customerName": "Alice",
  "productId": "P-001",
  "quantity": 5,
  "totalPrice": 500000
}
```

GET /api/orders/{id}/status

GET /api/admin/recent-orders

---

## Next steps and suggestions

- For production, switch from H2 to a persistent database (PostgreSQL or MySQL).
- Add authentication and input validation before exposing the service publicly.
- Add monitoring and persistent logs when running in production.

---

If you need a one-line start command, run:

```bash
cd order-service && mvn clean package && java -jar target/order-service-0.0.1-SNAPSHOT.jar
```

````
```
