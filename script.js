// Application State
const AppState = {
    currentUser: null,
    currentPage: 'overview',
    currentUserPage: 1,
    usersPerPage: 10,
    users: [],
    filteredUsers: [],
    selectedUsers: [],
    theme: 'light',
    sidebarCollapsed: false,
    notifications: [],
    charts: {},
    isAuthenticated: false
};

// Sample Data
const sampleUsers = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', role: 'admin', status: 'active', lastLogin: '2024-01-15', created: '2023-06-15', avatar: 'JD' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', role: 'user', status: 'active', lastLogin: '2024-01-14', created: '2023-07-20', avatar: 'JS' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@example.com', role: 'moderator', status: 'inactive', lastLogin: '2024-01-10', created: '2023-08-05', avatar: 'MJ' },
    { id: 4, firstName: 'Sarah', lastName: 'Wilson', email: 'sarah.wilson@example.com', role: 'user', status: 'pending', lastLogin: 'Never', created: '2024-01-12', avatar: 'SW' },
    { id: 5, firstName: 'David', lastName: 'Brown', email: 'david.brown@example.com', role: 'viewer', status: 'active', lastLogin: '2024-01-13', created: '2023-09-10', avatar: 'DB' },
    { id: 6, firstName: 'Emily', lastName: 'Davis', email: 'emily.davis@example.com', role: 'user', status: 'active', lastLogin: '2024-01-16', created: '2023-11-22', avatar: 'ED' },
    { id: 7, firstName: 'Robert', lastName: 'Miller', email: 'robert.miller@example.com', role: 'moderator', status: 'active', lastLogin: '2024-01-15', created: '2023-08-30', avatar: 'RM' },
    { id: 8, firstName: 'Lisa', lastName: 'Anderson', email: 'lisa.anderson@example.com', role: 'user', status: 'inactive', lastLogin: '2024-01-05', created: '2023-12-01', avatar: 'LA' }
];

const sampleProducts = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, stock: 150, image: '/placeholder.svg?height=200&width=280', category: 'Electronics' },
    { id: 2, name: 'Smart Watch', price: 299.99, stock: 75, image: '/placeholder.svg?height=200&width=280', category: 'Electronics' },
    { id: 3, name: 'Laptop Stand', price: 49.99, stock: 200, image: '/placeholder.svg?height=200&width=280', category: 'Accessories' },
    { id: 4, name: 'USB-C Cable', price: 19.99, stock: 500, image: '/placeholder.svg?height=200&width=280', category: 'Accessories' },
    { id: 5, name: 'Bluetooth Speaker', price: 79.99, stock: 120, image: '/placeholder.svg?height=200&width=280', category: 'Electronics' },
    { id: 6, name: 'Wireless Mouse', price: 39.99, stock: 300, image: '/placeholder.svg?height=200&width=280', category: 'Accessories' }
];

const sampleOrders = [
    { id: 'ORD-001', customer: 'John Doe', date: '2024-01-15', total: 299.99, status: 'delivered' },
    { id: 'ORD-002', customer: 'Jane Smith', date: '2024-01-14', total: 149.98, status: 'shipped' },
    { id: 'ORD-003', customer: 'Mike Johnson', date: '2024-01-13', total: 99.99, status: 'processing' },
    { id: 'ORD-004', customer: 'Sarah Wilson', date: '2024-01-12', total: 199.99, status: 'cancelled' },
    { id: 'ORD-005', customer: 'David Brown', date: '2024-01-11', total: 79.99, status: 'delivered' },
    { id: 'ORD-006', customer: 'Emily Davis', date: '2024-01-10', total: 259.97, status: 'shipped' }
];

const sampleNotifications = [
    { id: 1, title: 'New User Registration', message: 'John Doe has registered', time: '5 minutes ago', type: 'info', unread: true },
    { id: 2, title: 'Order Completed', message: 'Order #ORD-001 has been delivered', time: '1 hour ago', type: 'success', unread: true },
    { id: 3, title: 'Low Stock Alert', message: 'Smart Watch stock is running low', time: '2 hours ago', type: 'warning', unread: false },
    { id: 4, title: 'System Update', message: 'System maintenance scheduled for tonight', time: '1 day ago', type: 'info', unread: false },
    { id: 5, title: 'Payment Failed', message: 'Payment for order #ORD-003 failed', time: '2 days ago', type: 'error', unread: false }
];

