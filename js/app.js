/* ═══════════════════════════════════════════════════════════
   Musa Bookstore — Shared Application Logic
   Books data, Cart management, Utilities
═══════════════════════════════════════════════════════════ */

// ─── Books Data ───────────────────────────────────────────
const BOOKS_DATA = [
  { id:1,  title:"The Great Gatsby",                        author:"F. Scott Fitzgerald",  price:12.99, originalPrice:18.99, rating:4.5, reviews:2847,  category:"Fiction",         badge:"Bestseller",         coverClass:"cover-fiction",    emoji:"✨", pages:180, publisher:"Scribner",              year:2004, description:"Set in the Jazz Age, Nick Carraway tells the story of the enigmatic Jay Gatsby and his obsessive love for Daisy Buchanan — a timeless exploration of the American Dream.",                                                                              inStock:true,  featured:true,  newArrival:false },
  { id:2,  title:"To Kill a Mockingbird",                   author:"Harper Lee",           price:14.99, originalPrice:null,  rating:4.8, reviews:5123,  category:"Fiction",         badge:"Classic",            coverClass:"cover-fiction",    emoji:"⚖️", pages:281, publisher:"HarperCollins",         year:2002, description:"Through the eyes of young Scout Finch, this Pulitzer Prize winner explores racial injustice and moral growth in 1930s Alabama in a deeply moving narrative.",                                                                                           inStock:true,  featured:true,  newArrival:false },
  { id:3,  title:"1984",                                    author:"George Orwell",        price:11.99, originalPrice:15.99, rating:4.8, reviews:6892,  category:"Science Fiction", badge:"Must Read",          coverClass:"cover-scifi",      emoji:"👁️", pages:328, publisher:"Signet Classic",        year:1961, description:"A haunting vision of a totalitarian future. Winston Smith's rebellion against Big Brother's all-seeing surveillance state remains one of literature's most powerful warnings.",                                                                             inStock:true,  featured:true,  newArrival:false },
  { id:4,  title:"Dune",                                    author:"Frank Herbert",        price:16.99, originalPrice:22.99, rating:4.7, reviews:4521,  category:"Science Fiction", badge:"Epic",               coverClass:"cover-scifi",      emoji:"🏜️", pages:688, publisher:"Chilton Books",         year:1965, description:"A sweeping saga of politics, religion, and ecology on the desert planet Arrakis — home to the universe's most precious resource. A landmark of science fiction.",                                                                                      inStock:true,  featured:true,  newArrival:false },
  { id:5,  title:"Atomic Habits",                           author:"James Clear",          price:18.99, originalPrice:24.99, rating:4.9, reviews:8734,  category:"Self-Help",       badge:"#1 Bestseller",      coverClass:"cover-selfhelp",   emoji:"⚡", pages:320, publisher:"Avery",                 year:2018, description:"A proven framework for building good habits and breaking bad ones. Tiny 1% improvements compound into remarkable results over time.",                                                                                                                    inStock:true,  featured:true,  newArrival:false },
  { id:6,  title:"Sapiens",                                 author:"Yuval Noah Harari",    price:17.99, originalPrice:23.99, rating:4.7, reviews:9102,  category:"Non-Fiction",     badge:"Global Bestseller",  coverClass:"cover-nonfiction", emoji:"🌍", pages:443, publisher:"Harper",                year:2015, description:"A bold exploration of humankind's history — from the Stone Age to the digital era — examining how Homo sapiens came to rule the world through biology, language, and power.",                                                                          inStock:true,  featured:true,  newArrival:false },
  { id:7,  title:"The Alchemist",                           author:"Paulo Coelho",         price:13.99, originalPrice:17.99, rating:4.6, reviews:7234,  category:"Fiction",         badge:"Inspirational",      coverClass:"cover-fiction",    emoji:"🌟", pages:197, publisher:"HarperSanFrancisco",   year:1988, description:"A young Andalusian shepherd's journey to find treasure leads him to discover the real meaning of his personal legend. A timeless fable about following your dreams.",                                                                                  inStock:true,  featured:true,  newArrival:false },
  { id:8,  title:"Gone Girl",                               author:"Gillian Flynn",        price:15.99, originalPrice:null,  rating:4.2, reviews:3456,  category:"Mystery",         badge:"Thriller",           coverClass:"cover-mystery",    emoji:"🔍", pages:422, publisher:"Crown",                 year:2012, description:"On their fifth anniversary, Nick Dunne reports his wife Amy missing. As investigation unfolds, a complex marriage unravels in alternating perspectives full of dark twists.",                                                                           inStock:true,  featured:true,  newArrival:false },
  { id:9,  title:"Becoming",                                author:"Michelle Obama",       price:17.99, originalPrice:25.99, rating:4.9, reviews:12089, category:"Biography",       badge:"NYT #1",             coverClass:"cover-biography",  emoji:"👑", pages:448, publisher:"Crown",                 year:2018, description:"An intimate and powerful memoir by the former First Lady — from her Chicago childhood to the White House years. A story of identity, resilience, and hope.",                                                                                          inStock:true,  featured:false, newArrival:true  },
  { id:10, title:"Steve Jobs",                              author:"Walter Isaacson",      price:19.99, originalPrice:27.99, rating:4.5, reviews:4231,  category:"Biography",       badge:"Definitive",         coverClass:"cover-biography",  emoji:"🍎", pages:656, publisher:"Simon & Schuster",     year:2011, description:"Based on exclusive interviews, this biography reveals the brilliant and polarizing man who revolutionised technology, design, and culture at Apple.",                                                                                                 inStock:true,  featured:false, newArrival:false },
  { id:11, title:"The 7 Habits of Highly Effective People", author:"Stephen Covey",       price:15.99, originalPrice:19.99, rating:4.6, reviews:5678,  category:"Self-Help",       badge:"Classic",            coverClass:"cover-selfhelp",   emoji:"🎯", pages:384, publisher:"Free Press",            year:1989, description:"Seven timeless principles for personal and professional effectiveness — from private victories of character to public victories of leadership.",                                                                                                       inStock:true,  featured:false, newArrival:false },
  { id:12, title:"Pride and Prejudice",                     author:"Jane Austen",         price:10.99, originalPrice:null,  rating:4.7, reviews:6543,  category:"Romance",         badge:"Classic",            coverClass:"cover-romance",    emoji:"❤️", pages:432, publisher:"Penguin Classics",     year:2002, description:"Elizabeth Bennet navigates love, class, and self-discovery in Georgian England. Austen's wit and insight into human nature make this one of the most beloved novels ever written.",                                                                 inStock:true,  featured:false, newArrival:false },
  { id:13, title:"Guns, Germs, and Steel",                  author:"Jared Diamond",       price:16.99, originalPrice:21.99, rating:4.4, reviews:3201,  category:"History",         badge:"Pulitzer Prize",     coverClass:"cover-history",    emoji:"🏛️", pages:498, publisher:"W. W. Norton",         year:1997, description:"Diamond argues that geography and environment — not race — determined which civilisations flourished. A fascinating account of human societal development.",                                                                                       inStock:true,  featured:false, newArrival:false },
  { id:14, title:"The Hitchhiker's Guide to the Galaxy",    author:"Douglas Adams",       price:13.99, originalPrice:17.99, rating:4.6, reviews:4892,  category:"Science Fiction", badge:"Cult Classic",       coverClass:"cover-scifi",      emoji:"🚀", pages:224, publisher:"Pan Books",            year:1979, description:"Seconds before Earth is demolished for a hyperspace bypass, Arthur Dent is whisked off on a hilarious cosmic adventure. Don't panic!",                                                                                                                inStock:true,  featured:false, newArrival:true  },
  { id:15, title:"A Brief History of Time",                 author:"Stephen Hawking",     price:15.99, originalPrice:19.99, rating:4.6, reviews:5102,  category:"Science",         badge:"Landmark",           coverClass:"cover-science",    emoji:"🔭", pages:212, publisher:"Bantam",               year:1988, description:"Hawking's accessible tour of cosmology — from the Big Bang to black holes — became a landmark in popular science writing beloved by millions worldwide.",                                                                                            inStock:true,  featured:false, newArrival:false },
  { id:16, title:"How to Win Friends and Influence People",  author:"Dale Carnegie",      price:13.99, originalPrice:17.99, rating:4.5, reviews:7823,  category:"Self-Help",       badge:"All-Time Classic",   coverClass:"cover-selfhelp",   emoji:"🤝", pages:288, publisher:"Simon & Schuster",     year:1936, description:"Carnegie's timeless guide to building meaningful relationships, handling people effectively, and becoming a more likable and influential leader.",                                                                                                    inStock:true,  featured:false, newArrival:false },
  { id:17, title:"The Girl with the Dragon Tattoo",          author:"Stieg Larsson",      price:14.99, originalPrice:19.99, rating:4.4, reviews:4120,  category:"Mystery",         badge:"International Hit",  coverClass:"cover-mystery",    emoji:"🐉", pages:672, publisher:"Vintage",              year:2005, description:"Journalist Mikael Blomkvist teams with extraordinary hacker Lisbeth Salander to investigate a decades-old disappearance within a wealthy Swedish dynasty.",                                                                                       inStock:true,  featured:false, newArrival:false },
  { id:18, title:"Me Before You",                            author:"Jojo Moyes",         price:13.99, originalPrice:17.99, rating:4.5, reviews:5432,  category:"Romance",         badge:"Heartfelt",          coverClass:"cover-romance",    emoji:"🌹", pages:369, publisher:"Pamela Dorman Books",  year:2012, description:"An unlikely relationship between Lou Clark and quadriplegic Will Traynor challenges both of their notions of what makes life worth living — a profoundly emotional story.",                                                                    inStock:true,  featured:false, newArrival:true  },
  { id:19, title:"Thinking, Fast and Slow",                  author:"Daniel Kahneman",    price:16.99, originalPrice:22.99, rating:4.5, reviews:4892,  category:"Non-Fiction",     badge:"Nobel Prize Winner", coverClass:"cover-nonfiction", emoji:"🧠", pages:499, publisher:"Farrar, Straus and Giroux", year:2011, description:"Nobel laureate Kahneman illuminates the two systems driving the way we think — fast intuitive System 1 and slow deliberate System 2 — revealing biases that shape our world.",                                                              inStock:true,  featured:false, newArrival:false },
  { id:20, title:"Ender's Game",                             author:"Orson Scott Card",   price:14.99, originalPrice:18.99, rating:4.5, reviews:3921,  category:"Science Fiction", badge:"Hugo & Nebula",      coverClass:"cover-scifi",      emoji:"🎮", pages:352, publisher:"Tor Books",            year:1985, description:"Young genius Ender Wiggin is recruited for a battle school in space to train for a looming alien invasion. A masterwork of military science fiction.",                                                                                             inStock:true,  featured:false, newArrival:false },
  { id:21, title:"Brave New World",                          author:"Aldous Huxley",      price:11.99, originalPrice:15.99, rating:4.3, reviews:4567,  category:"Science Fiction", badge:"Dystopian",          coverClass:"cover-scifi",      emoji:"🧬", pages:311, publisher:"Harper Perennial",    year:1932, description:"A chilling vision of a future society where genetic engineering and conditioning create a seemingly perfect but profoundly dehumanised world.",                                                                                                  inStock:true,  featured:false, newArrival:false },
  { id:22, title:"The Power of Now",                         author:"Eckhart Tolle",      price:14.99, originalPrice:18.99, rating:4.4, reviews:6234,  category:"Self-Help",       badge:"Spiritual",          coverClass:"cover-selfhelp",   emoji:"☀️", pages:236, publisher:"New World Library",    year:1997, description:"A guide to spiritual enlightenment through present-moment awareness — learning to observe your thoughts without being controlled by them.",                                                                                                     inStock:true,  featured:false, newArrival:true  },
  { id:23, title:"The Catcher in the Rye",                   author:"J.D. Salinger",      price:12.99, originalPrice:null,  rating:4.1, reviews:5678,  category:"Fiction",         badge:"Coming of Age",      coverClass:"cover-fiction",    emoji:"🍞", pages:277, publisher:"Little, Brown",        year:1951, description:"Holden Caulfield's disenchanted narration of his days adrift in New York City after being expelled from prep school — a defining novel of teenage alienation.",                                                                                   inStock:true,  featured:false, newArrival:false },
  { id:24, title:"The Notebook",                             author:"Nicholas Sparks",    price:12.99, originalPrice:15.99, rating:4.3, reviews:4102,  category:"Romance",         badge:"Bestselling",        coverClass:"cover-romance",    emoji:"📔", pages:214, publisher:"Warner Books",         year:1996, description:"An aged man reads a beautiful love story to a woman with dementia — the enduring tale of Noah and Allie's love that transcends time, memory, and hardship.",                                                                                  inStock:true,  featured:false, newArrival:false }
];

