# 📦 Dashboard Hệ Thống Đặt Hàng

## 🚀 Giới Thiệu

Dashboard Web là giao diện trực quan để quản lý và theo dõi đơn hàng real-time. Bạn có thể:

✅ **Tạo đơn hàng mới** - Nhập thông tin khách hàng, sản phẩm, số lượng, giá  
✅ **Theo dõi trạng thái** - Xem chi tiết từng bước xử lý đơn hàng  
✅ **Xem thống kê** - Dashboard hiển thị tổng số đơn, hoàn thành, đang xử lý, lỗi  
✅ **Tìm kiếm đơn hàng** - Tìm nhanh theo ID đơn  
✅ **Quản lý kho** - Theo dõi tồn kho sản phẩm  

---

## 📋 Các Bước Xử Lý Đơn Hàng

Khi bạn tạo một đơn hàng, hệ thống sẽ tự động thực hiện các bước sau:

```
┌─────────────────────────────────────────────┐
│  1️⃣  Đã lưu (Saved)                        │
│     → Lưu đơn hàng vào database             │
├─────────────────────────────────────────────┤
│  2️⃣  Email (Gửi xác nhận)                   │
│     → Gửi email xác nhận đến khách hàng     │
├─────────────────────────────────────────────┤
│  3️⃣  Kho (Cập nhật kho)                     │
│     → Giảm tồn kho sản phẩm                 │
├─────────────────────────────────────────────┤
│  4️⃣  Log (Ghi nhật ký)                      │
```markdown
# Dashboard Guide — Order Service

This document explains how the dashboard works, the order processing steps, and how to use the UI and APIs.

## Overview

The dashboard is a simple admin UI that lets you create orders, watch their processing status, and view recent orders. Key features:

- Create new orders (customer name, product, quantity, price).
- Track processing status for each order (Saved → Email → Inventory → Log).
- View overall statistics and a list of recent orders.
- Search orders by ID and open a detail modal with timestamps.

## Order processing steps

When an order is created the background worker runs these steps (timestamps recorded):

1) Saved — order persisted to the H2 database.
2) Email — confirmation is simulated (no real email service by default).
3) Inventory — stock is decreased.
4) Log — a processing log entry is written.

If any step fails, the error is saved in the order status and displayed in the UI.

## Run and open the UI

Build and run the service (see HOW_TO_RUN.md). Then open:

```
http://localhost:8080
```

## UI sections

- Dashboard tab: 4 stat cards (Total, Completed, Processing, Errors) and the 50 most recent orders.
- Orders tab: full list, search by ID, reload button, and click to open details.
- Create tab: simple form to create an order.

## Order detail modal

The modal shows basic order fields and a timeline of the four processing steps with timestamps. Example fields:

```
Order ID: 123
Customer: Alice
Product: P-001
Quantity: 5
Total price: 500000
Created at: 2024-12-09T10:30:45
```

Timeline example:

- Saved — 2024-12-09T10:30:45
- Email — 2024-12-09T10:30:46
- Inventory — 2024-12-09T10:30:47
- Log — 2024-12-09T10:30:48

## API endpoints used by the UI

POST /api/orders

GET /api/orders/{id}/status

GET /api/admin/recent-orders

## Troubleshooting

- Dashboard not loading: verify the app is running on port 8080 and that static files are served.
- Create order fails: check required fields (customerName, quantity > 0, totalPrice ≥ 0) and server logs.
- Status updates delayed: background processing is asynchronous; allow 1–2 seconds for updates.

## Default products

Product codes seeded at startup:

| Code  | Initial stock |
|-------|---------------|
| P-001 | 100           |
| P-002 | 50            |

## Next steps (optional)

- Replace email simulation with a real SMTP or external service.
- Add authentication on the dashboard for production.
- Persist data to a production database (PostgreSQL, MySQL).

```
  09/12/2024 10:30:45
