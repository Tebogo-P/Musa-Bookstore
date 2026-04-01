// ─── CHECKOUT PAGE MANAGER ────────────────────────────────

$(function() {

  // Redirect to cart if cart is empty
  function checkCart() {
    if (Cart.get().length === 0) {
      window.location.href = 'cart.html';
      return false;
    }
    return true;
  }

  // Format price to ZAR
  function formatPrice(price) {
    return 'R' + price.toFixed(2);
  }

  // Calculate shipping cost
  function getShippingCost() {
    const method = $('input[name="shipping"]:checked').val();
    if (method === 'express') return 99;
    if (method === 'overnight') return 199;
    return 0; // Standard is free
  }

  // Render order items
  function renderOrderItems() {
    const items = Cart.get();
    const itemsHtml = items.map(item => {
      const book = Cart.resolveBook(item);
      if (!book) return '';
      
      const itemTotal = book.price * item.qty;
      return `
        <div class="flex gap-3 text-sm pb-4 border-b border-gray-100 last:border-0 last:pb-0">
          <img src="${book.cover}" alt="${book.title}" class="w-12 h-16 object-cover rounded" />
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-gray-900 text-xs line-clamp-1">${book.title}</p>
            <p class="text-gray-500 text-xs">Qty: ${item.qty}</p>
            <p class="font-semibold text-gray-900 text-sm mt-1">${formatPrice(itemTotal)}</p>
          </div>
        </div>
      `;
    }).join('');

    $('#order-items').html(itemsHtml);
  }

  // Update order summary
  function updateSummary() {
    const subtotal = Cart.subtotal();
    const coupon = Cart.getAppliedCoupon();
    const discountAmount = coupon ? subtotal * coupon.discount : 0;
    const taxableAmount = subtotal - discountAmount;
    const shippingCost = getShippingCost();
    const tax = (taxableAmount + shippingCost) * 0.15; // 15% tax includes shipping
    const total = taxableAmount + shippingCost + tax;

    // Update display
    $('#summary-subtotal').text(formatPrice(subtotal));
    $('#summary-shipping').text(shippingCost > 0 ? formatPrice(shippingCost) : 'FREE');
    $('#summary-tax').text(formatPrice(tax));
    $('#summary-total').text(formatPrice(total));

    // Show/hide discount
    if (coupon) {
      $('#discount-section').removeClass('hidden');
      $('#summary-discount').text('-' + formatPrice(discountAmount));
    } else {
      $('#discount-section').addClass('hidden');
    }
  }

  // Validate form
  function validateForm() {
    const agreeTerms = $('#agree-terms').is(':checked');
    const allInputsFilled = $('#shipping-form').find('input[required]').toArray().every(input => 
      $(input).val().trim() !== ''
    );

    if (!allInputsFilled) {
      showToast('Please fill in all required fields', 'error');
      return false;
    }

    if (!agreeTerms) {
      showToast('Please agree to the terms and conditions', 'error');
      return false;
    }

    return true;
  }

  // Handle payment selection
  $('input[name="payment"]').on('change', function() {
    const method = $(this).val();
    // In a real implementation, this would show different payment forms
    // For now, we just acknowledge the selection
  });

  // Handle shipping method change
  $('input[name="shipping"]').on('change', function() {
    updateSummary();
  });

  // Place order
  $('#place-order-btn').on('click', function() {
    if (!validateForm()) {
      return;
    }

    const paymentMethod = $('input[name="payment"]:checked').val();
    const shippingMethod = $('input[name="shipping"]:checked').val();
    
    // Disable button during processing
    const $btn = $(this);
    $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin mr-2"></i> Processing...');

    // Simulate payment processing (in a real app, this would call a payment gateway)
    setTimeout(() => {
      // Get customer info
      const customerName = $('#shipping-form input[placeholder="John Doe"]').val();
      const customerEmail = $('#shipping-form input[type="email"]').val();
      const customerPhone = $('#shipping-form input[type="tel"]').val();
      const shippingAddress = $('#shipping-form input[placeholder="123 Main Street"]').val() + ', ' + 
                            $('#shipping-form').find('input[placeholder="Cape Town"]').val() + ' ' +
                            $('#shipping-form').find('input[placeholder="8000"]').val();

      // Calculate totals
      const subtotal = Cart.subtotal();
      const coupon = Cart.getAppliedCoupon();
      const discountAmount = coupon ? subtotal * coupon.discount : 0;
      const taxableAmount = subtotal - discountAmount;
      const shippingCost = getShippingCost();
      const tax = (taxableAmount + shippingCost) * 0.15;
      const total = taxableAmount + shippingCost + tax;

      // Prepare items for history
      const items = Cart.get().map(item => {
        const book = Cart.resolveBook(item);
        return {
          id: item.id,
          title: book.title,
          author: book.author,
          price: book.price,
          qty: item.qty
        };
      });

      // Store order information
      const orderData = {
        id: 'ORD' + Date.now(),
        timestamp: new Date().toISOString(),
        items: Cart.get(),
        subtotal: subtotal,
        coupon: coupon,
        shipping: shippingMethod,
        shippingCost: shippingCost,
        paymentMethod: paymentMethod,
        customerInfo: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          address: shippingAddress
        }
      };

      // Save order (would go to backend in real app)
      localStorage.setItem('lastOrder', JSON.stringify(orderData));

      // Save to user account if logged in
      if (typeof Account !== 'undefined' && Account.isLoggedIn()) {
        Account.addPurchase({
          items: items,
          total: total,
          discount: discountAmount,
          customerName: customerName,
          email: customerEmail,
          phone: customerPhone,
          shippingAddress: shippingAddress
        });
      }

      // Clear cart
      Cart.clear();

      // Redirect to confirmation page
      window.location.href = 'order-confirmation.html?orderId=' + orderData.id;
    }, 2000);
  });

  // Initialize
  if (!checkCart()) return;

  renderOrderItems();
  updateSummary();

  // Update summary when form changes
  $('input[name="shipping"]').on('change', updateSummary);

});