// ─── CART MANAGEMENT ──────────────────────────────────────
const Cart = {
  KEY: 'musaCart',
  WISHLIST_KEY: 'musaWishlist',
  COUPON_KEY: 'musaCoupon',

  COUPONS: {
    'MUSA10': { discount: 0.10, label: '10% Off' },
    'READ20': { discount: 0.20, label: '20% Off' },
    'BOOK15': { discount: 0.15, label: '15% Off' },
    'SAVE25': { discount: 0.25, label: '25% Off' }
  },

  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch { return []; }
  },

  save(cart) {
    localStorage.setItem(this.KEY, JSON.stringify(cart));
  },

  add(bookId, qty = 1) {
    const cart = this.get();
    const existing = cart.find(i => i.id === bookId);
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, 10);
    } else {
      cart.push({ id: bookId, qty });
    }
    this.save(cart);
    this.updateBadge();
  },

  remove(bookId) {
    const cart = this.get().filter(i => i.id !== bookId);
    this.save(cart);
    this.updateBadge();
  },

  updateQty(bookId, qty) {
    const cart = this.get();
    const item = cart.find(i => i.id === bookId);
    if (item) {
      if (qty < 1) { this.remove(bookId); return; }
      item.qty = Math.min(qty, 10);
      this.save(cart);
    }
    this.updateBadge();
  },

  count() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },

  subtotal() {
    return this.get().reduce((sum, i) => {
      const book = BOOKS_DATA.find(b => b.id === i.id);
      return sum + (book ? book.price * i.qty : 0);
    }, 0);
  },

  clear() {
    localStorage.removeItem(this.KEY);
    localStorage.removeItem(this.COUPON_KEY);
    this.updateBadge();
  },

  updateBadge() {
    const count = this.count();
    $('.cart-badge').text(count).toggleClass('hidden', count === 0);
  },

  // Wishlist
  getWishlist() {
    try { return JSON.parse(localStorage.getItem(this.WISHLIST_KEY)) || []; }
    catch { return []; }
  },

  toggleWishlist(bookId) {
    let wl = this.getWishlist();
    if (wl.includes(bookId)) {
      wl = wl.filter(id => id !== bookId);
    } else {
      wl.push(bookId);
    }
    localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(wl));
    return wl.includes(bookId);
  },

  isWishlisted(bookId) {
    return this.getWishlist().includes(bookId);
  },

  // Coupon
  applyCoupon(code) {
    const coupon = this.COUPONS[code.toUpperCase()];
    if (coupon) {
      localStorage.setItem(this.COUPON_KEY, JSON.stringify({ code: code.toUpperCase(), ...coupon }));
      return coupon;
    }
    return null;
  },

  getAppliedCoupon() {
    try { return JSON.parse(localStorage.getItem(this.COUPON_KEY)) || null; }
    catch { return null; }
  },

  removeCoupon() {
    localStorage.removeItem(this.COUPON_KEY);
  }
};

