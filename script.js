// Global variables and state management
const AppState = {
    currentUser: null,
    currentPage: 'overview',
    theme: 'light',
    sidebarCollapsed: false,
    notifications: [],
    users: [],
    products: [],
    orders: [],
    customers: [],
    activities: [],
    currentUserPage: 1,
    usersPerPage: 10,
    charts: {},
    realTimeInterval: null,
    searchResults: []
};

// Sample data generators
const DataGenerator = {
    generateUsers(count = 50) {
        const roles = ['admin', 'user', 'moderator', 'viewer'];
        const statuses = ['active', 'inactive', 'pending'];
        const departments = ['sales', 'marketing', 'support', 'development', 'hr'];
        const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emily', 'Chris', 'Lisa', 'Tom', 'Anna'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
        
        return Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
            lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
            email: `user${i + 1}@example.com`,
            role: roles[Math.floor(Math.random() * roles.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            department: departments[Math.floor(Math.random() * departments.length)],
            lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            created: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            avatar: `/placeholder.svg?height=40&width=40&text=${firstNames[Math.floor(Math.random() * firstNames.length)][0]}${lastNames[Math.floor(Math.random() * lastNames.length)][0]}`
        }));
    },

    generateProducts(count = 20) {
        const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys'];
        const productNames = ['Wireless Headphones', 'Smart Watch', 'Laptop Stand', 'USB-C Hub', 'Bluetooth Speaker', 'Phone Case', 'Tablet', 'Monitor', 'Keyboard', 'Mouse'];
        
        return Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            name: productNames[Math.floor(Math.random() * productNames.length)] + ` ${i + 1}`,
            price: Math.floor(Math.random() * 500) + 10,
            stock: Math.floor(Math.random() * 100),
            category: categories[Math.floor(Math.random() * categories.length)],
            image: `/placeholder.svg?height=200&width=200&text=Product${i + 1}`,
            created: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            sales: Math.floor(Math.random() * 1000)
        }));
    },

    generateOrders(count = 100) {
        const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        const customers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown'];
        
        return Array.from({ length: count }, (_, i) => ({
            id: `ORD-${String(i + 1).padStart(4, '0')}`,
            customer: customers[Math.floor(Math.random() * customers.length)],
            date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            total: Math.floor(Math.random() * 1000) + 50,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            items: Math.floor(Math.random() * 5) + 1
        }));
    },

    generateActivities(count = 20) {
        const activities = [
            { type: 'user', icon: 'fas fa-user-plus', message: 'New user registered', color: 'var(--primary-500)' },
            { type: 'order', icon: 'fas fa-shopping-cart', message: 'Order completed', color: 'var(--success-500)' },
            { type: 'product', icon: 'fas fa-box', message: 'New product added', color: 'var(--warning-500)' },
            { type: 'payment', icon: 'fas fa-credit-card', message: 'Payment received', color: 'var(--success-500)' },
            { type: 'support', icon: 'fas fa-headset', message: 'Support ticket created', color: 'var(--danger-500)' }
        ];
        
        return Array.from({ length: count }, (_, i) => {
            const activity = activities[Math.floor(Math.random() * activities.length)];
            return {
                id: i + 1,
                ...activity,
                time: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
                user: 'System'
            };
        });
    },

    generateNotifications(count = 10) {
        const notifications = [
            { type: 'info', title: 'System Update', message: 'System will be updated tonight at 2 AM', icon: 'fas fa-info-circle' },
            { type: 'success', title: 'Backup Complete', message: 'Daily backup completed successfully', icon: 'fas fa-check-circle' },
            { type: 'warning', title: 'Storage Warning', message: 'Storage is 85% full', icon: 'fas fa-exclamation-triangle' },
            { type: 'error', title: 'Failed Login', message: 'Multiple failed login attempts detected', icon: 'fas fa-exclamation-circle' }
        ];
        
        return Array.from({ length: count }, (_, i) => {
            const notification = notifications[Math.floor(Math.random() * notifications.length)];
            return {
                id: i + 1,
                ...notification,
                time: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
                read: Math.random() > 0.3
            };
        });
    }
};

