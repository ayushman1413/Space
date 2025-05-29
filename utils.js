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
