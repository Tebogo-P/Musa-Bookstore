/* ═══════════════════════════════════════════════════════════
   Musa Bookstore — Account Management System v2
   Returning client perks, loyalty tiers, activity tracking
═══════════════════════════════════════════════════════════ */

const Account = {
  KEY:              'musaUsers',
  CURRENT_USER_KEY: 'musaCurrentUser',
  ACTIVITY_KEY:     'musaActivity',

  // ─── Registration ─────────────────────────────────────────
  register(email, password, fullName) {
    if (!email || !password || !fullName)
      return { success: false, message: 'All fields are required.' };
    if (password.length < 6)
      return { success: false, message: 'Password must be at least 6 characters.' };
    if (!this.isValidEmail(email))
      return { success: false, message: 'Please enter a valid email address.' };

    const users = this.getAllUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase()))
      return { success: false, message: 'An account with this email already exists.' };

    const newUser = {
      id:              Date.now().toString(),
      email:           email.toLowerCase(),
      password:        btoa(password),
      fullName,
      phone:           '',
      createdAt:       new Date().toISOString(),
      lastLogin:       new Date().toISOString(),
      loginStreak:     1,
      totalLogins:     1,
      points:          50,           // welcome bonus
      lifetimeSpend:   0,
      purchaseHistory: [],
      activityLog:     [{
        type: 'account',
        icon: '🎉',
        description: 'Account created — 50 welcome points awarded',
        date: new Date().toISOString()
      }],
      personalCoupons: [],
      preferences:     { genres: [], notifications: true }
    };

    users.push(newUser);
    localStorage.setItem(this.KEY, JSON.stringify(users));
    this._setSession(newUser);
    return { success: true, message: 'Account created! 50 welcome points added 🎉', user: newUser };
  },

  // ─── Login ────────────────────────────────────────────────
  login(email, password) {
    const users = this.getAllUsers();
    const idx   = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (idx === -1 || atob(users[idx].password) !== password)
      return { success: false, message: 'Invalid email or password.' };

    const user = users[idx];
    const now  = new Date();
    const last = new Date(user.lastLogin || now);
    const daysSinceLast = Math.floor((now - last) / 86400000);

    // streak logic
    if (daysSinceLast === 1) {
      user.loginStreak = (user.loginStreak || 0) + 1;
    } else if (daysSinceLast > 1) {
      user.loginStreak = 1;
    }

    // streak bonus every 7 days
    let streakMsg = '';
    if (user.loginStreak % 7 === 0) {
      user.points = (user.points || 0) + 100;
      streakMsg = ' +100 streak bonus points! 🔥';
      this._logActivity(user, 'streak', `🔥 ${user.loginStreak}-day streak bonus — 100 points awarded`);
    }

    const isReturning = (user.totalLogins || 0) > 0;
    user.lastLogin  = now.toISOString();
    user.totalLogins = (user.totalLogins || 0) + 1;

    users[idx] = user;
    localStorage.setItem(this.KEY, JSON.stringify(users));
    this._setSession(user);

    return {
      success: true,
      isReturning,
      message: isReturning
        ? `Welcome back, ${user.fullName.split(' ')[0]}! 👋${streakMsg}`
        : `Logged in successfully!${streakMsg}`
    };
  },

  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    return { success: true };
  },

  // ─── Session helpers ──────────────────────────────────────
  _setSession(user) {
    const session = { ...user };
    delete session.password;
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(session));
  },

  getCurrentUser() {
    try   { return JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY)) || null; }
    catch { return null; }
  },

  isLoggedIn() { return this.getCurrentUser() !== null; },

  getAllUsers() {
    try   { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch { return []; }
  },

  _getUserRecord() {
    const u = this.getCurrentUser();
    if (!u) return null;
    return this.getAllUsers().find(x => x.id === u.id) || null;
  },

  _saveUser(updatedUser) {
    const users = this.getAllUsers();
    const idx   = users.findIndex(u => u.id === updatedUser.id);
    if (idx === -1) return;
    users[idx] = updatedUser;
    localStorage.setItem(this.KEY, JSON.stringify(users));
    this._setSession(updatedUser);
  },

  // ─── Activity logging ─────────────────────────────────────
  _logActivity(userObj, type, description) {
    if (!userObj.activityLog) userObj.activityLog = [];
    userObj.activityLog.unshift({ type, description, date: new Date().toISOString() });
    if (userObj.activityLog.length > 100) userObj.activityLog.length = 100; // cap
  },

  logActivity(type, description) {
    const user = this._getUserRecord();
    if (!user) return;
    this._logActivity(user, type, description);
    this._saveUser(user);
  },

  getActivityLog() {
    const user = this._getUserRecord();
    return user ? (user.activityLog || []) : [];
  },

  // ─── Points & Loyalty ─────────────────────────────────────
  getPoints() {
    const user = this._getUserRecord();
    return user ? (user.points || 0) : 0;
  },

  addPoints(points, reason = 'Purchase reward') {
    const user = this._getUserRecord();
    if (!user) return;
    user.points = (user.points || 0) + points;
    this._logActivity(user, 'points', `⭐ +${points} points — ${reason}`);
    this._saveUser(user);
    return user.points;
  },

  spendPoints(points) {
    const user = this._getUserRecord();
    if (!user || (user.points || 0) < points) return false;
    user.points -= points;
    this._logActivity(user, 'redeem', `🎁 ${points} points redeemed for a reward`);
    this._saveUser(user);
    return true;
  },

  getLoyaltyTier() {
    const user = this._getUserRecord();
    const spend = user ? (user.lifetimeSpend || 0) : 0;
    if (spend >= 5000) return { name: 'Gold',   color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-400', icon: '👑', perks: '25% bonus points + free express shipping',  pointsMultiplier: 1.25 };
    if (spend >= 2000) return { name: 'Silver', color: 'text-slate-500',  bg: 'bg-slate-100',  border: 'border-slate-400',  icon: '🥈', perks: '15% bonus points + priority support',          pointsMultiplier: 1.15 };
    return                     { name: 'Bronze', color: 'text-amber-700', bg: 'bg-amber-100',  border: 'border-amber-400',  icon: '🥉', perks: 'Earn 1 point per R1 spent',                    pointsMultiplier: 1.00 };
  },

  getNextTier() {
    const user  = this._getUserRecord();
    const spend = user ? (user.lifetimeSpend || 0) : 0;
    if (spend < 2000) return { name: 'Silver', required: 2000, remaining: 2000 - spend };
    if (spend < 5000) return { name: 'Gold',   required: 5000, remaining: 5000 - spend };
    return null; // already max tier
  },

  // ─── Purchase History ─────────────────────────────────────
  addPurchase(orderData) {
    const user = this._getUserRecord();
    if (!user) return { success: false, message: 'Not logged in.' };

    const tier     = this.getLoyaltyTier();
    const rawPoints = Math.floor((orderData.total || 0));
    const bonusPoints = Math.floor(rawPoints * tier.pointsMultiplier);

    const purchase = {
      id:              Date.now().toString(),
      orderNumber:     'ORD-' + Date.now(),
      date:            new Date().toISOString(),
      items:           orderData.items    || [],
      total:           orderData.total    || 0,
      discount:        orderData.discount || 0,
      status:          'Completed',
      customerName:    orderData.customerName    || user.fullName,
      email:           orderData.email           || user.email,
      shippingAddress: orderData.shippingAddress || '',
      phone:           orderData.phone           || '',
      pointsEarned:    bonusPoints
    };

    user.purchaseHistory = user.purchaseHistory || [];
    user.purchaseHistory.push(purchase);
    user.points       = (user.points       || 0) + bonusPoints;
    user.lifetimeSpend = (user.lifetimeSpend || 0) + (orderData.total || 0);

    this._logActivity(user, 'purchase',
      `🛒 Order ${purchase.orderNumber} — R${purchase.total.toFixed(2)} (+${bonusPoints} pts)`);

    this._saveUser(user);
    return { success: true, purchase, pointsEarned: bonusPoints };
  },

  getPurchaseHistory() {
    const user = this._getUserRecord();
    return user ? (user.purchaseHistory || []) : [];
  },

  getPurchase(id) {
    return this.getPurchaseHistory().find(p => p.id === id);
  },

  // ─── Personal Coupons ─────────────────────────────────────
  generateRewardCoupon(pointsCost, discountPct) {
    const user = this._getUserRecord();
    if (!user) return { success: false, message: 'Not logged in.' };
    if ((user.points || 0) < pointsCost)
      return { success: false, message: `Not enough points. Need ${pointsCost}, have ${user.points || 0}.` };

    const code    = 'REWARD-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    const coupon  = {
      code,
      discount:    discountPct / 100,
      label:       `${discountPct}% Reward`,
      pointsCost,
      expiresAt:   new Date(Date.now() + 30 * 86400000).toISOString(),  // 30 days
      used:        false,
      createdAt:   new Date().toISOString()
    };

    user.points -= pointsCost;
    user.personalCoupons = user.personalCoupons || [];
    user.personalCoupons.push(coupon);
    this._logActivity(user, 'coupon', `🎟️ Coupon ${code} generated (${discountPct}% off, ${pointsCost} pts)`);
    this._saveUser(user);

    // inject into global cart coupon system
    const coupons = JSON.parse(localStorage.getItem('musaPersonalCoupons') || '{}');
    coupons[code] = { discount: discountPct / 100, label: `${discountPct}% Reward`, personal: true };
    localStorage.setItem('musaPersonalCoupons', JSON.stringify(coupons));

    return { success: true, coupon };
  },

  getPersonalCoupons() {
    const user = this._getUserRecord();
    return user ? (user.personalCoupons || []) : [];
  },

  markCouponUsed(code) {
    const user = this._getUserRecord();
    if (!user) return;
    const c = (user.personalCoupons || []).find(x => x.code === code);
    if (c) { c.used = true; this._saveUser(user); }
  },

  // ─── Profile update ───────────────────────────────────────
  updateProfile(fullName, phone = '') {
    const user = this._getUserRecord();
    if (!user) return { success: false, message: 'Not logged in.' };
    user.fullName = fullName;
    if (phone) user.phone = phone;
    this._logActivity(user, 'profile', '📝 Profile updated');
    this._saveUser(user);
    return { success: true, message: 'Profile updated successfully!' };
  },

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
};