// Utility functions
const Utils = {
    formatNumber(num) {
        return new Intl.NumberFormat().format(num);
    },

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(new Date(date));
    },

    formatRelativeTime(date) {
        const now = new Date();
        const diff = now - new Date(date);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes} minutes ago`;
        if (hours < 24) return `${hours} hours ago`;
        return `${days} days ago`;
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        return {
            score: strength,
            level: strength < 2 ? 'weak' : strength < 4 ? 'medium' : 'strong'
        };
    }
};

// Local Storage Manager
const Storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    },

    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Failed to read from localStorage:', e);
            return defaultValue;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Failed to remove from localStorage:', e);
        }
    }
};

// Toast Notification System
const Toast = {
    show(type, title, message, duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${this.getIcon(type)}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        const container = document.getElementById('toastContainer');
        container.appendChild(toast);

        // Auto remove after duration
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, duration);

        return toast;
    },

    getIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    },

    success(title, message) {
        return this.show('success', title, message);
    },

    error(title, message) {
        return this.show('error', title, message);
    },

    warning(title, message) {
        return this.show('warning', title, message);
    },

    info(title, message) {
        return this.show('info', title, message);
    }
};

// Chart Manager
const ChartManager = {
    createSparkline(canvasId, data, color) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: data.length }, (_, i) => i),
                datasets: [{
                    data: data,
                    borderColor: color,
                    backgroundColor: color + '20',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                elements: {
                    point: { radius: 0 }
                }
            }
        });
    },

    createSalesChart() {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return null;

        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Sales',
                data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 38000, 42000, 45000],
                borderColor: 'var(--primary-500)',
                backgroundColor: 'var(--primary-100)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Target',
                data: [15000, 20000, 18000, 28000, 25000, 32000, 30000, 37000, 35000, 40000, 45000, 48000],
                borderColor: 'var(--gray-400)',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.4,
                fill: false
            }]
        };

        return new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'end'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return Utils.formatCurrency(value);
                            }
                        }
                    }
                }
            }
        });
    },

    createUserChart() {
        const ctx = document.getElementById('userChart');
        if (!ctx) return null;

        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Active', 'Inactive', 'Pending'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: [
                        'var(--success-500)',
                        'var(--danger-500)',
                        'var(--warning-500)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    },

    createActiveUsersChart() {
        const ctx = document.getElementById('activeUsersChart');
        if (!ctx) return null;

        const data = Array.from({ length: 24 }, () => Math.floor(Math.random() * 100) + 50);
        
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
                datasets: [{
                    data: data,
                    borderColor: 'var(--primary-500)',
                    backgroundColor: 'var(--primary-100)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });
    }
};

// Authentication Manager
const Auth = {
    login(email, password, rememberMe = false) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email && password) {
                    const user = {
                        id: 1,
                        name: 'John Doe',
                        email: email,
                        role: 'admin',
                        avatar: '/placeholder.svg?height=40&width=40&text=JD',
                        loginTime: new Date().toISOString()
                    };
                    
                    AppState.currentUser = user;
                    Storage.set('currentUser', user);
                    
                    if (rememberMe) {
                        Storage.set('rememberMe', true);
                    }
                    
                    resolve({ success: true, user });
                } else {
                    resolve({ success: false, error: 'Invalid credentials' });
                }
            }, 1000);
        });
    },

    register(userData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = {
                    id: Date.now(),
                    name: `${userData.firstName} ${userData.lastName}`,
                    email: userData.email,
                    role: 'user',
                    avatar: `/placeholder.svg?height=40&width=40&text=${userData.firstName[0]}${userData.lastName[0]}`,
                    loginTime: new Date().toISOString()
                };
                
                AppState.currentUser = user;
                Storage.set('currentUser', user);
                
                resolve({ success: true, user });
            }, 1000);
        });
    },

    logout() {
        AppState.currentUser = null;
        Storage.remove('currentUser');
        Storage.remove('rememberMe');
        this.showLogin();
    },

    checkAuth() {
        const savedUser = Storage.get('currentUser');
        if (savedUser) {
            AppState.currentUser = savedUser;
            return true;
        }
        return false;
    },

    showLogin() {
        document.getElementById('loginPage').style.display = 'flex';
        document.getElementById('registerPage').style.display = 'none';
        document.getElementById('dashboard').style.display = 'none';
    },

    showRegister() {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('registerPage').style.display = 'flex';
        document.getElementById('dashboard').style.display = 'none';
    },

    showDashboard() {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('registerPage').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        
        // Initialize dashboard
        this.updateUserInfo();
        Navigation.navigateToPage('overview');
        this.initializeCharts();
        this.startRealTimeUpdates();
    },

    updateUserInfo() {
        if (AppState.currentUser) {
            document.getElementById('userName').textContent = AppState.currentUser.name;
            document.getElementById('userRole').textContent = AppState.currentUser.role;
            document.getElementById('userAvatar').src = AppState.currentUser.avatar;
        }
    },

    initializeCharts() {
        // Create sparklines for stats
        AppState.charts.usersSparkline = ChartManager.createSparkline('usersSparkline', [10, 15, 12, 18, 16, 20, 25], 'var(--primary-500)');
        AppState.charts.ordersSparkline = ChartManager.createSparkline('ordersSparkline', [8, 12, 10, 15, 14, 18, 22], 'var(--success-500)');
        AppState.charts.revenueSparkline = ChartManager.createSparkline('revenueSparkline', [20, 18, 22, 19, 17, 21, 16], 'var(--warning-500)');
        AppState.charts.productsSparkline = ChartManager.createSparkline('productsSparkline', [5, 8, 6, 10, 9, 12, 15], 'var(--gray-500)');
        
        // Create main charts
        AppState.charts.salesChart = ChartManager.createSalesChart();
        AppState.charts.userChart = ChartManager.createUserChart();
        AppState.charts.activeUsersChart = ChartManager.createActiveUsersChart();
    },

    startRealTimeUpdates() {
        // Update real-time data every 5 seconds
        AppState.realTimeInterval = setInterval(() => {
            this.updateRealTimeData();
        }, 5000);
    }
};

// Navigation Manager
const Navigation = {
    navigateToPage(page) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Show selected page
        const targetPage = document.getElementById(`${page}Page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update page title and breadcrumb
        const pageTitles = {
            overview: { title: 'Dashboard Overview', breadcrumb: 'Home / Dashboard' },
            analytics: { title: 'Analytics', breadcrumb: 'Home / Analytics' },
            realtime: { title: 'Real-time Dashboard', breadcrumb: 'Home / Real-time' },
            users: { title: 'User Management', breadcrumb: 'Home / Users' },
            products: { title: 'Product Management', breadcrumb: 'Home / Products' },
            orders: { title: 'Order Management', breadcrumb: 'Home / Orders' },
            inventory: { title: 'Inventory', breadcrumb: 'Home / Inventory' },
            customers: { title: 'Customers', breadcrumb: 'Home / Customers' },
            reports: { title: 'Reports', breadcrumb: 'Home / Reports' },
            finance: { title: 'Finance', breadcrumb: 'Home / Finance' },
            marketing: { title: 'Marketing', breadcrumb: 'Home / Marketing' },
            support: { title: 'Support', breadcrumb: 'Home / Support' },
            settings: { title: 'Settings', breadcrumb: 'Home / Settings' },
            profile: { title: 'Profile', breadcrumb: 'Home / Profile' },
            security: { title: 'Security', breadcrumb: 'Home / Security' }
        };

        const pageInfo = pageTitles[page] || { title: 'Dashboard', breadcrumb: 'Home' };
        document.getElementById('pageTitle').textContent = pageInfo.title;
        document.getElementById('breadcrumbPath').textContent = pageInfo.breadcrumb;
        
        AppState.currentPage = page;

        // Load page-specific data
        this.loadPageData(page);
    },

    loadPageData(page) {
        switch(page) {
            case 'overview':
                this.loadOverviewData();
                break;
            case 'users':
                UserManager.loadUsersTable();
                break;
            case 'products':
                ProductManager.loadProductsGrid();
                break;
            case 'orders':
                OrderManager.loadOrdersTable();
                break;
            case 'realtime':
                RealTimeManager.initializeRealTime();
                break;
        }
    },

    loadOverviewData() {
        // Animate counters
        this.animateCounters();
        
        // Load activities
        this.loadActivities();
        
        // Load top products
        this.loadTopProducts();
    },

    animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (counter.textContent.includes('$')) {
                    counter.textContent = Utils.formatCurrency(Math.floor(current));
                } else {
                    counter.textContent = Utils.formatNumber(Math.floor(current));
                }
            }, 16);
        });
    },

    loadActivities() {
        const activitiesList = document.getElementById('activityList');
        if (!activitiesList) return;

        const activities = AppState.activities.slice(0, 5);
        activitiesList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon" style="background: ${activity.color}">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.message}</p>
                    <span class="activity-time">${Utils.formatRelativeTime(activity.time)}</span>
                </div>
            </div>
        `).join('');
    },

    loadTopProducts() {
        const topProductsList = document.getElementById('topProductsList');
        if (!topProductsList) return;

        const topProducts = AppState.products
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5);

        topProductsList.innerHTML = topProducts.map((product, index) => `
            <div class="top-product-item" style="padding: 12px 24px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid var(--border-color);">
                <span style="font-weight: 600; color: var(--text-tertiary); min-width: 20px;">${index + 1}</span>
                <img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover;">
                <div style="flex: 1;">
                    <div style="font-weight: 500; color: var(--text-primary); margin-bottom: 2px;">${product.name}</div>
                    <div style="font-size: 12px; color: var(--text-tertiary);">${product.sales} sales</div>
                </div>
                <div style="font-weight: 600; color: var(--primary-600);">${Utils.formatCurrency(product.price)}</div>
            </div>
        `).join('');
    }
};

// User Management
const UserManager = {
    loadUsersTable() {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;

        const startIndex = (AppState.currentUserPage - 1) * AppState.usersPerPage;
        const endIndex = startIndex + AppState.usersPerPage;
        const paginatedUsers = AppState.users.slice(startIndex, endIndex);

        tbody.innerHTML = paginatedUsers.map(user => `
            <tr>
                <td>
                    <label class="checkbox">
                        <input type="checkbox" value="${user.id}">
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="${user.avatar}" alt="${user.firstName}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
                        <div>
                            <div style="font-weight: 500;">${user.firstName} ${user.lastName}</div>
                            <div style="font-size: 12px; color: var(--text-tertiary);">${user.department}</div>
                        </div>
                    </div>
                </td>
                <td>${user.email}</td>
                <td><span class="status-badge status-${user.role}">${user.role}</span></td>
                <td><span class="status-badge status-${user.status}">${user.status}</span></td>
                <td>${Utils.formatDate(user.lastLogin)}</td>
                <td>${Utils.formatDate(user.created)}</td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-sm btn-secondary" onclick="UserManager.editUser(${user.id})" title="Edit User">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="UserManager.deleteUser(${user.id})" title="Delete User">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        this.updatePagination();
        this.updateTableInfo();
    },

    updatePagination() {
        const totalPages = Math.ceil(AppState.users.length / AppState.usersPerPage);
        const paginationNumbers = document.getElementById('paginationNumbers');
        
        if (paginationNumbers) {
            let pages = [];
            for (let i = 1; i <= Math.min(totalPages, 5); i++) {
                pages.push(`
                    <button class="pagination-number ${i === AppState.currentUserPage ? 'active' : ''}" 
                            onclick="UserManager.goToPage(${i})">${i}</button>
                `);
            }
            paginationNumbers.innerHTML = pages.join('');
        }

        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        
        if (prevBtn) prevBtn.disabled = AppState.currentUserPage === 1;
        if (nextBtn) nextBtn.disabled = AppState.currentUserPage === totalPages;
    },

    updateTableInfo() {
        const startIndex = (AppState.currentUserPage - 1) * AppState.usersPerPage;
        const endIndex = Math.min(startIndex + AppState.usersPerPage, AppState.users.length);
        
        document.getElementById('showingStart').textContent = startIndex + 1;
        document.getElementById('showingEnd').textContent = endIndex;
        document.getElementById('totalUsers').textContent = AppState.users.length;
    },

    goToPage(page) {
        AppState.currentUserPage = page;
        this.loadUsersTable();
    },

    filterUsers() {
        const searchTerm = document.getElementById('userSearch').value.toLowerCase();
        const roleFilter = document.getElementById('userRole').value;
        const statusFilter = document.getElementById('userStatus').value;

        let filteredUsers = DataGenerator.generateUsers(50);

        if (searchTerm) {
            filteredUsers = filteredUsers.filter(user => 
                user.firstName.toLowerCase().includes(searchTerm) ||
                user.lastName.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );
        }

        if (roleFilter) {
            filteredUsers = filteredUsers.filter(user => user.role === roleFilter);
        }

        if (statusFilter) {
            filteredUsers = filteredUsers.filter(user => user.status === statusFilter);
        }

        AppState.users = filteredUsers;
        AppState.currentUserPage = 1;
        this.loadUsersTable();
    },

    editUser(userId) {
        const user = AppState.users.find(u => u.id === userId);
        if (user) {
            // Populate modal with user data
            document.getElementById('userModalTitle').textContent = 'Edit User';
            document.getElementById('userFirstName').value = user.firstName;
            document.getElementById('userLastName').value = user.lastName;
            document.getElementById('userEmail').value = user.email;
            document.getElementById('userRoleSelect').value = user.role;
            document.getElementById('userDepartment').value = user.department;
            document.getElementById('userSubmitText').textContent = 'Update User';
            
            // Store user ID for update
            document.getElementById('userForm').dataset.userId = userId;
            
            this.showUserModal();
        }
    },

    deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            AppState.users = AppState.users.filter(u => u.id !== userId);
            this.loadUsersTable();
            Toast.success('User Deleted', 'User has been successfully deleted.');
        }
    },

    showUserModal() {
        document.getElementById('userModal').classList.add('active');
    },

    hideUserModal() {
        document.getElementById('userModal').classList.remove('active');
        document.getElementById('userForm').reset();
        document.getElementById('userForm').removeAttribute('data-user-id');
        document.getElementById('userModalTitle').textContent = 'Add New User';
        document.getElementById('userSubmitText').textContent = 'Create User';
    },

    handleUserSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            firstName: document.getElementById('userFirstName').value,
            lastName: document.getElementById('userLastName').value,
            email: document.getElementById('userEmail').value,
            role: document.getElementById('userRoleSelect').value,
            department: document.getElementById('userDepartment').value,
            phone: document.getElementById('userPhone').value
        };

        const userId = e.target.dataset.userId;
        
        if (userId) {
            // Update existing user
            const userIndex = AppState.users.findIndex(u => u.id === parseInt(userId));
            if (userIndex !== -1) {
                AppState.users[userIndex] = { ...AppState.users[userIndex], ...userData };
                Toast.success('User Updated', 'User has been successfully updated.');
            }
        } else {
            // Create new user
            const newUser = {
                id: AppState.users.length + 1,
                ...userData,
                status: 'active',
                created: new Date().toISOString().split('T')[0],
                lastLogin: new Date().toISOString().split('T')[0],
                avatar: `/placeholder.svg?height=40&width=40&text=${userData.firstName[0]}${userData.lastName[0]}`
            };
            
            AppState.users.push(newUser);
            Toast.success('User Created', 'New user has been successfully created.');
        }

        this.loadUsersTable();
        this.hideUserModal();
    }
};

