// Admin Order Management System
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const ordersList = document.getElementById('orders-list');
    const searchInput = document.getElementById('search-orders');
    const statusFilter = document.getElementById('filter-status');
    const orderDetailsModal = document.getElementById('order-details-modal');
    const closeModal = document.querySelector('.close');
    const orderDetailsContent = document.getElementById('order-details-content');
    const statusSelect = document.getElementById('status-select');
    const updateStatusBtn = document.getElementById('update-status-btn');
    const orderIdHeader = document.getElementById('order-id-header');

    // Current selected order
    let currentOrder = null;

    // Load and display orders
    function loadOrders() {
        try {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const ordersList = document.getElementById('orders-list');
            ordersList.innerHTML = '';

            orders.forEach(order => {
                const row = document.createElement('tr');
                const formattedDate = new Date(order.date).toLocaleString('id-ID');
                const formattedTotal = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                }).format(order.total);

row.innerHTML = ` 
    <td>${order.id}</td>
    <td>${formattedDate}</td>
    <td>${formattedTotal}</td>
    <td>${order.status}</td>
    <td><button class="detail-btn">Detail</button></td>
                    <td>${order.id}</td>
                    <td>${formattedDate}</td>
                    <td>${formattedTotal}</td>
                    <td>${order.status}</td>
                    <td><button onclick="showOrderDetails('${order.id}')" class="detail-btn">Detail</button></td>
                `;
                ordersList.appendChild(row);
            });
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    }

    // Show order details in modal
    function showOrderDetails(orderId) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        console.log('Orders in local storage:', orders); // Log orders in local storage
        const order = orders.find(o => o.id === orderId);
        
        if (order) {
            console.log('Retrieved order:', order); // Log the retrieved order
            const modal = document.getElementById('order-details-modal');
            document.getElementById('order-id-header').textContent = order.id;
            document.getElementById('order-name').textContent = order.customerName;
            document.getElementById('order-address').textContent = order.customerAddress;
            document.getElementById('order-number').textContent = order.customerPhone;
            
            // Set current status
            const statusSelect = document.getElementById('status-select');
            statusSelect.value = order.status;
            statusSelect.dataset.orderId = order.id;
            
            modal.style.display = 'block';
        }
    }

    // Update order status
    function updateOrderStatus() {
        const statusSelect = document.getElementById('status-select');
        const orderId = statusSelect.dataset.orderId;
        const newStatus = statusSelect.value;
        
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const orderIndex = orders.findIndex(o => o.id === orderId);
        
        if (orderIndex !== -1) {
            orders[orderIndex].status = newStatus;
            localStorage.setItem('orders', JSON.stringify(orders));
            loadOrders();
            alert('Status pesanan berhasil diperbarui');
        }
    }

    // Event listeners
    searchInput.addEventListener('input', loadOrders);
    statusFilter.addEventListener('change', loadOrders);
    closeModal.addEventListener('click', () => {
        orderDetailsModal.style.display = 'none';
    });
    updateStatusBtn.addEventListener('click', updateOrderStatus);

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === orderDetailsModal) {
            orderDetailsModal.style.display = 'none';
        }
    });

    // Initial load
    loadOrders();
});