// ─── UTILITIES ────────────────────────────────────────────

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    '<i class="fas fa-star star-filled"></i>'.repeat(full) +
    (half ? '<i class="fas fa-star-half-alt star-half"></i>' : '') +
    '<i class="far fa-star star-empty"></i>'.repeat(empty)
  );
}

function formatPrice(n) {
  return 'R' + Number(n).toFixed(2);
}

function getBadgeClass(badge) {
  if (!badge) return 'badge-default';
  const b = badge.toLowerCase();
  if (b.includes('bestseller') || b.includes('#1')) return 'badge-bestseller';
  if (b.includes('new') || b.includes('arrival'))   return 'badge-new';
  if (b.includes('sale') || b.includes('off'))       return 'badge-sale';
  if (b.includes('classic') || b.includes('prize'))  return 'badge-classic';
  return 'badge-default';
}

function showToast(message, type = 'success', duration = 3000) {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', cart: '🛒' };
  const icon  = icons[type] || icons.info;
  const $toast = $(`
    <div class="toast toast-${type === 'cart' ? 'success' : type} show">
      <span class="text-xl">${icon}</span>
      <span>${message}</span>
    </div>
  `);
  $('#toast-container').append($toast);
  setTimeout(() => {
    $toast.removeClass('show');
    setTimeout(() => $toast.remove(), 400);
  }, duration);
}