// Product Management
const ProductManager = {
    loadProductsGrid() {
        const productsGrid = document.querySelector('.products-grid');
        if (!productsGrid) return;

        productsGrid.innerHTML = AppState.products.map(product => `
            <div class="product-card" data-aos="fade-up">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p class="product-price">${Utils.formatCurrency(product.price)}</p>
                    <p class="product-stock">In Stock: ${product.stock}</p>
                    <div class="product-actions">
                        <button class="btn btn-sm btn-secondary" onclick="ProductManager.editProduct(${product.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="ProductManager.deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    editProduct(productId) {
        Toast.info('Edit Product', `Editing product ${productId}`);
    },

    deleteProduct(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            AppState.products = AppState.products.filter(p => p.id !== productId);
            this.loadProductsGrid();
            Toast.success('Product Deleted', 'Product has been successfully deleted.');
        }
    }
};

// Order Management
const OrderManager = {
    loadOrdersTable() {
        const tbody = document.getElementById('ordersTableBody');
        if (!tbody) return;

        tbody.innerHTML = AppState.orders.slice(0, 20).map(order => `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.customer}</td>
                <td>${Utils.formatDate(order.date)}</td>
                <td>${Utils.formatCurrency(order.total)}</td>
                <td><span class="status-badge status-${order.status}">${order.status}</span></td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-sm btn-secondary" onclick="OrderManager.viewOrder('${order.id}')" title="View Order">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-primary" onclick="OrderManager.updateOrderStatus('${order.id}')" title="Update Status">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    viewOrder(orderId) {
        Toast.info('View Order', `Viewing order ${orderId}`);
    },

    updateOrderStatus(orderId) {
        Toast.info('Update Status', `Updating status for order ${orderId}`);
    }
};

// Real-time Manager
const RealTimeManager = {
    initializeRealTime() {
        this.updateActiveUsers();
        this.updateLiveOrders();
        this.updateServerMetrics();
        
        // Start real-time updates
        setInterval(() => {
            this.updateActiveUsers();
            this.updateLiveOrders();
            this.updateServerMetrics();
        }, 3000);
    },

    updateActiveUsers() {
        const activeUsersElement = document.getElementById('activeUsers');
        if (activeUsersElement) {
            const currentUsers = parseInt(activeUsersElement.textContent.replace(',', ''));
            const change = Math.floor(Math.random() * 20) - 10;
            const newUsers = Math.max(1000, currentUsers + change);
            activeUsersElement.textContent = Utils.formatNumber(newUsers);
        }
    },

    updateLiveOrders() {
        const liveOrdersElement = document.getElementById('liveOrders');
        const orderFeed = document.getElementById('orderFeed');
        
        if (liveOrdersElement) {
            const newOrderCount = Math.floor(Math.random() * 50) + 10;
            liveOrdersElement.textContent = newOrderCount;
        }

        if (orderFeed) {
            const orders = Array.from({ length: 5 }, (_, i) => ({
                id: `ORD-${Math.floor(Math.random() * 9999)}`,
                customer: ['John Doe', 'Jane Smith', 'Mike Johnson'][Math.floor(Math.random() * 3)],
                amount: Math.floor(Math.random() * 500) + 50,
                time: new Date()
            }));

            orderFeed.innerHTML = orders.map(order => `
                <div style="padding: 8px 0; border-bottom: 1px solid var(--border-color); font-size: 12px;">
                    <div style="display: flex; justify-content: space-between;">
                        <span>${order.id}</span>
                        <span>${Utils.formatCurrency(order.amount)}</span>
                    </div>
                    <div style="color: var(--text-tertiary);">${order.customer}</div>
                </div>
            `).join('');
        }
    },

    updateServerMetrics() {
        const metrics = ['cpu', 'memory', 'disk'];
        metrics.forEach(metric => {
            const fill = document.querySelector(`.metric-item:nth-child(${metrics.indexOf(metric) + 1}) .metric-fill`);
            const text = document.querySelector(`.metric-item:nth-child(${metrics.indexOf(metric) + 1}) span:last-child`);
            
            if (fill && text) {
                const currentValue = parseInt(text.textContent);
                const change = Math.floor(Math.random() * 10) - 5;
                const newValue = Math.max(0, Math.min(100, currentValue + change));
                
                fill.style.width = `${newValue}%`;
                text.textContent = `${newValue}%`;
            }
        });
    }
};

// Search Manager
const SearchManager = {
    init() {
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce(this.handleSearch.bind(this), 300));
            searchInput.addEventListener('focus', this.showSearchResults.bind(this));
            document.addEventListener('click', this.hideSearchResults.bind(this));
        }
    },

    handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            this.hideSearchResults();
            return;
        }

        // Search through users, products, orders
        const results = [];
        
        // Search users
        AppState.users.forEach(user => {
            if (user.firstName.toLowerCase().includes(query) || 
                user.lastName.toLowerCase().includes(query) || 
                user.email.toLowerCase().includes(query)) {
                results.push({
                    type: 'user',
                    title: `${user.firstName} ${user.lastName}`,
                    subtitle: user.email,
                    action: () => Navigation.navigateToPage('users')
                });
            }
        });

        // Search products
        AppState.products.forEach(product => {
            if (product.name.toLowerCase().includes(query)) {
                results.push({
                    type: 'product',
                    title: product.name,
                    subtitle: Utils.formatCurrency(product.price),
                    action: () => Navigation.navigateToPage('products')
                });
            }
        });

        this.displaySearchResults(results.slice(0, 8));
    },

    displaySearchResults(results) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<div style="padding: 16px; text-align: center; color: var(--text-tertiary);">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(result => `
                <div class="search-result-item" style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid var(--border-color); transition: background var(--transition-fast);" 
                     onclick="SearchManager.selectResult('${result.type}', '${result.title}')">
                    <div style="font-weight: 500; color: var(--text-primary);">${result.title}</div>
                    <div style="font-size: 12px; color: var(--text-tertiary);">${result.subtitle}</div>
                </div>
            `).join('');
        }

        this.showSearchResults();
    },

    showSearchResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.style.display = 'block';
        }
    },

    hideSearchResults(e) {
        const searchBox = document.querySelector('.search-box');
        const searchResults = document.getElementById('searchResults');
        
        if (searchResults && (!e || !searchBox.contains(e.target))) {
            searchResults.style.display = 'none';
        }
    },

    selectResult(type, title) {
        Toast.info('Search Result', `Selected ${type}: ${title}`);
        this.hideSearchResults();
    }
};

