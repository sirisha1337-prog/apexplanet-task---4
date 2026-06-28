/* =========================================================
   TASK 4 — PRODUCT LISTING PAGE — products.js
   ES6+, modular, event-delegated, LocalStorage-backed cart count.
   ========================================================= */

(() => {
  'use strict';

  const THEME_KEY = 'apex-portfolio-theme';
  const CART_KEY   = 'apex-shop-cart';

  /* ---------- 1. PRODUCT DATA (24 items, 6 categories) ---------- */
  const PRODUCTS = [
    { id: 1,  name: 'Aero Wireless Headphones',  category: 'Audio',     price: 79.99,  rating: 4.6, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', desc: 'Over-ear wireless headphones with active noise cancellation and 30-hour battery life.' },
    { id: 2,  name: 'Pulse Mini Speaker',         category: 'Audio',     price: 34.50,  rating: 4.2, img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80', desc: 'Pocket-sized Bluetooth speaker with surprisingly deep bass and IPX5 splash resistance.' },
    { id: 3,  name: 'StudioBuds Pro',             category: 'Audio',     price: 129.00, rating: 4.8, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80', desc: 'True wireless earbuds tuned for studio-accurate sound and all-day comfort.' },
    { id: 4,  name: 'Vinyl Classic Turntable',    category: 'Audio',     price: 189.99, rating: 4.4, img: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=500&q=80', desc: 'Belt-driven turntable with built-in preamp for a warm, authentic analog sound.' },

    { id: 5,  name: 'Flux Mechanical Keyboard',  category: 'Computing', price: 89.00,  rating: 4.7, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80', desc: 'Hot-swappable mechanical keyboard with tactile switches and per-key RGB.' },
    { id: 6,  name: 'Glide Wireless Mouse',       category: 'Computing', price: 24.99,  rating: 4.1, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80', desc: 'Ergonomic wireless mouse with silent clicks and a 3-month battery life.' },
    { id: 7,  name: 'UltraView 27" Monitor',      category: 'Computing', price: 249.00, rating: 4.6, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80', desc: '27-inch QHD monitor with 144Hz refresh rate, ideal for design and gaming.' },
    { id: 8,  name: 'DeskHub 7-in-1',             category: 'Computing', price: 42.00,  rating: 4.0, img: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&q=80', desc: 'Compact USB-C hub with HDMI, SD card reader and 100W pass-through charging.' },
    { id: 9,  name: 'AirType Laptop Stand',       category: 'Computing', price: 29.99,  rating: 4.3, img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80', desc: 'Aluminum laptop stand that improves airflow and posture at any desk.' },

    { id: 10, name: 'Trailblazer Backpack',       category: 'Outdoor',   price: 59.99,  rating: 4.5, img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&q=80', desc: 'Weatherproof 28L backpack with a padded laptop sleeve and hidden pockets.' },
    { id: 11, name: 'Summit Insulated Bottle',    category: 'Outdoor',   price: 19.99,  rating: 4.7, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80', desc: 'Double-wall steel bottle that keeps drinks cold for 24 hours, hot for 12.' },
    { id: 12, name: 'Pathfinder Headlamp',        category: 'Outdoor',   price: 22.50,  rating: 4.3, img: 'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=500&q=80', desc: 'Rechargeable LED headlamp with 300 lumens and a red night-vision mode.' },
    { id: 13, name: 'Basecamp 2-Person Tent',     category: 'Outdoor',   price: 119.00, rating: 4.4, img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&q=80', desc: 'Quick-pitch tent with a waterproof rainfly, packed weight under 3kg.' },

    { id: 14, name: 'Linen Weekend Shirt',        category: 'Apparel',   price: 38.00,  rating: 4.2, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80', desc: 'Breathable linen-blend shirt with a relaxed fit, perfect for warm days.' },
    { id: 15, name: 'Cloudknit Pullover',         category: 'Apparel',   price: 54.99,  rating: 4.6, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80', desc: 'Brushed-fleece pullover that stays light without sacrificing warmth.' },
    { id: 16, name: 'Trail-Ready Sneakers',       category: 'Apparel',   price: 74.99,  rating: 4.5, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', desc: 'Versatile sneakers with grippy soles for both city streets and light trails.' },
    { id: 17, name: 'Everyday Denim Jacket',      category: 'Apparel',   price: 64.00,  rating: 4.1, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80', desc: 'Classic-cut denim jacket in a washed indigo, built to soften with age.' },

    { id: 18, name: 'Hearth Ceramic Mug Set',     category: 'Home',      price: 28.00,  rating: 4.4, img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80', desc: 'Set of two hand-glazed ceramic mugs, each one subtly unique.' },
    { id: 19, name: 'Lumen Desk Lamp',             category: 'Home',      price: 46.50,  rating: 4.6, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80', desc: 'Adjustable LED desk lamp with three warmth settings and a USB port.' },
    { id: 20, name: 'Drift Throw Blanket',        category: 'Home',      price: 32.99,  rating: 4.3, img: 'https://images.unsplash.com/photo-1580301762395-83cb1c7f0f43?w=500&q=80', desc: 'Oversized woven throw blanket, soft enough for everyday couch use.' },
    { id: 21, name: 'Verdant Plant Pot Trio',     category: 'Home',      price: 24.00,  rating: 4.0, img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80', desc: 'Set of three matte ceramic planters in graduated sizes, drainage included.' },

    { id: 22, name: 'Atlas Travel Wallet',        category: 'Accessories', price: 27.99, rating: 4.5, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80', desc: 'RFID-blocking travel wallet with dedicated slots for passport and cards.' },
    { id: 23, name: 'Solstice Sunglasses',        category: 'Accessories', price: 49.00, rating: 4.2, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80', desc: 'Polarized sunglasses with a lightweight acetate frame and UV400 protection.' },
    { id: 24, name: 'Chrono Steel Watch',         category: 'Accessories', price: 139.00, rating: 4.7, img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80', desc: 'Minimalist stainless steel watch, water-resistant to 50 meters.' },
  ];

  /* ---------- 2. DOM refs ---------- */
  const grid           = document.getElementById('productGrid');
  const searchInput     = document.getElementById('searchInput');
  const categoryFilter  = document.getElementById('categoryFilter');
  const priceFilter      = document.getElementById('priceFilter');
  const ratingFilter     = document.getElementById('ratingFilter');
  const sortSelect       = document.getElementById('sortSelect');
  const resultCount      = document.getElementById('resultCount');
  const resetBtn         = document.getElementById('resetFilters');
  const themeBtn         = document.getElementById('themeToggleShop');
  const toTopBtn         = document.getElementById('toTop');

  /* ---------- 3. State ---------- */
  let state = {
    search: '',
    category: 'all',
    price: 'all',
    rating: 0,
    sort: 'default',
  };

  /* ---------- 4. Helpers ---------- */
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderStars(rating) {
    return `★ ${rating.toFixed(1)}`;
  }

  function populateCategoryFilter() {
    const categories = [...new Set(PRODUCTS.map(p => p.category))].sort();
    categoryFilter.insertAdjacentHTML(
      'beforeend',
      categories.map(c => `<option value="${c}">${c}</option>`).join('')
    );
  }

  /* ---------- 5. Filtering + sorting pipeline ---------- */
  function getFilteredProducts() {
    let result = PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(state.search.toLowerCase()) ||
                             p.desc.toLowerCase().includes(state.search.toLowerCase());
      const matchesCategory = state.category === 'all' || p.category === state.category;
      const matchesRating = p.rating >= state.rating;

      let matchesPrice = true;
      if (state.price !== 'all') {
        const [min, max] = state.price.split('-').map(Number);
        matchesPrice = p.price >= min && p.price <= max;
      }
      return matchesSearch && matchesCategory && matchesRating && matchesPrice;
    });

    switch (state.sort) {
      case 'price-asc':   result.sort((a, b) => a.price - b.price); break;
      case 'price-desc':  result.sort((a, b) => b.price - a.price); break;
      case 'rating-desc': result.sort((a, b) => b.rating - a.rating); break;
      case 'name-asc':    result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc':   result.sort((a, b) => b.name.localeCompare(a.name)); break;
      default: break; // featured / original order
    }
    return result;
  }

  /* ---------- 6. Render ---------- */
  function renderProducts() {
    try {
      const products = getFilteredProducts();
      resultCount.textContent = `Showing ${products.length} of ${PRODUCTS.length} products`;

      if (!products.length) {
        grid.innerHTML = `
          <div class="shop-empty">
            <span class="big">🔍</span>
            <p>No products match your filters.</p>
          </div>`;
        return;
      }

      grid.innerHTML = products.map(p => `
        <article class="product-card" data-id="${p.id}">
          <div class="product-media">
            <span class="product-badge">${escapeHTML(p.category)}</span>
            <span class="product-rating-badge">${renderStars(p.rating)}</span>
            <img src="${p.img}" alt="${escapeHTML(p.name)}" loading="lazy">
          </div>
          <div class="product-body">
            <span class="product-cat">${escapeHTML(p.category)}</span>
            <h3 class="product-name">${escapeHTML(p.name)}</h3>
            <p class="product-desc">${escapeHTML(p.desc)}</p>
            <div class="product-footer">
              <span class="product-price">$${p.price.toFixed(2)}</span>
              <button class="add-cart-btn" data-action="add-cart" data-id="${p.id}">Add to Cart</button>
            </div>
          </div>
        </article>
      `).join('');
    } catch (err) {
      console.error('Error rendering products:', err);
      grid.innerHTML = `<div class="shop-empty"><span class="big">⚠️</span><p>Something went wrong loading products.</p></div>`;
    }
  }

  /* ---------- 7. Cart (LocalStorage demo) ---------- */
  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error('Failed to load cart:', err);
      return [];
    }
  }

  function addToCart(id, btn) {
    try {
      const cart = loadCart();
      cart.push(id);
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Added ✓';
        btn.classList.add('added');
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove('added');
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  }

  /* ---------- 8. Event wiring ---------- */
  function initFilterEvents() {
    searchInput.addEventListener('input', (e) => { state.search = e.target.value; renderProducts(); });
    categoryFilter.addEventListener('change', (e) => { state.category = e.target.value; renderProducts(); });
    priceFilter.addEventListener('change', (e) => { state.price = e.target.value; renderProducts(); });
    ratingFilter.addEventListener('change', (e) => { state.rating = Number(e.target.value); renderProducts(); });
    sortSelect.addEventListener('change', (e) => { state.sort = e.target.value; renderProducts(); });

    resetBtn.addEventListener('click', () => {
      state = { search: '', category: 'all', price: 'all', rating: 0, sort: 'default' };
      searchInput.value = '';
      categoryFilter.value = 'all';
      priceFilter.value = 'all';
      ratingFilter.value = '0';
      sortSelect.value = 'default';
      renderProducts();
    });
  }

  function initGridDelegation() {
    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="add-cart"]');
      if (!btn) return;
      addToCart(Number(btn.dataset.id), btn);
    });
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.dataset.theme = saved || (prefersDark ? 'dark' : 'light');
    themeBtn?.addEventListener('click', () => {
      const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
      document.body.dataset.theme = next;
      try { localStorage.setItem(THEME_KEY, next); } catch (err) { console.warn(err); }
    });
  }

  function initScrollToTop() {
    if (!toTopBtn) return;
    window.addEventListener('scroll', () => {
      toTopBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- 9. Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    populateCategoryFilter();
    initTheme();
    initFilterEvents();
    initGridDelegation();
    initScrollToTop();
    renderProducts();
  });
})();