function buildBookCard(book, extraClasses = '') {
  const discount = book.originalPrice
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : 0;
  const wishlisted = Cart.isWishlisted(book.id);

  return `
    <div class="book-card bg-white rounded-2xl overflow-hidden shadow-md ${extraClasses}" data-id="${book.id}">
      <!-- Cover -->
      <div class="book-cover-wrap ${book.coverClass} relative" style="height:200px;">
        <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-white text-center">
          <span class="text-5xl mb-2">${book.emoji}</span>
          <p class="font-serif font-bold text-sm leading-tight line-clamp-2 opacity-90">${book.title}</p>
          <p class="text-xs opacity-70 mt-1">${book.author}</p>
        </div>
        ${discount > 0 ? `<span class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-${discount}%</span>` : ''}
        <button class="wishlist-btn absolute top-2 right-2 text-white hover:text-red-400 transition-colors bg-black bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center ${wishlisted ? 'active' : ''}"
                data-id="${book.id}" onclick="event.stopPropagation()">
          <i class="${wishlisted ? 'fas' : 'far'} fa-heart"></i>
        </button>
        ${book.newArrival ? `<span class="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">New</span>` : ''}
      </div>
      <!-- Info -->
      <div class="p-4">
        <span class="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${getBadgeClass(book.badge)}">${book.badge}</span>
        <h3 class="font-serif font-bold text-gray-900 text-sm leading-tight mb-0.5 line-clamp-2">${book.title}</h3>
        <p class="text-gray-500 text-xs mb-2">${book.author}</p>
        <div class="flex items-center gap-1 mb-3">
          <div class="flex text-xs">${renderStars(book.rating)}</div>
          <span class="text-xs text-gray-400">(${book.reviews.toLocaleString()})</span>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-sky-600 font-bold text-base">${formatPrice(book.price)}</span>
            ${book.originalPrice ? `<span class="text-gray-400 text-xs line-through ml-1">${formatPrice(book.originalPrice)}</span>` : ''}
          </div>
          <button class="btn-add-cart bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-3 py-2 rounded-xl add-to-cart-btn" data-id="${book.id}">
            <i class="fas fa-cart-plus mr-1"></i>Add
          </button>
        </div>
      </div>
    </div>
  `;
}