// Notification Manager
const NotificationManager = {
    init() {
        this.loadNotifications();
        this.setupEventListeners();
    },

    setupEventListeners() {
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationPanel = document.getElementById('notificationPanel');
        
        if (notificationBtn) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleNotificationPanel();
            });
        }

        document.addEventListener('click', (e) => {
            if (notificationPanel && !notificationPanel.contains(e.target)) {
                notificationPanel.style.display = 'none';
            }
        });

        const markAllRead = document.querySelector('.mark-all-read');
        if (markAllRead) {
            markAllRead.addEventListener('click', this.markAllAsRead.bind(this));
        }
    },

    loadNotifications() {
        AppState.notifications = DataGenerator.generateNotifications(10);
        this.updateNotificationBadge();
        this.renderNotifications();
    },

    updateNotificationBadge() {
        const unreadCount = AppState.notifications.filter(n => !n.read).length;
        const badge = document.getElementById('notificationCount');
        
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    },

    renderNotifications() {
        const notificationList = document.getElementById('notificationList');
        if (!notificationList) return;

        notificationList.innerHTML = AppState.notifications.map(notification => `
            <div class="notification-item ${!notification.read ? 'unread' : ''}" 
                 onclick="NotificationManager.markAsRead(${notification.id})">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <div style="color: var(--${notification.type === 'error' ? 'danger' : notification.type === 'warning' ? 'warning' : notification.type === 'success' ? 'success' : 'primary'}-500); font-size: 16px; margin-top: 2px;">
                        <i class="${notification.icon}"></i>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 500; margin-bottom: 4px;">${notification.title}</div>
                        <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 4px;">${notification.message}</div>
                        <div style="font-size: 11px; color: var(--text-tertiary);">${Utils.formatRelativeTime(notification.time)}</div>
                    </div>
                    ${!notification.read ? '<div style="width: 8px; height: 8px; background: var(--primary-500); border-radius: 50%; margin-top: 6px;"></div>' : ''}
                </div>
            </div>
        `).join('');
    },

    toggleNotificationPanel() {
        const panel = document.getElementById('notificationPanel');
        if (panel) {
            panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
        }
    },

    markAsRead(notificationId) {
        const notification = AppState.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.updateNotificationBadge();
            this.renderNotifications();
        }
    },

    markAllAsRead() {
        AppState.notifications.forEach(n => n.read = true);
        this.updateNotificationBadge();
        this.renderNotifications();
    }
};

