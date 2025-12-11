// Tab Navigation
function showTab(tabName, event) {
    if (event) {
        event.preventDefault();
    }
    
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active from buttons
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    if (event && event.target) {
        event.target.closest('.nav-btn').classList.add('active');
    }

    // Load data for dashboard when clicked
    if (tabName === 'dashboard') {
        loadDashboard();
    } else if (tabName === 'orders') {
        loadAllOrders();
    }
}

// Load Dashboard
function loadDashboard() {
    console.log('Loading dashboard...');
    
    // Load recent orders
    fetch('/api/admin/recent-orders')
        .then(response => response.json())
        .then(orders => {
            console.log('Recent orders:', orders);
            displayRecentOrders(orders);
            updateStats(orders);
        })
        .catch(error => console.error('Error loading recent orders:', error));
}

// Update Statistics
function updateStats(orders) {
    let total = orders.length;
    let completed = 0;
    let processing = 0;
    let errors = 0;

    orders.forEach(order => {
        // Fetch status for each order
        fetch(`/api/orders/${order.id}/status`)
            .then(response => response.json())
            .then(status => {
                if (status.errorMessage) {
                    errors++;
                } else if (status.saved && status.emailSent && status.inventoryUpdated && status.logWritten) {
                    completed++;
                } else {
                    processing++;
                }
                updateStatDisplay();
            })
            .catch(error => {
                processing++;
                updateStatDisplay();
            });
    });

    function updateStatDisplay() {
        document.getElementById('totalOrders').textContent = total;
        document.getElementById('completedOrders').textContent = completed;
        document.getElementById('processingOrders').textContent = processing;
        document.getElementById('errorOrders').textContent = errors;
    }

    // Initial display
    setTimeout(() => updateStatDisplay(), 500);
}

// Display Recent Orders
function displayRecentOrders(orders) {
    const container = document.getElementById('recentOrdersList');
    
    if (orders.length === 0) {
        container.innerHTML = '<p class="loading">Không có đơn hàng nào</p>';
        return;
    }

    container.innerHTML = orders.map(order => `
        <div class="order-card" onclick="showOrderDetails(${order.id})">
            <div class="order-header">
                <span class="order-id">Đơn #${order.id}</span>
                <span class="order-customer">${order.customerName}</span>
            </div>
            <div class="order-info">
                <div class="info-item">
                    <span class="info-label">Sản phẩm:</span>
                    <span class="info-value">${order.productId}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Số lượng:</span>
                    <span class="info-value">${order.quantity}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Tổng giá:</span>
                    <span class="info-value">${formatPrice(order.totalPrice)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ngày tạo:</span>
                    <span class="info-value">${formatDate(order.createdAt)}</span>
                </div>
            </div>
            <div id="status-${order.id}" class="status-steps"></div>
        </div>
    `).join('');

    // Load status for each order
    orders.forEach(order => {
        fetch(`/api/orders/${order.id}/status`)
            .then(response => response.json())
            .then(status => {
                displayOrderStatus(order.id, status);
            })
            .catch(error => console.error('Error loading status:', error));
    });
}

// Display Order Status
function displayOrderStatus(orderId, status) {
    const container = document.getElementById(`status-${orderId}`);
    const steps = [
        { label: 'Đã lưu', done: status.saved },
        { label: 'Email', done: status.emailSent },
        { label: 'Kho', done: status.inventoryUpdated },
        { label: 'Log', done: status.logWritten }
    ];

    container.innerHTML = steps.map(step => `
        <div class="step">
            <div class="step-icon ${step.done ? 'done' : 'pending'}">
                ${step.done ? '✓' : '○'}
            </div>
            <span>${step.label}</span>
        </div>
    `).join('');
}

// Load All Orders
function loadAllOrders() {
    fetch('/api/admin/recent-orders')
        .then(response => response.json())
        .then(orders => {
            displayAllOrders(orders);
        })
        .catch(error => console.error('Error loading orders:', error));
}

// Display All Orders
function displayAllOrders(orders) {
    const container = document.getElementById('allOrdersList');
    
    if (orders.length === 0) {
        container.innerHTML = '<p class="loading">Không có đơn hàng nào</p>';
        return;
    }

    container.innerHTML = orders.map(order => `
        <div class="order-card" onclick="showOrderDetails(${order.id})">
            <div class="order-header">
                <span class="order-id">Đơn #${order.id}</span>
                <span class="order-customer">${order.customerName}</span>
            </div>
            <div class="order-info">
                <div class="info-item">
                    <span class="info-label">Sản phẩm:</span>
                    <span class="info-value">${order.productId}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Số lượng:</span>
                    <span class="info-value">${order.quantity}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Tổng giá:</span>
                    <span class="info-value">${formatPrice(order.totalPrice)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ngày tạo:</span>
                    <span class="info-value">${formatDate(order.createdAt)}</span>
                </div>
            </div>
            <div id="status-${order.id}" class="status-steps"></div>
        </div>
    `).join('');

    // Load status for each order
    orders.forEach(order => {
        fetch(`/api/orders/${order.id}/status`)
            .then(response => response.json())
            .then(status => {
                displayOrderStatus(order.id, status);
            })
            .catch(error => console.error('Error loading status:', error));
    });
}