// ─── COMMON jQuery SETUP ──────────────────────────────────
$(function () {

  // Dark mode: init from localStorage
  const savedTheme = localStorage.getItem('musaTheme');
  if (savedTheme === 'dark') {
    $('html').addClass('dark');
  }

  // Dark mode toggle
  $(document).on('click', '#theme-toggle', function () {
    const isDark = $('html').toggleClass('dark').hasClass('dark');
    localStorage.setItem('musaTheme', isDark ? 'dark' : 'light');
    $(this).attr('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    $('#theme-icon').toggleClass('fa-moon', !isDark).toggleClass('fa-sun', isDark);
  });

  // Set correct icon on load
  const isDarkOnLoad = $('html').hasClass('dark');
  $('#theme-icon').toggleClass('fa-moon', !isDarkOnLoad).toggleClass('fa-sun', isDarkOnLoad);

  // Init badge
  Cart.updateBadge();

  // Navbar scroll effect
  $(window).on('scroll', function () {
    $('#navbar').toggleClass('scrolled', $(this).scrollTop() > 60);
    $('#scroll-top').toggleClass('visible', $(this).scrollTop() > 400);
  });

  // Mobile menu toggle
  $('#mobile-toggle').on('click', function () {
    $('#mobile-menu').toggleClass('open');
    const isOpen = $('#mobile-menu').hasClass('open');
    $('#hamburger-icon').toggleClass('fa-bars', !isOpen).toggleClass('fa-times', isOpen);
  });

  // Scroll to top
  $('#scroll-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  // Search overlay
  $('#search-toggle').on('click', function () {
    $('#search-overlay').addClass('open');
    setTimeout(() => $('#search-input').focus(), 200);
  });
  $('#search-close, #search-overlay').on('click', function (e) {
    if ($(e.target).is('#search-overlay') || $(e.target).is('#search-close') || $(e.target).closest('#search-close').length) {
      $('#search-overlay').removeClass('open');
    }
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('#search-overlay').removeClass('open');
      $('#book-modal').removeClass('open');
    }
  });

  // Global search input
  $('#search-input').on('input', function () {
    const q = $(this).val().trim().toLowerCase();
    if (q.length < 2) { $('#search-results').empty(); return; }
    const matches = BOOKS_DATA.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    ).slice(0, 6);
    if (matches.length === 0) {
      $('#search-results').html('<p class="text-gray-400 text-center py-4">No books found.</p>');
      return;
    }
    $('#search-results').html(matches.map(b => `
      <a href="books.html" class="search-result-item flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:bg-opacity-10 transition-colors cursor-pointer open-modal-btn" data-id="${b.id}">
        <div class="${b.coverClass} w-10 h-14 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-lg">${b.emoji}</div>
        <div>
          <p class="text-white font-semibold text-sm">${b.title}</p>
          <p class="text-gray-400 text-xs">${b.author} · ${b.category}</p>
          <p class="text-indigo-300 text-xs font-bold">${formatPrice(b.price)}</p>
        </div>
      </a>
    `).join(''));
  });

  // Book modal open (delegated)
  $(document).on('click', '.book-card', function () {
    const id = parseInt($(this).data('id'));
    openBookModal(id);
  });
  $(document).on('click', '.open-modal-btn', function (e) {
    e.preventDefault();
    const id = parseInt($(this).data('id'));
    $('#search-overlay').removeClass('open');
    openBookModal(id);
  });

  // Modal close
  $('#modal-close, #book-modal').on('click', function (e) {
    if ($(e.target).is('#book-modal') || $(e.target).is('#modal-close') || $(e.target).closest('#modal-close').length) {
      $('#book-modal').removeClass('open');
    }
  });

  // Add to cart (delegated) — stop propagation so modal doesn't open
  $(document).on('click', '.add-to-cart-btn', function (e) {
    e.stopPropagation();
    const id = parseInt($(this).data('id'));
    const book = BOOKS_DATA.find(b => b.id === id);
    Cart.add(id);
    showToast(`<strong>${book.title}</strong> added to cart!`, 'cart');
    // Animate button
    const $btn = $(this);
    $btn.html('<i class="fas fa-check mr-1"></i>Added').addClass('bg-sky-500').removeClass('bg-sky-600');
    setTimeout(() => {
      $btn.html('<i class="fas fa-cart-plus mr-1"></i>Add').removeClass('bg-sky-500').addClass('bg-sky-600');
    }, 1500);
  });

  // Wishlist toggle (delegated)
  $(document).on('click', '.wishlist-btn', function (e) {
    e.stopPropagation();
    const id = parseInt($(this).data('id'));
    const added = Cart.toggleWishlist(id);
    $(this).toggleClass('active', added);
    $(this).find('i').toggleClass('fas', added).toggleClass('far', !added);
    showToast(added ? 'Added to wishlist ❤️' : 'Removed from wishlist', added ? 'info' : 'error', 2000);
  });

});

