```markdown
# 📚 Chỉ Mục Tài Liệu — Hệ Thống Đặt Hàng

Chào mừng! Tệp này hướng dẫn nhanh về các tài liệu quan trọng và cách chạy dự án.

---

## ⚡ Bắt đầu nhanh (5 phút)

Muốn chạy ngay: xem `HOW_TO_RUN.md` — hướng dẫn từng bước, ví dụ nhanh và xử lý lỗi.

---

## Tài liệu chính

- `HOW_TO_RUN.md` — Hướng dẫn chạy chi tiết.
- `QUICK_START.md` — Bắt đầu nhanh (1 trang).
- `DASHBOARD_GUIDE.md` — Hướng dẫn dashboard, luồng xử lý đơn, FAQ.
- `README_WEB_DASHBOARD.md` — Tổng quan giao diện web và tính năng.
- `FINAL_SUMMARY.md` — Tóm tắt toàn bộ dự án (lịch sử, cấu trúc, endpoints).

---

## Tài liệu kỹ thuật

Xem thư mục `.github/appmod/code-migration/` cho thông tin nâng cấp, báo cáo build và ghi chú kỹ thuật (`summary.md`, `progress.md`).

---

## Điểm nổi bật của dự án

- Backend: Spring Boot 3.5, xử lý bất đồng bộ (async), 5 entity, 4 repository, 3 REST controller.
- Frontend: static dashboard tại `src/main/resources/static/` (HTML/CSS/JS), responsive, cập nhật realtime.
- Database: H2 in-memory (dùng seed data để thử nhanh).
- Build: Maven 3.9.5, Java JDK 21.

---

## Lệnh chạy nhanh

Mở PowerShell và chạy:

```powershell
cd d:\Visuastudio\HE THONG DAT HANG _RabbitMQ\order-service
C:\Users\Duy\.maven\apache-maven-3.9.5\bin\mvn.cmd clean package
java -jar target/order-service-0.0.1-SNAPSHOT.jar
```

Mở trình duyệt:

```
http://localhost:8080
```
hoac may khac
http://192.168.1.124:8080
---

## Thứ tự đọc gợi ý

1. `HOW_TO_RUN.md` — chạy app (5 min)
2. `QUICK_START.md` — demo nhanh (3 min)
3. `DASHBOARD_GUIDE.md` — đọc sâu (15 min)

---

## Hỗ trợ

Vấn đề thường gặp:
- Dashboard không tải → kiểm tra app có đang chạy và cổng 8080 có mở không.
- Dữ liệu mất sau restart → H2 là in-memory; dùng Postgres để lưu lâu dài.

Xem chi tiết trong `DASHBOARD_GUIDE.md` và `HOW_TO_RUN.md`.

---

## Mô tả các thành phần (component overview)

Đây là mô tả ngắn gọn các thành phần chính của ứng dụng để bạn hiểu vai trò từng phần.

- Backend (Java / Spring Boot)
	- `OrderServiceApplication.java`: ứng dụng Spring Boot chính, bật `@EnableAsync` để xử lý bất đồng bộ.
	- Entities: `Order`, `OrderStatus`, `OrderLog`, `Inventory` — mô hình dữ liệu chính.
	- Repositories: Spring Data JPA repositories cho `Order`, `OrderStatus`, `OrderLog`, `Inventory`.
	- Services:
		- `OrderService` — xử lý tạo đơn và luồng nghiệp vụ chính.
		- `BackgroundTaskService` / `DashboardService` — xử lý các bước async (gửi email, cập nhật kho, ghi log) và cache cho dashboard.
		- `InventoryService` — logic quản lý tồn kho.
	- Controllers (REST):
		- `OrderController` — endpoint `POST /api/orders` để tạo đơn.
		- `OrderStatusController` — endpoint `GET /api/orders/{id}/status` để kiểm tra trạng thái.
		- `AdminController` — endpoint `GET /api/admin/recent-orders` cho dashboard.

- Frontend (static files)
	- `src/main/resources/static/index.html` — single-page dashboard UI.
	- `src/main/resources/static/css/styles.css` — styles và responsive rules.
	- `src/main/resources/static/js/app.js` — fetch calls đến REST API, UI logic, và cập nhật realtime.

- Configuration & runtime
	- `application.properties` — cấu hình H2, static resources, `server.address` (bind), và port.
	- Maven `pom.xml` — dependencies và Spring Boot parent (3.5.0).
	- Runnable JAR: `target/order-service-0.0.1-SNAPSHOT.jar` khi build.

- Documentation & tooling
	- `HOW_TO_RUN.md` — hướng dẫn chạy chi tiết.
	- `QUICK_START.md` — demo nhanh.
	- `DASHBOARD_GUIDE.md` — hướng dẫn sử dụng dashboard và luồng xử lý.
	- `.github/appmod/code-migration/` — báo cáo nâng cấp/migration.

---

Created: December 9, 2024  
Version: v1.0

Bắt đầu từ `HOW_TO_RUN.md` để chạy dự án. 🚀

```