const sampleTickets = [
    { id: 'TKT-001', subject: 'Login Issues', customer: 'John Doe', priority: 'high', status: 'open', created: '2024-01-15' },
    { id: 'TKT-002', subject: 'Payment Problem', customer: 'Jane Smith', priority: 'medium', status: 'in-progress', created: '2024-01-14' },
    { id: 'TKT-003', subject: 'Feature Request', customer: 'Mike Johnson', priority: 'low', status: 'resolved', created: '2024-01-13' },
    { id: 'TKT-004', subject: 'Bug Report', customer: 'Sarah Wilson', priority: 'high', status: 'open', created: '2024-01-12' }
];

const sampleActivities = [
    { id: 1, type: 'user', icon: 'fas fa-user-plus', iconColor: '#10b981', message: 'New user John Doe registered', time: '5 minutes ago' },
    { id: 2, type: 'order', icon: 'fas fa-shopping-cart', iconColor: '#3b82f6', message: 'Order #ORD-001 was completed', time: '1 hour ago' },
    { id: 3, type: 'product', icon: 'fas fa-box', iconColor: '#f59e0b', message: 'Product "Smart Watch" stock updated', time: '2 hours ago' },
    { id: 4, type: 'system', icon: 'fas fa-cog', iconColor: '#6b7280', message: 'System backup completed', time: '3 hours ago' },
    { id: 5, type: 'security', icon: 'fas fa-shield-alt', iconColor: '#ef4444', message: 'Security scan completed', time: '4 hours ago' }
];

const sampleTopProducts = [
    { name: 'Wireless Headphones', sales: 245, revenue: 24499, trend: 'up' },
    { name: 'Smart Watch', sales: 189, revenue: 56699, trend: 'up' },
    { name: 'Laptop Stand', sales: 156, revenue: 7799, trend: 'down' },
    { name: 'USB-C Cable', sales: 134, revenue: 2679, trend: 'up' },
    { name: 'Bluetooth Speaker', sales: 98, revenue: 7839, trend: 'down' }
];

const sampleTopPages = [
    { page: '/dashboard', views: 12456, bounce: '32%' },
    { page: '/products', views: 8934, bounce: '28%' },
    { page: '/users', views: 6789, bounce: '35%' },
    { page: '/orders', views: 5432, bounce: '25%' },
    { page: '/analytics', views: 4321, bounce: '40%' }
];

// Utility Functions
const Utils = {
    formatDate: (dateString) => {
        if (dateString === 'Never') return dateString;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    },

    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    generateAvatar: (firstName, lastName) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    },

    debounce: (func, wait) => {
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

    animateNumber: (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.dataset.count && element.dataset.count.includes('.')) {
                element.textContent = current.toFixed(1) + (element.dataset.count.includes('%') ? '%' : '');
            } else if (element.dataset.count && element.dataset.count.includes('$')) {
                element.textContent = Utils.formatCurrency(current);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    },

    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    validatePassword: (password) => {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
    },

    getPasswordStrength: (password) => {
        const validation = Utils.validatePassword(password);
        const score = Object.values(validation).filter(Boolean).length;
        
        if (score < 3) return { strength: 'weak', width: 25 };
        if (score < 5) return { strength: 'medium', width: 60 };
        return { strength: 'strong', width: 100 };
    }
};

// Theme Manager
const ThemeManager = {
    init: () => {
        const savedTheme = localStorage.getItem('adminpro-theme') || 'light';
        ThemeManager.setTheme(savedTheme);
    },

    setTheme: (theme) => {
        AppState.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('adminpro-theme', theme);
        
        const themeText = document.getElementById('themeText');
        if (themeText) {
            themeText.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
        }
    },

    toggle: () => {
        const newTheme = AppState.theme === 'light' ? 'dark' : 'light';
        ThemeManager.setTheme(newTheme);
    }
};

