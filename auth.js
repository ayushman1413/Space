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