// Search Order
function searchOrder() {
    const orderId = document.getElementById('searchOrderId').value;
    if (!orderId) {
        alert('Vui lòng nhập ID đơn hàng');
        return;
    }

    fetch(`/api/orders/${orderId}/status`)
        .then(response => {
            if (!response.ok) throw new Error('Không tìm thấy đơn hàng');
            return response.json();
        })
        .then(status => {
            showOrderDetails(orderId);
        })
        .catch(error => alert('Lỗi: ' + error.message));
}

// Show Order Details
function showOrderDetails(orderId) {
    const modal = document.getElementById('orderModal');

    // Fetch order and status data
    Promise.all([
        fetch('/api/admin/recent-orders').then(r => r.json()),
        fetch(`/api/orders/${orderId}/status`).then(r => r.json())
    ])
    .then(([orders, status]) => {
        const order = orders.find(o => o.id == orderId);
        if (!order) {
            alert('Không tìm thấy đơn hàng');
            return;
        }

        displayOrderDetailsModal(order, status);
        modal.classList.add('show');
    })
    .catch(error => console.error('Error:', error));
}

// Display Order Details in Modal
function displayOrderDetailsModal(order, status) {
    const detailsDiv = document.getElementById('orderDetails');
    detailsDiv.innerHTML = `
        <div class="detail-row">
            <span class="detail-label">ID Đơn hàng:</span>
            <span class="detail-value">#${order.id}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Tên khách hàng:</span>
            <span class="detail-value">${order.customerName}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Sản phẩm:</span>
            <span class="detail-value">${order.productId}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Số lượng:</span>
            <span class="detail-value">${order.quantity}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Tổng giá:</span>
            <span class="detail-value">${formatPrice(order.totalPrice)}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Ngày tạo:</span>
            <span class="detail-value">${formatDateTime(order.createdAt)}</span>
        </div>
    `;

    const statusDiv = document.getElementById('orderStatus');
    const isComplete = status.saved && status.emailSent && status.inventoryUpdated && status.logWritten;
    
    statusDiv.innerHTML = `
        <div class="status-title">Trạng thái xử lý</div>
        <div class="status-timeline">
            ${getStatusTimeline(status)}
        </div>
        ${status.errorMessage ? `<div style="margin-top: 12px; color: #721c24; background: #f8d7da; padding: 10px; border-radius: 6px;">⚠️ Lỗi: ${status.errorMessage}</div>` : ''}
    `;
}

// Get Status Timeline
function getStatusTimeline(status) {
    return `
        <div class="timeline-item">
            <div class="timeline-icon ${status.saved ? 'done' : 'pending'}">
                ${status.saved ? '✓' : '○'}
            </div>
            <div class="timeline-content">
                <div class="timeline-label">Đơn hàng đã lưu</div>
                <div class="timeline-time">${status.savedAt ? formatDateTime(status.savedAt) : 'Chưa lưu'}</div>
            </div>
        </div>
        <div class="timeline-item">
            <div class="timeline-icon ${status.emailSent ? 'done' : 'pending'}">
                ${status.emailSent ? '✓' : '○'}
            </div>
            <div class="timeline-content">
                <div class="timeline-label">Email xác nhận đã gửi</div>
                <div class="timeline-time">${status.emailSentAt ? formatDateTime(status.emailSentAt) : 'Chưa gửi'}</div>
            </div>
        </div>
        <div class="timeline-item">
            <div class="timeline-icon ${status.inventoryUpdated ? 'done' : 'pending'}">
                ${status.inventoryUpdated ? '✓' : '○'}
            </div>
            <div class="timeline-content">
                <div class="timeline-label">Kho hàng đã cập nhật</div>
                <div class="timeline-time">${status.inventoryUpdatedAt ? formatDateTime(status.inventoryUpdatedAt) : 'Chưa cập nhật'}</div>
            </div>
        </div>
        <div class="timeline-item">
            <div class="timeline-icon ${status.logWritten ? 'done' : 'pending'}">
                ${status.logWritten ? '✓' : '○'}
            </div>
            <div class="timeline-content">
                <div class="timeline-label">Nhật ký đã ghi</div>
                <div class="timeline-time">${status.logWrittenAt ? formatDateTime(status.logWrittenAt) : 'Chưa ghi'}</div>
            </div>
        </div>
    `;
}

// Close Modal
function closeModal() {
    document.getElementById('orderModal').classList.remove('show');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
}

// Create Order Form Handler
document.getElementById('createOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const orderData = {
        customerName: document.getElementById('customerName').value,
        productId: document.getElementById('productId').value,
        quantity: parseInt(document.getElementById('quantity').value),
        totalPrice: parseFloat(document.getElementById('totalPrice').value)
    };

    fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('formMessage');
        messageDiv.classList.add('show', 'success');
        messageDiv.textContent = `✓ ${data.message} - ID: ${data.orderId}`;
        
        // Reset form
        document.getElementById('createOrderForm').reset();
        
        // Clear message after 3 seconds
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 3000);

        // Reload dashboard
        setTimeout(() => loadDashboard(), 1000);
    })
    .catch(error => {
        const messageDiv = document.getElementById('formMessage');
        messageDiv.classList.add('show', 'error');
        messageDiv.textContent = '✗ Lỗi: ' + error.message;
    });
});

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
}

function formatDateTime(dateString) {
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
}

// Initial load
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
});