// Authentication Manager
const AuthManager = {
    login: (email, password) => {
        // Simulate authentication
        if (email === 'admin@example.com' && password === 'password123') {
            AppState.currentUser = {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: email,
                role: 'Administrator',
                avatar: 'JD'
            };
            AppState.isAuthenticated = true;
            localStorage.setItem('adminpro-user', JSON.stringify(AppState.currentUser));
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    },

    register: (userData) => {
        // Simulate registration
        const newUser = {
            id: Utils.generateId(),
            ...userData,
            role: 'User',
            avatar: Utils.generateAvatar(userData.firstName, userData.lastName)
        };
        
        AppState.currentUser = newUser;
        AppState.isAuthenticated = true;
        localStorage.setItem('adminpro-user', JSON.stringify(newUser));
        return { success: true };
    },

    logout: () => {
        AppState.currentUser = null;
        AppState.isAuthenticated = false;
        localStorage.removeItem('adminpro-user');
        showLoginPage();
    },

    checkAuth: () => {
        const savedUser = localStorage.getItem('adminpro-user');
        if (savedUser) {
            AppState.currentUser = JSON.parse(savedUser);
            AppState.isAuthenticated = true;
            return true;
        }
        return false;
    }
};

// Navigation Manager
const NavigationManager = {
    init: () => {
        // Add click listeners to navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                if (page) {
                    NavigationManager.navigateTo(page);
                }
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('sidebar');
        
        if (mobileMenuBtn && sidebar) {
            mobileMenuBtn.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
                // Add sidebar collapse logic here
            });
        }

        // User dropdown
        const userMenuToggle = document.getElementById('userMenuToggle');
        const userDropdown = document.getElementById('userDropdown');
        
        if (userMenuToggle && userDropdown) {
            userMenuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
            });

            document.addEventListener('click', () => {
                userDropdown.style.display = 'none';
            });
        }

        // Notification dropdown
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationPanel = document.getElementById('notificationPanel');
        
        if (notificationBtn && notificationPanel) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationPanel.style.display = notificationPanel.style.display === 'block' ? 'none' : 'block';
            });

            document.addEventListener('click', () => {
                notificationPanel.style.display = 'none';
            });
        }
    },

    navigateTo: (page) => {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(`${page}Page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update navigation state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Update page title and breadcrumb
        NavigationManager.updatePageInfo(page);
        AppState.currentPage = page;

        // Initialize page-specific functionality
        NavigationManager.initializePage(page);
    },

    updatePageInfo: (page) => {
        const pageTitle = document.getElementById('pageTitle');
        const breadcrumbPath = document.getElementById('breadcrumbPath');
        
        const pageInfo = {
            overview: { title: 'Dashboard Overview', breadcrumb: 'Home / Dashboard' },
            analytics: { title: 'Analytics', breadcrumb: 'Home / Analytics' },
            realtime: { title: 'Real-time Dashboard', breadcrumb: 'Home / Real-time' },
            users: { title: 'User Management', breadcrumb: 'Home / Users' },
            products: { title: 'Product Management', breadcrumb: 'Home / Products' },
            orders: { title: 'Order Management', breadcrumb: 'Home / Orders' },
            inventory: { title: 'Inventory Management', breadcrumb: 'Home / Inventory' },
            customers: { title: 'Customer Management', breadcrumb: 'Home / Customers' },
            reports: { title: 'Reports', breadcrumb: 'Home / Reports' },
            finance: { title: 'Finance', breadcrumb: 'Home / Finance' },
            marketing: { title: 'Marketing', breadcrumb: 'Home / Marketing' },
            support: { title: 'Support Center', breadcrumb: 'Home / Support' },
            settings: { title: 'Settings', breadcrumb: 'Home / Settings' },
            profile: { title: 'Profile', breadcrumb: 'Home / Profile' },
            security: { title: 'Security', breadcrumb: 'Home / Security' }
        };

        const info = pageInfo[page] || { title: 'Dashboard', breadcrumb: 'Home' };
        
        if (pageTitle) pageTitle.textContent = info.title;
        if (breadcrumbPath) breadcrumbPath.textContent = info.breadcrumb;
    },

    initializePage: (page) => {
        switch (page) {
            case 'overview':
                DashboardManager.init();
                break;
            case 'users':
                UserManager.init();
                break;
            case 'products':
                ProductManager.init();
                break;
            case 'orders':
                OrderManager.init();
                break;
            case 'realtime':
                RealtimeManager.init();
                break;
            case 'analytics':
                AnalyticsManager.init();
                break;
            case 'support':
                SupportManager.init();
                break;
        }
    }
};

// User Manager
const UserManager = {
    init: () => {
        AppState.users = [...sampleUsers];
        AppState.filteredUsers = [...sampleUsers];
        UserManager.renderUsers();
        UserManager.updateStats();
        UserManager.updatePagination();
    },

    renderUsers: () => {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;

        const startIndex = (AppState.currentUserPage - 1) * AppState.usersPerPage;
        const endIndex = startIndex + AppState.usersPerPage;
        const usersToShow = AppState.filteredUsers.slice(startIndex, endIndex);

        tbody.innerHTML = usersToShow.map(user => `
            <tr>
                <td>
                    <label class="checkbox">
                        <input type="checkbox" value="${user.id}" onchange="UserManager.toggleUserSelection(${user.id})">
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary-100); color: var(--primary-600); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;">
                            ${user.avatar}
                        </div>
                        <div>
                            <div style="font-weight: 500; color: var(--text-primary);">${user.firstName} ${user.lastName}</div>
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
                        <button class="btn btn-sm btn-secondary" onclick="UserManager.editUser(${user.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="UserManager.deleteUser(${user.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Update table info
        const showingStart = document.getElementById('showingStart');
        const showingEnd = document.getElementById('showingEnd');
        const totalUsers = document.getElementById('totalUsers');

        if (showingStart) showingStart.textContent = startIndex + 1;
        if (showingEnd) showingEnd.textContent = Math.min(endIndex, AppState.filteredUsers.length);
        if (totalUsers) totalUsers.textContent = AppState.filteredUsers.length;
    },

    updateStats: () => {
        const totalCount = document.getElementById('totalUsersCount');
        const activeCount = document.getElementById('activeUsersCount');
        const newCount = document.getElementById('newUsersCount');
        const adminCount = document.getElementById('adminUsersCount');

        if (totalCount) totalCount.textContent = AppState.users.length.toLocaleString();
        if (activeCount) activeCount.textContent = AppState.users.filter(u => u.status === 'active').length.toLocaleString();
        if (newCount) newCount.textContent = AppState.users.filter(u => new Date(u.created) > new Date('2024-01-01')).length.toLocaleString();
        if (adminCount) adminCount.textContent = AppState.users.filter(u => u.role === 'admin').length.toLocaleString();
    },

    updatePagination: () => {
        const totalPages = Math.ceil(AppState.filteredUsers.length / AppState.usersPerPage);
        const paginationNumbers = document.getElementById('paginationNumbers');
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');

        if (prevBtn) prevBtn.disabled = AppState.currentUserPage === 1;
        if (nextBtn) nextBtn.disabled = AppState.currentUserPage === totalPages;

        if (paginationNumbers) {
            let numbersHtml = '';
            for (let i = 1; i <= totalPages; i++) {
                if (i === AppState.currentUserPage) {
                    numbersHtml += `<button class="pagination-number active">${i}</button>`;
                } else {
                    numbersHtml += `<button class="pagination-number" onclick="UserManager.goToPage(${i})">${i}</button>`;
                }
            }
            paginationNumbers.innerHTML = numbersHtml;
        }
    },

    goToPage: (page) => {
        const totalPages = Math.ceil(AppState.filteredUsers.length / AppState.usersPerPage);
        if (page >= 1 && page <= totalPages) {
            AppState.currentUserPage = page;
            UserManager.renderUsers();
            UserManager.updatePagination();
        }
    },

    filterUsers: () => {
        const searchTerm = document.getElementById('userSearch')?.value.toLowerCase() || '';
        const roleFilter = document.getElementById('userRole')?.value || '';
        const statusFilter = document.getElementById('userStatus')?.value || '';

        AppState.filteredUsers = AppState.users.filter(user => {
            const matchesSearch = !searchTerm || 
                user.firstName.toLowerCase().includes(searchTerm) ||
                user.lastName.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm);
            
            const matchesRole = !roleFilter || user.role === roleFilter;
            const matchesStatus = !statusFilter || user.status === statusFilter;

            return matchesSearch && matchesRole && matchesStatus;
        });

        AppState.currentUserPage = 1;
        UserManager.renderUsers();
        UserManager.updatePagination();
    },

    toggleUserSelection: (userId) => {
        const index = AppState.selectedUsers.indexOf(userId);
        if (index > -1) {
            AppState.selectedUsers.splice(index, 1);
        } else {
            AppState.selectedUsers.push(userId);
        }
    },

    toggleSelectAll: () => {
        const selectAllCheckbox = document.getElementById('selectAll');
        const userCheckboxes = document.querySelectorAll('#usersTableBody input[type="checkbox"]');
        
        if (selectAllCheckbox.checked) {
            userCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
                const userId = parseInt(checkbox.value);
                if (!AppState.selectedUsers.includes(userId)) {
                    AppState.selectedUsers.push(userId);
                }
            });
        } else {
            userCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
                const userId = parseInt(checkbox.value);
                const index = AppState.selectedUsers.indexOf(userId);
                if (index > -1) {
                    AppState.selectedUsers.splice(index, 1);
                }
            });
        }
    },

    addUser: (userData) => {
        const newUser = {
            id: Math.max(...AppState.users.map(u => u.id)) + 1,
            ...userData,
            avatar: Utils.generateAvatar(userData.firstName, userData.lastName),
            created: new Date().toISOString().split('T')[0],
            lastLogin: 'Never'
        };

        AppState.users.push(newUser);
        UserManager.filterUsers();
        UserManager.updateStats();
        ToastManager.show('User added successfully', 'success');
    },

    editUser: (userId) => {
        const user = AppState.users.find(u => u.id === userId);
        if (user) {
            showEditUserModal(user);
        }
    },

    updateUser: (userId, userData) => {
        const userIndex = AppState.users.findIndex(u => u.id === userId);
        if (userIndex > -1) {
            AppState.users[userIndex] = { ...AppState.users[userIndex], ...userData };
            UserManager.filterUsers();
            ToastManager.show('User updated successfully', 'success');
        }
    },

    deleteUser: (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            AppState.users = AppState.users.filter(u => u.id !== userId);
            UserManager.filterUsers();
            UserManager.updateStats();
            ToastManager.show('User deleted successfully', 'success');
        }
    }
};

