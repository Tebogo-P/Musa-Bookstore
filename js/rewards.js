/* ═══════════════════════════════════════════════════════════
   Musa Bookstore — Rewards System
   Points redemption tiers, personal coupon injection,
   Cart coupon resolver that handles both standard + personal
═══════════════════════════════════════════════════════════ */

const Rewards = {

  // Redemption tiers: { pointsCost, discountPct, label }
  TIERS: [
    { pointsCost: 200,  discountPct: 5,  label: '5% Off Voucher',   icon: '🎟️' },
    { pointsCost: 400,  discountPct: 10, label: '10% Off Voucher',  icon: '🎁' },
    { pointsCost: 750,  discountPct: 15, label: '15% Off Voucher',  icon: '⭐' },
    { pointsCost: 1200, discountPct: 25, label: '25% Off Voucher',  icon: '👑' },
  ],

  // Resolve a coupon code from both static + personal pools
  resolveCoupon(code) {
    const upper = code.trim().toUpperCase();

    // 1) Static codes
    const staticCoupons = {
      'MUSA10': { discount: 0.10, label: '10% Off' },
      'READ20': { discount: 0.20, label: '20% Off' },
      'BOOK15': { discount: 0.15, label: '15% Off' },
      'SAVE25': { discount: 0.25, label: '25% Off' },
    };
    if (staticCoupons[upper]) return { ...staticCoupons[upper], code: upper };

    // 2) Personal reward coupons
    try {
      const personal = JSON.parse(localStorage.getItem('musaPersonalCoupons') || '{}');
      if (personal[upper]) return { ...personal[upper], code: upper, personal: true };
    } catch { /* */ }

    return null;
  },

  // Render the rewards dashboard widget (injected into dashboard.html)
  renderWidget(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const user      = Account.getCurrentUser();
    if (!user) { container.innerHTML = '<p class="text-gray-500">Log in to view rewards.</p>'; return; }

    const points    = Account.getPoints();
    const tier      = Account.getLoyaltyTier();
    const nextTier  = Account.getNextTier();
    const coupons   = Account.getPersonalCoupons().filter(c => !c.used);
    const activity  = Account.getActivityLog().slice(0, 10);

    const progressPct = nextTier
      ? Math.min(100, Math.round(((user.lifetimeSpend || 0) / nextTier.required) * 100))
      : 100;

    const tiersHtml = Rewards.TIERS.map(t => {
      const canAfford = points >= t.pointsCost;
      return `
        <div class="border ${canAfford ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-gray-50'} 
             rounded-xl p-4 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">${t.icon}</span>
            <div>
              <p class="font-bold text-gray-900 text-sm">${t.label}</p>
              <p class="text-xs text-gray-500">${t.pointsCost} points required</p>
            </div>
          </div>
          <button 
            class="redeem-btn text-xs font-bold px-4 py-2 rounded-xl transition-all
              ${canAfford 
                ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}"
            data-cost="${t.pointsCost}" data-pct="${t.discountPct}"
            ${!canAfford ? 'disabled' : ''}>
            Redeem
          </button>
        </div>`;
    }).join('');

    const couponsHtml = coupons.length
      ? coupons.map(c => {
          const exp = new Date(c.expiresAt).toLocaleDateString('en-ZA');
          return `
            <div class="flex items-center justify-between bg-green-50 border border-green-200 
                 rounded-xl px-4 py-3">
              <div>
                <p class="font-bold text-green-800 font-mono text-sm tracking-widest">${c.code}</p>
                <p class="text-xs text-green-600">${c.label} · Expires ${exp}</p>
              </div>
              <button onclick="navigator.clipboard.writeText('${c.code}');showToast('Code copied!','info')"
                class="text-xs text-green-700 border border-green-300 px-3 py-1.5 rounded-lg hover:bg-green-100 transition">
                <i class="fas fa-copy mr-1"></i>Copy
              </button>
            </div>`;
        }).join('')
      : '<p class="text-gray-400 text-sm text-center py-4">No active coupons. Redeem points above!</p>';

    const activityHtml = activity.length
      ? activity.map(a => {
          const d = new Date(a.date).toLocaleString('en-ZA', { dateStyle: 'short', timeStyle: 'short' });
          return `
            <div class="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
              <span class="text-lg flex-shrink-0">${a.description.charAt(0)}</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-700 leading-snug">${a.description.slice(2)}</p>
                <p class="text-xs text-gray-400 mt-0.5">${d}</p>
              </div>
            </div>`;
        }).join('')
      : '<p class="text-gray-400 text-sm text-center py-4">No activity yet.</p>';

    container.innerHTML = `
      <!-- Tier Banner -->
      <div class="${tier.bg} border ${tier.border} rounded-2xl p-6 mb-6">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-4">
            <span class="text-4xl">${tier.icon}</span>
            <div>
              <p class="text-xs font-bold text-gray-500 uppercase tracking-widest">Current Tier</p>
              <p class="font-serif font-bold text-2xl ${tier.color}">${tier.name} Member</p>
              <p class="text-xs text-gray-600 mt-0.5">${tier.perks}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-500 uppercase tracking-widest">Available Points</p>
            <p class="font-serif font-bold text-3xl text-amber-600">${points.toLocaleString()}</p>
          </div>
        </div>
        ${nextTier ? `
        <div class="mt-5">
          <div class="flex justify-between text-xs text-gray-600 mb-1.5">
            <span>Progress to ${nextTier.name}</span>
            <span>R${(user.lifetimeSpend || 0).toFixed(0)} / R${nextTier.required}</span>
          </div>
          <div class="h-2.5 bg-white bg-opacity-60 rounded-full overflow-hidden">
            <div class="h-full bg-amber-500 rounded-full transition-all" style="width:${progressPct}%"></div>
          </div>
          <p class="text-xs text-gray-500 mt-1.5">R${nextTier.remaining.toFixed(0)} more to reach ${nextTier.name}</p>
        </div>` : `
        <div class="mt-4 text-center">
          <span class="text-xs font-bold text-yellow-700 bg-yellow-200 px-3 py-1 rounded-full">
            👑 Maximum tier reached!
          </span>
        </div>`}
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Redeem Points -->
        <div>
          <h3 class="font-serif font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <i class="fas fa-gift text-amber-500"></i> Redeem Points
          </h3>
          <div class="space-y-3" id="redeem-tiers">${tiersHtml}</div>
        </div>

        <!-- Active Coupons -->
        <div>
          <h3 class="font-serif font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <i class="fas fa-ticket-alt text-green-500"></i> Your Coupons
          </h3>
          <div class="space-y-3" id="coupon-list">${couponsHtml}</div>
        </div>
      </div>

      <!-- Activity Feed -->
      <div class="mt-8">
        <h3 class="font-serif font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <i class="fas fa-stream text-indigo-500"></i> Recent Activity
        </h3>
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          ${activityHtml}
        </div>
      </div>`;

    // Redeem button handlers
    container.querySelectorAll('.redeem-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const cost = parseInt(btn.dataset.cost);
        const pct  = parseInt(btn.dataset.pct);
        const result = Account.generateRewardCoupon(cost, pct);
        if (result.success) {
          showToast(`Coupon <strong>${result.coupon.code}</strong> created! ✅`, 'success', 4000);
          Rewards.renderWidget(containerId);
        } else {
          showToast(result.message, 'error');
        }
      });
    });
  }
};

// ─── Patch Cart.applyCoupon to also resolve personal codes ─
(function patchCart() {
  const _orig = Cart.applyCoupon.bind(Cart);
  Cart.applyCoupon = function(code) {
    const resolved = Rewards.resolveCoupon(code);
    if (resolved) {
      localStorage.setItem(this.COUPON_KEY, JSON.stringify({ code: resolved.code, ...resolved }));
      return resolved;
    }
    return null;
  };
})();