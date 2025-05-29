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