// Theme Manager
const ThemeManager = {
    init() {
        const savedTheme = Storage.get('theme', 'light');
        this.setTheme(savedTheme);
    },

    setTheme(theme) {
        AppState.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        Storage.set('theme', theme);
        
        // Update theme toggle button text
        const themeToggle = document.querySelector('[onclick="toggleTheme()"]');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            const text = themeToggle.querySelector('span') || themeToggle.childNodes[1];
            
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
                if (text) text.textContent = ' Light Mode';
            } else {
                icon.className = 'fas fa-moon';
                if (text) text.textContent = ' Dark Mode';
            }
        }
    },

    toggle() {
        const newTheme = AppState.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        Toast.info('Theme Changed', `Switched to ${newTheme} mode`);
    }
};

// Event Handlers
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function showForgotPassword() {
    document.getElementById('forgotPasswordModal').classList.add('active');
}

function hideForgotPassword() {
    document.getElementById('forgotPasswordModal').classList.remove('active');
}

function toggleTheme() {
    ThemeManager.toggle();
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.getElementById('fullscreenBtn').innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        document.exitFullscreen();
        document.getElementById('fullscreenBtn').innerHTML = '<i class="fas fa-expand"></i>';
    }
}

function showHelp() {
    Toast.info('Help Center', 'Opening help documentation...');
}

