// ─── CART PAGE MANAGER ────────────────────────────────────

$(function() {

  // Initialize cart on page load
  function initCart() {
    const items = Cart.get();
    if (items.length === 0) {
      $('#empty-cart').removeClass('hidden');
      $('#cart-content').addClass('hidden');
      Cart.updateBadge();
      return;
    }
    
    $('#empty-cart').addClass('hidden');
    $('#cart-content').removeClass('hidden');
    renderCart();
    updateSummary();
  }

  // Format price to ZAR
  function formatPrice(price) {
    return 'R' + price.toFixed(2);
  }

  // Render all cart items
  function renderCart() {
    const items = Cart.get();
    const itemsHtml = items.map((item, idx) => {
      const book = Cart.resolveBook(item);
      if (!book) return '';
      
      const itemTotal = book.price * item.qty;
      const isUsed = item.isUsed;
      const badge = isUsed ? '<span class="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full"><i class="fas fa-recycle"></i>Used</span>' : '';
      
      return `
        <div class="p-6 flex flex-col sm:flex-row gap-4 group/item hover:bg-gray-50 transition-colors" data-item-id="${item.id}">
          <!-- Book Cover -->
          <div class="w-20 h-28 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden shadow-sm">
            <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover" />
          </div>

          <!-- Book Details -->
          <div class="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="font-serif font-bold text-gray-900 text-base line-clamp-1">${book.title}</h3>
                ${badge}
              </div>
              <p class="text-gray-500 text-sm mb-2">${book.author}</p>
              <div class="flex items-center gap-4 text-sm">
                <span class="font-semibold text-sky-600">${formatPrice(book.price)}</span>
                ${book.originalPrice ? `<span class="text-gray-400 line-through">${formatPrice(book.originalPrice)}</span>` : ''}
              </div>
            </div>

            <!-- Quantity & Total -->
            <div class="flex items-center gap-6 sm:flex-col sm:items-end">
              <div class="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button class="qty-decrease w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors text-gray-600 font-bold" data-item-id="${item.id}" title="Decrease quantity">
                  <i class="fas fa-minus text-xs"></i>
                </button>
                <input type="number" class="qty-input w-10 text-center bg-transparent text-sm font-semibold outline-none" 
                       value="${item.qty}" min="1" max="10" data-item-id="${item.id}" />
                <button class="qty-increase w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors text-gray-600 font-bold" data-item-id="${item.id}" title="Increase quantity">
                  <i class="fas fa-plus text-xs"></i>
                </button>
              </div>
              <div class="text-right">
                <p class="text-xs text-gray-500 mb-1">Total</p>
                <p class="font-serif font-bold text-gray-900 text-lg">${formatPrice(itemTotal)}</p>
              </div>
            </div>
          </div>

          <!-- Remove Button -->
          <div class="flex sm:flex-col items-center gap-2">
            <button class="remove-item w-9 h-9 flex items-center justify-center hover:bg-red-50 rounded-full transition-colors text-gray-400 hover:text-red-600" data-item-id="${item.id}" title="Remove from cart">
              <i class="fas fa-trash-alt text-sm"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
    $('#cart-count').text(`${items.length} item${items.length !== 1 ? 's' : ''} (${itemCount} book${itemCount !== 1 ? 's' : ''})`);
    $('#cart-items').html(itemsHtml);
  }

  // Update order summary
  function updateSummary() {
    const subtotal = Cart.subtotal();
    const coupon = Cart.getAppliedCoupon();
    const discountAmount = coupon ? subtotal * coupon.discount : 0;
    const taxableAmount = subtotal - discountAmount;
    const tax = taxableAmount * 0.15; // 15% tax
    const total = taxableAmount + tax;

    // Update display
    $('#subtotal').text(formatPrice(subtotal));
    $('#discount').text('-' + formatPrice(discountAmount));
    $('#tax').text(formatPrice(tax));
    $('#total').text(formatPrice(total));

    // Show/hide discount
    if (coupon) {
      $('#discount-label').text(`(${coupon.label})`).removeClass('hidden');
      $('#applied-coupon').removeClass('hidden');
      $('#coupon-name').text(coupon.code);
      $('#coupon-input').val('');
    } else {
      $('#discount-label').addClass('hidden');
      $('#applied-coupon').addClass('hidden');
    }
  }

  // Quantity increase/decrease
  $(document).on('click', '.qty-increase', function() {
    const itemId = $(this).data('item-id');
    const input = $(`.qty-input[data-item-id="${itemId}"]`);
    const newQty = Math.min(parseInt(input.val()) + 1, 10);
    Cart.updateQty(itemId, newQty);
    renderCart();
    updateSummary();
  });

  $(document).on('click', '.qty-decrease', function() {
    const itemId = $(this).data('item-id');
    const input = $(`.qty-input[data-item-id="${itemId}"]`);
    const newQty = Math.max(parseInt(input.val()) - 1, 1);
    Cart.updateQty(itemId, newQty);
    renderCart();
    updateSummary();
  });

  // Quantity input change
  $(document).on('change', '.qty-input', function() {
    const itemId = $(this).data('item-id');
    let newQty = parseInt($(this).val());
    
    if (isNaN(newQty) || newQty < 1) newQty = 1;
    if (newQty > 10) newQty = 10;
    
    Cart.updateQty(itemId, newQty);
    renderCart();
    updateSummary();
  });

  // Remove item
  $(document).on('click', '.remove-item', function() {
    const itemId = $(this).data('item-id');
    const item = Cart.get().find(i => i.id === itemId);
    const book = item ? Cart.resolveBook(item) : null;
    
    if (confirm(`Remove "${book?.title || 'this item'}" from cart?`)) {
      Cart.remove(itemId);
      if (Cart.get().length === 0) {
        $('#empty-cart').removeClass('hidden');
        $('#cart-content').addClass('hidden');
      } else {
        renderCart();
        updateSummary();
      }
      showToast(`Item removed from cart`, 'info');
    }
  });

  // Apply coupon
  $('#apply-coupon-btn').on('click', function() {
    const code = $('#coupon-input').val().trim();
    
    if (!code) {
      showCouponMessage('Please enter a coupon code', 'error');
      return;
    }

    const coupon = Cart.applyCoupon(code);
    if (coupon) {
      showCouponMessage(`${coupon.label} applied successfully!`, 'success');
      updateSummary();
      $('#coupon-input').val('');
    } else {
      showCouponMessage('Invalid coupon code', 'error');
    }
  });

  // Remove coupon
  $('#remove-coupon-btn').on('click', function() {
    Cart.removeCoupon();
    updateSummary();
    showToast('Coupon removed', 'info');
  });

  function showCouponMessage(msg, type) {
    const $msg = $('#coupon-message');
    $msg.removeClass('hidden text-green-600 text-red-600 bg-green-50 bg-red-50 border-green-200 border-red-200');
    
    if (type === 'success') {
      $msg.addClass('text-green-600 bg-green-50 border border-green-200');
    } else {
      $msg.addClass('text-red-600 bg-red-50 border border-red-200');
    }
    
    $msg.text(msg).removeClass('hidden');
    setTimeout(() => $msg.addClass('hidden'), 3000);
  }

  // Continue shopping
  $('#continue-shopping-btn').on('click', function() {
    window.location.href = 'books.html';
  });

  // Checkout
  $('#checkout-btn').on('click', function() {
    if (Cart.get().length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }
    window.location.href = 'checkout.html';
  });

  // Init on load
  initCart();

});
