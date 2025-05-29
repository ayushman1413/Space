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
                    userDropdown.classList.toggle('active');
                });

                document.addEventListener('click', () => {
                    userDropdown.classList.remove('active');
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