function showKeyboardShortcuts() {
    document.getElementById('shortcutsModal').classList.add('active');
}

function hideKeyboardShortcuts() {
    document.getElementById('shortcutsModal').classList.remove('active');
}

function showAddUserModal() {
    UserManager.showUserModal();
}

function showAddProductModal() {
    Toast.info('Add Product', 'Opening product creation form...');
}

function exportData() {
    Toast.success('Export Started', 'Data export has been initiated...');
}

function generateReport() {
    Toast.info('Report Generation', 'Generating comprehensive report...');
}

function exportUsers() {
    Toast.success('Export Users', 'User data exported successfully!');
}

function bulkAction(action) {
    const selectedUsers = document.querySelectorAll('#usersTable input[type="checkbox"]:checked');
    if (selectedUsers.length === 0) {
        Toast.warning('No Selection', 'Please select users to perform bulk action.');
        return;
    }
    
    Toast.success('Bulk Action', `${action} applied to ${selectedUsers.length} users.`);
}

function refreshChart(chartId) {
    Toast.info('Chart Refresh', `Refreshing ${chartId} data...`);
}

function exportChart(chartId) {
    Toast.success('Chart Export', `${chartId} exported successfully!`);
}

function refreshActivity() {
    Navigation.loadActivities();
    Toast.success('Activity Refreshed', 'Activity feed has been updated.');
}

// Password strength checker
function checkPasswordStrength(password) {
    const strength = Utils.checkPasswordStrength(password);
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (strengthBar && strengthText) {
        strengthBar.className = `strength-fill ${strength.level}`;
        strengthBar.style.width = `${(strength.score / 5) * 100}%`;
        strengthText.textContent = `Password strength: ${strength.level}`;
    }
}

// Form tab switching
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');
}