// ─── Auto-update Navbar ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => { updateAuthNav(); });

function updateAuthNav() {
  const user    = Account.getCurrentUser();
  const navLinks = document.querySelector('.flex.items-center.justify-center.gap-4');
  const mobile   = document.getElementById('mobile-menu');
  if (!navLinks) return;

  let authLink       = document.getElementById('auth-link');
  let mobileAuthLink = document.getElementById('mobile-auth-link');

  const label = user ? user.fullName.split(' ')[0] : 'Account';
  const href  = user ? 'dashboard.html' : 'login.html';

  if (!authLink) {
    const sep = document.createElement('span');
    sep.className = 'text-gray-300'; sep.textContent = '•';
    navLinks.appendChild(sep);
    authLink    = document.createElement('a');
    authLink.id = 'auth-link';
    authLink.className = 'nav-link text-gray-700 hover:text-indigo-600 font-medium text-xs transition-colors';
    navLinks.appendChild(authLink);
  }
  authLink.href        = href;
  authLink.textContent = label;

  if (!mobileAuthLink && mobile) {
    const wrap = mobile.querySelector('.px-4.py-3');
    if (wrap) {
      mobileAuthLink    = document.createElement('a');
      mobileAuthLink.id = 'mobile-auth-link';
      mobileAuthLink.className = 'block px-3 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors';
      wrap.appendChild(mobileAuthLink);
    }
  }
  if (mobileAuthLink) {
    mobileAuthLink.href        = href;
    mobileAuthLink.innerHTML   = user
      ? `<i class="fas fa-user-circle mr-2"></i>Dashboard`
      : `<i class="fas fa-sign-in-alt mr-2"></i>Login / Register`;
  }
}