// Open Book Modal
function openBookModal(id) {
  const book = BOOKS_DATA.find(b => b.id === id);
  if (!book) return;
  const discount = book.originalPrice ? Math.round((1 - book.price / book.originalPrice) * 100) : 0;

  $('#modal-body').html(`
    <div class="flex flex-col md:flex-row gap-6 p-6">
      <!-- Cover -->
      <div class="flex-shrink-0 mx-auto md:mx-0">
        <div class="${book.coverClass} w-44 h-64 md:w-52 md:h-72 rounded-xl flex flex-col items-center justify-center text-white text-center p-4 shadow-xl" style="border-radius:6px 14px 14px 6px;">
          <span class="text-6xl mb-3">${book.emoji}</span>
          <p class="font-serif font-bold text-sm leading-tight">${book.title}</p>
          <p class="text-xs opacity-70 mt-1">${book.author}</p>
        </div>
      </div>
      <!-- Details -->
      <div class="flex-1">
        <div class="flex items-start justify-between gap-2">
          <div>
            <span class="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${getBadgeClass(book.badge)}">${book.badge}</span>
            <h2 class="font-serif font-bold text-2xl text-gray-900">${book.title}</h2>
            <p class="text-gray-500 text-sm mt-1">by <span class="text-sky-600 font-semibold">${book.author}</span></p>
          </div>
        </div>
        <div class="flex items-center gap-2 mt-3">
          <div class="flex">${renderStars(book.rating)}</div>
          <span class="text-sm font-semibold text-gray-700">${book.rating}</span>
          <span class="text-gray-400 text-sm">(${book.reviews.toLocaleString()} reviews)</span>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed mt-4">${book.description}</p>
        <!-- Meta grid -->
        <div class="grid grid-cols-2 gap-3 mt-4">
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-400 uppercase tracking-wide font-semibold">Category</p>
            <p class="text-sm font-semibold text-gray-800 mt-0.5">${book.category}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-400 uppercase tracking-wide font-semibold">Pages</p>
            <p class="text-sm font-semibold text-gray-800 mt-0.5">${book.pages}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-400 uppercase tracking-wide font-semibold">Publisher</p>
            <p class="text-sm font-semibold text-gray-800 mt-0.5">${book.publisher}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-400 uppercase tracking-wide font-semibold">Year</p>
            <p class="text-sm font-semibold text-gray-800 mt-0.5">${book.year}</p>
          </div>
        </div>
        <!-- Price & CTA -->
        <div class="flex items-center justify-between mt-5 flex-wrap gap-3">
          <div>
            <span class="text-2xl font-bold text-sky-600">${formatPrice(book.price)}</span>
            ${book.originalPrice ? `<span class="text-gray-400 line-through text-sm ml-2">${formatPrice(book.originalPrice)}</span>` : ''}
            ${discount > 0 ? `<span class="ml-2 bg-sky-100 text-sky-700 text-xs font-bold px-2 py-0.5 rounded-full">-${discount}% OFF</span>` : ''}
          </div>
          <div class="flex gap-2">
            <button class="wishlist-btn ${Cart.isWishlisted(book.id) ? 'active text-sky-500' : 'text-gray-400'} border border-gray-200 rounded-xl px-4 py-2.5 hover:border-sky-300 transition-colors" data-id="${book.id}">
              <i class="${Cart.isWishlisted(book.id) ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <button class="btn-add-cart add-to-cart-btn bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm" data-id="${book.id}">
              <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `);

  $('#book-modal').addClass('open');
}