// Product Manager
const ProductManager = {
    init: () => {
        ProductManager.renderProducts();
    },

    renderProducts: () => {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        grid.innerHTML = sampleProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <div class="product-price">${Utils.formatCurrency(product.price)}</div>
                    <div class="product-stock">Stock: ${product.stock} units</div>
                    <div class="product-actions">
                        <button class="btn btn-sm btn-secondary" onclick="ProductManager.editProduct(${product.id})">
                            <i class="fas fa-edit"></i>
                            Edit
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="ProductManager.deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    editProduct: (productId) => {
        const product = sampleProducts.find(p => p.id === productId);
        if (product) {
            ToastManager.show(`Editing ${product.name}`, 'info');
        }
    },

    deleteProduct: (productId) => {
        if (confirm('Are you sure you want to delete this product?')) {
            ToastManager.show('Product deleted successfully', 'success');
        }
    }
};

// Order Manager
const OrderManager = {
    init: () => {
        OrderManager.renderOrders();
    },

    renderOrders: () => {
        const tbody = document.getElementById('ordersTableBody');
        if (!tbody) return;

        tbody.innerHTML = sampleOrders.map(order => `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.customer}</td>
                <td>${Utils.formatDate(order.date)}</td>
                <td>${Utils.formatCurrency(order.total)}</td>
                <td><span class="status-badge status-${order.status}">${order.status}</span></td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-sm btn-secondary" onclick="OrderManager.viewOrder('${order.id}')" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-primary" onclick="OrderManager.updateStatus('${order.id}')" title="Update Status">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    viewOrder: (orderId) => {
        ToastManager.show(`Viewing order ${orderId}`, 'info');
    },

    updateStatus: (orderId) => {
        ToastManager.show(`Updating status for order ${orderId}`, 'info');
    }
};

// Support Manager
const SupportManager = {
    init: () => {
        SupportManager.renderTickets();
    },

    renderTickets: () => {
        const tbody = document.getElementById('ticketsTableBody');
        if (!tbody) return;

        tbody.innerHTML = sampleTickets.map(ticket => `
            <tr>
                <td><strong>${ticket.id}</strong></td>
                <td>${ticket.subject}</td>
                <td>${ticket.customer}</td>
                <td><span class="status-badge status-${ticket.priority}">${ticket.priority}</span></td>
                <td><span class="status-badge status-${ticket.status}">${ticket.status}</span></td>
                <td>${Utils.formatDate(ticket.created)}</td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-sm btn-secondary" onclick="SupportManager.viewTicket('${ticket.id}')" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-primary" onclick="SupportManager.updateTicket('${ticket.id}')" title="Update">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    viewTicket: (ticketId) => {
        ToastManager.show(`Viewing ticket ${ticketId}`, 'info');
    },

    updateTicket: (ticketId) => {
        ToastManager.show(`Updating ticket ${ticketId}`, 'info');
    }
};

// Dashboard Manager
const DashboardManager = {
    init: () => {
        DashboardManager.animateStats();
        DashboardManager.renderActivity();
        DashboardManager.renderTopProducts();
        DashboardManager.initCharts();
    },

    animateStats: () => {
        document.querySelectorAll('.stat-number').forEach(element => {
            const count = element.dataset.count;
            if (count) {
                const target = parseFloat(count.replace(/[^0-9.]/g, ''));
                Utils.animateNumber(element, target);
            }
        });
    },

    renderActivity: () => {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;

        activityList.innerHTML = sampleActivities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon" style="background: ${activity.iconColor};">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.message}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    },

    renderTopProducts: () => {
        const topProductsList = document.getElementById('topProductsList');
        if (!topProductsList) return;

        topProductsList.innerHTML = sampleTopProducts.map((product, index) => `
            <div class="activity-item">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary-100); color: var(--primary-600); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600;">
                    ${index + 1}
                </div>
                <div class="activity-content">
                    <p style="font-weight: 500;">${product.name}</p>
                    <span class="activity-time">${product.sales} sales • ${Utils.formatCurrency(product.revenue)}</span>
                </div>
                <div style="color: ${product.trend === 'up' ? 'var(--success-600)' : 'var(--danger-600)'};">
                    <i class="fas fa-arrow-${product.trend}"></i>
                </div>
            </div>
        `).join('');
    },

    initCharts: () => {
        // Sales Chart
        const salesCtx = document.getElementById('salesChart');
        if (salesCtx) {
            AppState.charts.sales = new Chart(salesCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Sales',
                        data: [12000, 19000, 15000, 25000, 22000, 30000],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // User Growth Chart
        const userCtx = document.getElementById('userChart');
        if (userCtx) {
            AppState.charts.users = new Chart(userCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Active', 'Inactive', 'Pending'],
                    datasets: [{
                        data: [65, 25, 10],
                        backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
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
        }

        // Sparkline charts
        DashboardManager.initSparklines();
    },

    initSparklines: () => {
        const sparklineData = [12, 19, 15, 25, 22, 30, 28];
        
        ['usersSparkline', 'ordersSparkline', 'revenueSparkline', 'productsSparkline'].forEach(id => {
            const ctx = document.getElementById(id);
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['', '', '', '', '', '', ''],
                        datasets: [{
                            data: sparklineData,
                            borderColor: '#3b82f6',
                            borderWidth: 2,
                            pointRadius: 0,
                            tension: 0.4
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
            }
        });
    }
};

// Realtime Manager
const RealtimeManager = {
    init: () => {
        RealtimeManager.startRealTimeUpdates();
        RealtimeManager.initRealtimeCharts();
    },

    startRealTimeUpdates: () => {
        // Simulate real-time updates
        setInterval(() => {
            const activeUsers = document.getElementById('activeUsers');
            const liveOrders = document.getElementById('liveOrders');
            
            if (activeUsers) {
                const current = parseInt(activeUsers.textContent.replace(/,/g, ''));
                const change = Math.floor(Math.random() * 20) - 10;
                activeUsers.textContent = (current + change).toLocaleString();
            }
            
            if (liveOrders) {
                const current = parseInt(liveOrders.textContent);
                const change = Math.floor(Math.random() * 6) - 3;
                liveOrders.textContent = Math.max(0, current + change);
            }
        }, 5000);
    },

    initRealtimeCharts: () => {
        const activeUsersCtx = document.getElementById('activeUsersChart');
        if (activeUsersCtx) {
            const data = Array.from({length: 20}, () => Math.floor(Math.random() * 100) + 1000);
            
            new Chart(activeUsersCtx, {
                type: 'line',
                data: {
                    labels: Array.from({length: 20}, (_, i) => ''),
                    datasets: [{
                        data: data,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                }
            });
        }
    }
};

// Analytics Manager
const AnalyticsManager = {
    init: () => {
        AnalyticsManager.animateStats();
        AnalyticsManager.renderTopPages();
        AnalyticsManager.initAnalyticsCharts();
    },

    animateStats: () => {
        document.querySelectorAll('#analyticsPage .stat-number').forEach(element => {
            const count = element.dataset.count;
            if (count) {
                const target = parseFloat(count.replace(/[^0-9.]/g, ''));
                Utils.animateNumber(element, target);
            }
        });
    },

    renderTopPages: () => {
        const topPagesList = document.getElementById('topPagesList');
        if (!topPagesList) return;

        topPagesList.innerHTML = sampleTopPages.map((page, index) => `
            <div class="activity-item">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary-100); color: var(--primary-600); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600;">
                    ${index + 1}
                </div>
                <div class="activity-content">
                    <p style="font-weight: 500;">${page.page}</p>
                    <span class="activity-time">${page.views.toLocaleString()} views • ${page.bounce} bounce rate</span>
                </div>
            </div>
        `).join('');
    },

    initAnalyticsCharts: () => {
        // Traffic Chart
        const trafficCtx = document.getElementById('trafficChart');
        if (trafficCtx) {
            new Chart(trafficCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Page Views',
                        data: [45000, 52000, 48000, 61000],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Unique Visitors',
                        data: [32000, 38000, 35000, 42000],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Sources Chart
        const sourcesCtx = document.getElementById('sourcesChart');
        if (sourcesCtx) {
            new Chart(sourcesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Direct', 'Search', 'Social', 'Referral'],
                    datasets: [{
                        data: [40, 30, 20, 10],
                        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
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
        }
    }
};

// Notification Manager
const NotificationManager = {
    init: () => {
        AppState.notifications = [...sampleNotifications];
        NotificationManager.renderNotifications();
        NotificationManager.updateBadge();
    },

    renderNotifications: () => {
        const notificationList = document.getElementById('notificationList');
        if (!notificationList) return;

        notificationList.innerHTML = AppState.notifications.map(notification => `
            <div class="notification-item ${notification.unread ? 'unread' : ''}" onclick="NotificationManager.markAsRead(${notification.id})">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: ${notification.unread ? 'var(--primary-500)' : 'transparent'}; margin-top: 8px;"></div>
                    <div style="flex: 1;">
                        <div style="font-weight: 500; color: var(--text-primary); margin-bottom: 4px;">${notification.title}</div>
                        <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 4px;">${notification.message}</div>
                        <div style="font-size: 12px; color: var(--text-tertiary);">${notification.time}</div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    updateBadge: () => {
        const badge = document.getElementById('notificationCount');
        const unreadCount = AppState.notifications.filter(n => n.unread).length;
        
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    },

    markAsRead: (notificationId) => {
        const notification = AppState.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.unread = false;
            NotificationManager.renderNotifications();
            NotificationManager.updateBadge();
        }
    },

    markAllAsRead: () => {
        AppState.notifications.forEach(n => n.unread = false);
        NotificationManager.renderNotifications();
        NotificationManager.updateBadge();
    }
};

// Toast Manager
const ToastManager = {
    show: (message, type = 'info', title = '') => {
        const toastContainer = document.getElementById('toastContainer') || ToastManager.createContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${icons[type]}"></i>
            </div>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="ToastManager.close(this)">
                <i class="fas fa-times"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            ToastManager.close(toast.querySelector('.toast-close'));
        }, 5000);
    },

    createContainer: () => {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    },

    close: (closeBtn) => {
        const toast = closeBtn.closest('.toast');
        if (toast) {
            toast.style.animation = 'toastSlideOut 0.3s ease forwards';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }
};

// Modal Manager
const ModalManager = {
    show: (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    hide: (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    hideAll: () => {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
};

// Search Manager
const SearchManager = {
    init: () => {
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce(SearchManager.performSearch, 300));
            searchInput.addEventListener('focus', SearchManager.showResults);
            searchInput.addEventListener('blur', () => {
                setTimeout(SearchManager.hideResults, 200);
            });
        }
    },

    performSearch: (event) => {
        const query = event.target.value.toLowerCase();
        const results = SearchManager.getSearchResults(query);
        SearchManager.renderResults(results);
    },

    getSearchResults: (query) => {
        if (!query) return [];

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
                    action: () => NavigationManager.navigateTo('users')
                });
            }
        });

        // Search products
        sampleProducts.forEach(product => {
            if (product.name.toLowerCase().includes(query)) {
                results.push({
                    type: 'product',
                    title: product.name,
                    subtitle: Utils.formatCurrency(product.price),
                    action: () => NavigationManager.navigateTo('products')
                });
            }
        });

        return results.slice(0, 5);
    },

    renderResults: (results) => {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.style.display = 'none';
            return;
        }

        resultsContainer.innerHTML = results.map(result => `
            <div class="search-result-item" onclick="SearchManager.selectResult('${result.type}', '${result.title}')">
                <div style="font-weight: 500; color: var(--text-primary);">${result.title}</div>
                <div style="font-size: 12px; color: var(--text-secondary);">${result.subtitle}</div>
            </div>
        `).join('');

        resultsContainer.style.display = 'block';
    },

    selectResult: (type, title) => {
        if (type === 'user') {
            NavigationManager.navigateTo('users');
        } else if (type === 'product') {
            NavigationManager.navigateTo('products');
        }
        SearchManager.hideResults();
    },

    showResults: () => {
        const resultsContainer = document.getElementById('searchResults');
        const searchInput = document.getElementById('globalSearch');
        
        if (resultsContainer && searchInput && searchInput.value) {
            resultsContainer.style.display = 'block';
        }
    },

    hideResults: () => {
        const resultsContainer = document.getElementById('searchResults');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    }
};

// Form Handlers
function handleLogin(event) {
    event.preventDefault();
    console.log('handleLogin called');
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(`Login attempt with email: ${email}`);
    
    const result = AuthManager.login(email, password);
    
    if (result.success) {
        console.log('Login successful');
        showDashboard();
        ToastManager.show('Welcome back!', 'success');
    } else {
        console.log('Login failed:', result.message);
        ToastManager.show(result.message, 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        ToastManager.show('Passwords do not match', 'error');
        return;
    }
    
    if (!Utils.validateEmail(email)) {
        ToastManager.show('Please enter a valid email address', 'error');
        return;
    }
    
    const passwordValidation = Utils.validatePassword(password);
    if (!passwordValidation.length || !passwordValidation.uppercase || !passwordValidation.lowercase) {
        ToastManager.show('Password must be at least 8 characters with uppercase and lowercase letters', 'error');
        return;
    }
    
    const result = AuthManager.register({ firstName, lastName, email, password });
    
    if (result.success) {
        showDashboard();
        ToastManager.show('Account created successfully!', 'success');
    }
}

function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    
    if (!Utils.validateEmail(email)) {
        ToastManager.show('Please enter a valid email address', 'error');
        return;
    }
    
    ToastManager.show('Password reset link sent to your email', 'success');
    hideForgotPassword();
}

function handleAddUser(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());
    
    UserManager.addUser(userData);
    ModalManager.hide('addUserModal');
    event.target.reset();
}

// UI Functions
function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
}

function showRegisterPage() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'flex';
    document.getElementById('dashboard').style.display = 'none';
}

function showDashboard() {
    console.log('showDashboard called');
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    
    // Update user info in header
    if (AppState.currentUser) {
        const userName = document.getElementById('userName');
        const userRole = document.getElementById('userRole');
        const userAvatar = document.getElementById('userAvatar');
        
        if (userName) userName.textContent = `${AppState.currentUser.firstName} ${AppState.currentUser.lastName}`;
        if (userRole) userRole.textContent = AppState.currentUser.role;
        if (userAvatar) {
            userAvatar.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter' font-size='14' fill='%236b7280'%3E${AppState.currentUser.avatar}%3C/text%3E%3C/svg%3E`;
        }
    }
}

function showForgotPassword() {
    ModalManager.show('forgotPasswordModal');
}

function hideForgotPassword() {
    ModalManager.hide('forgotPasswordModal');
}

function showAddUserModal() {
    const modalHtml = `
        <div id="addUserModal" class="modal active">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add New User</h3>
                    <button class="modal-close" onclick="ModalManager.hide('addUserModal')">&times;</button>
                </div>
                <form class="modal-form" onsubmit="handleAddUser(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" class="form-control" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" class="form-control" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Role</label>
                            <select name="role" class="form-control" required>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                                <option value="viewer">Viewer</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <select name="status" class="form-control" required>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" onclick="ModalManager.hide('addUserModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add User</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function showEditUserModal(user) {
    const modalHtml = `
        <div id="editUserModal" class="modal active">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Edit User</h3>
                    <button class="modal-close" onclick="ModalManager.hide('editUserModal')">&times;</button>
                </div>
                <form class="modal-form" onsubmit="handleEditUser(event, ${user.id})">
                    <div class="form-row">
                        <div class="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" class="form-control" value="${user.firstName}" required>
                        </div>
                        <div class="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" class="form-control" value="${user.lastName}" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" class="form-control" value="${user.email}" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Role</label>
                            <select name="role" class="form-control" required>
                                <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                                <option value="moderator" ${user.role === 'moderator' ? 'selected' : ''}>Moderator</option>
                                <option value="viewer" ${user.role === 'viewer' ? 'selected' : ''}>Viewer</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <select name="status" class="form-control" required>
                                <option value="active" ${user.status === 'active' ? 'selected' : ''}>Active</option>
                                <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                                <option value="pending" ${user.status === 'pending' ? 'selected' : ''}>Pending</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" onclick="ModalManager.hide('editUserModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Update User</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function handleEditUser(event, userId) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());
    
    UserManager.updateUser(userId, userData);
    ModalManager.hide('editUserModal');
    document.getElementById('editUserModal').remove();
}

function initApp() {
    console.log('initApp called');
    ThemeManager.init();

    if (AuthManager.checkAuth()) {
        console.log('User authenticated, showing dashboard');
        showDashboard();
    } else {
        console.log('User not authenticated, showing login page');
        showLoginPage();
    }

    NavigationManager.init();

    // Attach form event listeners
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            console.log('Login form submitted');
            handleLogin(event);
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            console.log('Register form submitted');
            handleRegister(event);
        });
    }

    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (event) => {
            console.log('Forgot password form submitted');
            handleForgotPassword(event);
        });
    }

    // Hide loading screen after initialization
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        console.log('Loading screen hidden');
    }
}

document.addEventListener('DOMContentLoaded', initApp);

    