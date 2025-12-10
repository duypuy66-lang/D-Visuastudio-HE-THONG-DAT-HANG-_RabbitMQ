Ứng dụng được chia thành ba phần chính: backend Spring Boot, frontend dạng static files, và cấu hình/runtime. Mỗi phần đảm nhiệm một vai trò riêng trong việc xử lý đơn hàng, quản lý tồn kho, và hiển thị dữ liệu trên dashboard.
Backend (Java / Spring Boot)
Thành phần trung tâm là lớp OrderServiceApplication.java, ứng dụng Spring Boot khởi chạy toàn hệ thống, đồng thời bật @EnableAsync để hỗ trợ xử lý bất đồng bộ cho các tác vụ nền như gửi email, cập nhật kho hay ghi log.
Entities
Các mô hình dữ liệu gồm:
Order — thông tin đơn hàng cơ bản.
OrderStatus — trạng thái xử lý đơn.
OrderLog — lịch sử log theo từng bước xử lý.
Inventory — mô tả tồn kho và các cập nhật liên quan.
Repositories
Sử dụng Spring Data JPA để truy vấn và thao tác với cơ sở dữ liệu cho từng bảng tương ứng.
Services
OrderService: thành phần điều phối chính, chịu trách nhiệm tạo đơn, kiểm tra tồn kho và kích hoạt các thao tác async.
BackgroundTaskService / DashboardService: xử lý các công việc chạy nền như gửi email, ghi log, cập nhật tồn kho, đồng thời duy trì dữ liệu cache cho dashboard.
InventoryService: triển khai toàn bộ logic liên quan đến quản lý lượng tồn và cập nhật kho.
Controllers (REST API)
OrderController: cung cấp endpoint POST /api/orders để tạo mới đơn hàng.
OrderStatusController: endpoint GET /api/orders/{id}/status để kiểm tra trạng thái đơn.
AdminController: endpoint GET /api/admin/recent-orders phục vụ dashboard hiển thị danh sách đơn gần nhất.
Frontend (static files)
Phần hiển thị được xây dựng bằng static resources:
index.html: giao diện dashboard một trang (SPA).
styles.css: xử lý giao diện, layout, và responsive.
app.js: gửi request đến backend, cập nhật UI theo thời gian thực, và hiển thị trạng thái đơn.
Configuration & Runtime
application.properties: cấu hình H2 database, cổng server, static resources và địa chỉ bind.
pom.xml: khai báo dependencies và Spring Boot parent (3.5.0).
JAR chạy độc lập: order-service-0.0.1-SNAPSHOT.jar.
Documentation & Tooling
HOW_TO_RUN.md: hướng dẫn chạy chi tiết.
QUICK_START.md: phần demo nhanh.
DASHBOARD_GUIDE.md: giải thích luồng xử lý và cách dùng dashboard.
.github/appmod/code-migration/: tài liệu migration và báo cáo nâng cấp

