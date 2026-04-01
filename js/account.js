/* ═══════════════════════════════════════════════════════════
   Musa Bookstore — Account Management System
   User registration, login, authentication, and purchase history
═══════════════════════════════════════════════════════════ */

const Account = {
  // Storage keys
  KEY: 'musaUsers',
  CURRENT_USER_KEY: 'musaCurrentUser',
  PURCHASE_HISTORY_KEY: 'musaPurchaseHistory',

  // ─── User Registration ────────────────────────────────────
  register(email, password, fullName) {
    // Validation
    if (!email || !password || !fullName) {
      return { success: false, message: 'All fields are required.' };
    }
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }
    if (!this.isValidEmail(email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    // Check if email already exists
    const users = this.getAllUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      password: btoa(password), // Simple encoding (not secure for production)
      fullName: fullName,
      createdAt: new Date().toISOString(),
      purchaseHistory: []
    };

    users.push(newUser);
    localStorage.setItem(this.KEY, JSON.stringify(users));

    // Auto-login after registration
    this.login(email, password);

    return { success: true, message: 'Account created successfully!' };
  },

  // ─── User Login ──────────────────────────────────────────
  login(email, password) {
    const users = this.getAllUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || atob(user.password) !== password) {
      return { success: false, message: 'Invalid email or password.' };
    }

    // Store current user (without password)
    const currentUser = { ...user };
    delete currentUser.password;
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(currentUser));

    return { success: true, message: 'Logged in successfully!' };
  },

  // ─── User Logout ─────────────────────────────────────────
  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    return { success: true, message: 'Logged out successfully.' };
  },

  // ─── Get Current User ────────────────────────────────────
  getCurrentUser() {
    try {
      const user = localStorage.getItem(this.CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  // ─── Is Logged In ────────────────────────────────────────
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  // ─── Get All Users ───────────────────────────────────────
  getAllUsers() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch {
      return [];
    }
  },

  // ─── Save Purchase to History ────────────────────────────
  addPurchase(orderData) {
    const user = this.getCurrentUser();
    if (!user) return { success: false, message: 'User not logged in.' };

    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex === -1) return { success: false, message: 'User not found.' };

    const purchase = {
      id: Date.now().toString(),
      orderNumber: 'ORD-' + Date.now(),
      date: new Date().toISOString(),
      items: orderData.items || [],
      total: orderData.total || 0,
      discount: orderData.discount || 0,
      status: 'Completed',
      customerName: orderData.customerName || user.fullName,
      email: orderData.email || user.email,
      shippingAddress: orderData.shippingAddress || '',
      phone: orderData.phone || ''
    };

    users[userIndex].purchaseHistory.push(purchase);
    localStorage.setItem(this.KEY, JSON.stringify(users));

    // Update current user in session
    user.purchaseHistory = users[userIndex].purchaseHistory;
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));

    return { success: true, message: 'Purchase saved to history!', purchase };
  },

  // ─── Get Purchase History ────────────────────────────────
  getPurchaseHistory() {
    const user = this.getCurrentUser();
    if (!user) return [];

    const users = this.getAllUsers();
    const userData = users.find(u => u.id === user.id);

    return userData ? userData.purchaseHistory : [];
  },

  // ─── Get Single Purchase ──────────────────────────────────
  getPurchase(orderId) {
    const history = this.getPurchaseHistory();
    return history.find(p => p.id === orderId);
  },

  // ─── Email Validation ────────────────────────────────────
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // ─── Update User Profile ─────────────────────────────────
  updateProfile(fullName, phone = '') {
    const user = this.getCurrentUser();
    if (!user) return { success: false, message: 'User not logged in.' };

    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex === -1) return { success: false, message: 'User not found.' };

    users[userIndex].fullName = fullName;
    if (phone) users[userIndex].phone = phone;

    localStorage.setItem(this.KEY, JSON.stringify(users));

    // Update current user
    user.fullName = fullName;
    if (phone) user.phone = phone;
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));

    return { success: true, message: 'Profile updated successfully!' };
  }
};

// ─── Auto-update Navbar on Page Load ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateAuthNav();
});

function updateAuthNav() {
  const user = Account.getCurrentUser();
  const navLinks = document.querySelector('.flex.items-center.justify-center.gap-4');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!navLinks) return;

  // Find or create auth link
  let authLink = document.getElementById('auth-link');
  let mobileAuthLink = document.getElementById('mobile-auth-link');

  if (user) {
    // User is logged in
    if (!authLink) {
      // Desktop nav
      const span = document.createElement('span');
      span.className = 'text-gray-300';
      span.textContent = '•';
      navLinks.appendChild(span);

      authLink = document.createElement('a');
      authLink.id = 'auth-link';
      authLink.href = 'dashboard.html';
      authLink.className = 'nav-link text-gray-700 hover:text-indigo-600 font-medium text-xs transition-colors';
      authLink.textContent = user.fullName.split(' ')[0];
      navLinks.appendChild(authLink);
    } else {
      authLink.href = 'dashboard.html';
      authLink.textContent = user.fullName.split(' ')[0];
    }

    // Mobile nav
    if (!mobileAuthLink && mobileMenu) {
      const mobileMenuContent = mobileMenu.querySelector('.px-4.py-3');
      if (mobileMenuContent) {
        mobileAuthLink = document.createElement('a');
        mobileAuthLink.id = 'mobile-auth-link';
        mobileAuthLink.href = 'dashboard.html';
        mobileAuthLink.className = 'block px-3 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors';
        mobileAuthLink.innerHTML = '<i class="fas fa-user-circle mr-2"></i>Dashboard';
        mobileMenuContent.appendChild(mobileAuthLink);
      }
    }
  } else {
    // User is logged out
    if (!authLink) {
      // Desktop nav
      const span = document.createElement('span');
      span.className = 'text-gray-300';
      span.textContent = '•';
      navLinks.appendChild(span);

      authLink = document.createElement('a');
      authLink.id = 'auth-link';
      authLink.href = 'login.html';
      authLink.className = 'nav-link text-gray-700 hover:text-indigo-600 font-medium text-xs transition-colors';
      authLink.textContent = 'Account';
      navLinks.appendChild(authLink);
    } else {
      authLink.href = 'login.html';
      authLink.textContent = 'Account';
    }

    // Mobile nav
    if (!mobileAuthLink && mobileMenu) {
      const mobileMenuContent = mobileMenu.querySelector('.px-4.py-3');
      if (mobileMenuContent) {
        mobileAuthLink = document.createElement('a');
        mobileAuthLink.id = 'mobile-auth-link';
        mobileAuthLink.href = 'login.html';
        mobileAuthLink.className = 'block px-3 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors';
        mobileAuthLink.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Login / Register';
        mobileMenuContent.appendChild(mobileAuthLink);
      }
    }
  }
}
