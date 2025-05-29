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
