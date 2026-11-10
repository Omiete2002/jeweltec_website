/* =========================================================================
   JEWELTEC — CORE SITE SCRIPT
   -------------------------------------------------------------------------
   Shared, page-agnostic behaviour: navigation, the shopping cart (stored in
   Local Storage), scroll animations, toasts, and the WhatsApp order
   builder. Individual pages (products.html, product.html, cart.html, etc.)
   include this file plus products-data.js, then add a small inline script
   for anything specific to that page.

   WhatsApp number and business details are pulled from CONFIG below so
   they only need to be edited in one place.
   ========================================================================= */

const CONFIG = {
  whatsappNumber: "2348115936207", // no plus sign, used in wa.me links
  phone: "+234 902 098 0259",
  address: "No. 14 Ohaeto Street, D-Line (Behind Ecobank, Aba Road), Port Harcourt, Rivers State, Nigeria",
  cartStorageKey: "jeweltec_cart_v1",
  orderNumberStorageKey: "jeweltec_order_seq_v1"
};

/* ---------------------------------------------------------------------
   CURRENCY FORMATTING
   ------------------------------------------------------------------- */
function formatNaira(amount) {
  return "₦" + Number(amount).toLocaleString("en-NG");
}

/* ---------------------------------------------------------------------
   NAVIGATION: sticky header shadow, mobile menu, current-page indicator
   ------------------------------------------------------------------- */
function initNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.querySelector(".mobile-nav-panel");

  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && panel) {
    const setMenuState = (isOpen) => {
      panel.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      document.documentElement.classList.toggle("mobile-menu-open", isOpen);
      document.body.classList.toggle("mobile-menu-open", isOpen);
    };

    toggle.addEventListener("click", () => {
      setMenuState(!panel.classList.contains("is-open"));
    });
    panel.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => setMenuState(false));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("is-open")) setMenuState(false);
    });
  }

  // Desktop dropdowns: hover opens them (CSS); click/tap + keyboard toggle them here.
  const dropdowns = document.querySelectorAll(".nav-item.has-menu");
  dropdowns.forEach(item => {
    const trigger = item.querySelector(".nav-trigger");
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const willOpen = !item.classList.contains("is-open");
      dropdowns.forEach(d => { d.classList.remove("is-open"); d.querySelector(".nav-trigger").setAttribute("aria-expanded", "false"); });
      item.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item.has-menu")) dropdowns.forEach(d => d.classList.remove("is-open"));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") dropdowns.forEach(d => d.classList.remove("is-open"));
  });

  // Mark the current page in every menu (desktop, dropdowns, mobile panel, tab bar)
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const shopPages = ["products.html", "product.html"];
  document.querySelectorAll(".nav-links a, .mobile-nav-panel a, .tabbar a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentFile || (shopPages.includes(currentFile) && href === "products.html" && link.closest(".tabbar, .nav-links > a"))) {
      link.setAttribute("aria-current", "page");
    }
  });
  dropdowns.forEach(item => {
    const group = (item.dataset.pages || "").split(",");
    if (group.includes(currentFile) || item.querySelector('a[aria-current="page"]')) item.classList.add("is-current");
  });
}

/* ---------------------------------------------------------------------
   FLOATING HELPERS: back-to-top button + scroll progress bar
   ------------------------------------------------------------------- */
function initFloatingHelpers() {
  const toTop = document.querySelector(".to-top");
  let bar = document.querySelector(".scroll-progress");
  if (!bar) {
    bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
  }
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${progress})`;
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 600);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------------------------------------------------------------------
   SPARKLE BURST — a little gold confetti pop when something is added
   ------------------------------------------------------------------- */
function sparkleBurst(el) {
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = el.getBoundingClientRect();
  const colors = ["#f6c624", "#ff5b3a", "#4b47ff", "#ffe486"];
  for (let i = 0; i < 14; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    const angle = (Math.PI * 2 * i) / 14;
    const dist = 40 + Math.random() * 40;
    s.style.left = rect.left + rect.width / 2 + "px";
    s.style.top = rect.top + rect.height / 2 + "px";
    s.style.background = colors[i % colors.length];
    s.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    s.style.setProperty("--dy", Math.sin(angle) * dist + "px");
    if (i % 3 === 0) s.style.borderRadius = "50%";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }
}

/* ---------------------------------------------------------------------
   SCROLL REVEAL ANIMATION (fade-in on scroll)
   ------------------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  items.forEach((el, i) => {
    el.style.setProperty("--i", i % 8);
    observer.observe(el);
  });
}

/* ---------------------------------------------------------------------
   TOAST NOTIFICATIONS
   ------------------------------------------------------------------- */
let toastTimer = null;
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

/* ---------------------------------------------------------------------
   CART (Local Storage)
   Cart is stored as an array of { id, qty } — full product details are
   looked up from PRODUCTS (products-data.js) whenever the cart is
   displayed, so the cart always reflects the latest price/availability.
   ------------------------------------------------------------------- */
function getCart() {
  try {
    const raw = localStorage.getItem(CONFIG.cartStorageKey);
    const storedCart = raw ? JSON.parse(raw) : [];
    return [...new Set(storedCart.map(item => Number(item.id)))].map(id => ({ id }));
  } catch (e) {
    console.error("Could not read cart from storage", e);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CONFIG.cartStorageKey, JSON.stringify(cart));
  updateCartCountBadges();
}

function addToCart(productId, sourceEl) {
  const cart = getCart();
  const existing = cart.find(item => item.id === Number(productId));
  if (!existing) {
    cart.push({ id: Number(productId) });
    saveCart(cart);
    document.querySelectorAll(".cart-count").forEach(b => {
      b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
    });
  }
  const product = typeof getProductById === "function" ? getProductById(productId) : null;
  showToast(product ? (existing ? `${product.name} is already in your cart` : `${product.name} added to cart`) : "Item added to cart");
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== Number(productId));
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function getCartDetailed() {
  // Merge stored cart entries with live product data; silently drops any
  // id that no longer exists in the catalog (e.g. a product was removed).
  return getCart()
    .map(item => {
      const product = typeof getProductById === "function" ? getProductById(item.id) : null;
      return product || null;
    })
    .filter(Boolean);
}

function getCartCount() {
  return getCart().length;
}

function getCartTotal() {
  return getCartDetailed().reduce((sum, item) => sum + item.price, 0);
}

function updateCartCountBadges() {
  const count = getCartCount();
  document.querySelectorAll(".cart-count").forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}

/* ---------------------------------------------------------------------
   ORDER NUMBER
   A simple incrementing order number kept in Local Storage purely for
   the on-screen / WhatsApp order summary — there is no backend order
   system, so this is a friendly reference number rather than a database
   record.
   ------------------------------------------------------------------- */
function getNextOrderNumber() {
  const last = Number(localStorage.getItem(CONFIG.orderNumberStorageKey)) || 1000;
  const next = last + 1;
  localStorage.setItem(CONFIG.orderNumberStorageKey, String(next));
  return next;
}

/* ---------------------------------------------------------------------
   WHATSAPP ORDER MESSAGE BUILDER
   ------------------------------------------------------------------- */
function buildWhatsAppOrderMessage(orderNumber, cartItems, customer) {
  const lines = [];
  lines.push("New Order Details");
  lines.push(`Order No: ${orderNumber}`);
  lines.push("");
  lines.push("Products");
  cartItems.forEach(item => {
    lines.push(item.name);
    lines.push(formatNaira(item.price));
  });
  lines.push("");
  const total = cartItems.reduce((sum, i) => sum + i.price, 0);
  lines.push("Total Price");
  lines.push(formatNaira(total));
  lines.push("");
  lines.push("Customer Name");
  lines.push(customer.name);
  lines.push("");
  lines.push("Phone");
  lines.push(customer.phone);
  lines.push("");
  if (customer.email) {
    lines.push("Email");
    lines.push(customer.email);
    lines.push("");
  }
  lines.push("Delivery Address");
  lines.push(customer.address);
  if (customer.notes) {
    lines.push("");
    lines.push("Additional Notes");
    lines.push(customer.notes);
  }
  return lines.join("\n");
}

function openWhatsAppOrder(orderNumber, cartItems, customer) {
  const message = buildWhatsAppOrderMessage(orderNumber, cartItems, customer);
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function openWhatsAppGeneral(prefill = "") {
  const url = `https://wa.me/${CONFIG.whatsappNumber}` + (prefill ? `?text=${encodeURIComponent(prefill)}` : "");
  window.open(url, "_blank");
}

/* ---------------------------------------------------------------------
   PRODUCT CARD RENDERING (shared by home, products listing, related)
   ------------------------------------------------------------------- */
const ICON_PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';

function productCardHTML(product) {
  const cornerBadge = !product.available
    ? '<span class="product-card__badge product-card__badge--sold">Sold</span>'
    : (product.featured ? '<span class="product-card__badge product-card__badge--hot">Featured</span>' : "");
  return `
    <article class="product-card reveal">
      <a href="product.html?id=${product.id}" class="product-card__media" aria-label="View ${product.name}">
        <span class="product-card__badge">${product.category}</span>
        ${cornerBadge}
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-card__peek">View Details</span>
      </a>
      <div class="product-card__body">
        <h3 class="product-card__name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p class="product-card__desc">${product.shortDescription}</p>
        <div class="product-card__foot">
          <span class="product-card__price">${formatNaira(product.price)}</span>
        </div>
        <div class="product-card__actions">
          <a class="btn btn--ghost btn--sm" href="product.html?id=${product.id}">Details</a>
          <button class="btn btn--gold btn--sm add-btn" ${product.available ? "" : "disabled"} onclick="addToCart(${product.id}, this)">
            ${product.available ? "Add to Cart" : "Sold Out"}
          </button>
        </div>
      </div>
    </article>`;
}

function renderProductGrid(container, products) {
  if (!container) return;
  if (!products.length) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="sankofa-mark">${sankofaSVG()}</span>
        <h3>No pieces found</h3>
        <p>Try a different search term or category — or message us on WhatsApp, since new pieces are added by hand regularly.</p>
      </div>`;
    return;
  }
  container.innerHTML = products.map(productCardHTML).join("");
}

/* ---------------------------------------------------------------------
   SANKOFA SIGNATURE MARK (inline SVG, reused across pages)
   A line-art Adinkra Sankofa bird — Jeweltec's signature symbol for
   heritage and legacy. Kept as a JS string so any page can drop it in
   without duplicating markup in every HTML file.
   ------------------------------------------------------------------- */
function sankofaSVG() {
  return `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 88c-16 0-27-11-27-25 0-10 6-17 14-17 6 0 10 4 10 9 0 4-3 7-6 7-2 0-4-1-4-3"/>
    <path d="M37 47c0-14 10-25 24-25 10 0 17 6 20 14"/>
    <path d="M81 36l6-8-10-1"/>
    <circle cx="83" cy="34" r="2.2" fill="currentColor" stroke="none"/>
    <path d="M50 88v6M40 92h20"/>
  </svg>`;
}

function paintSankofaMarks() {
  document.querySelectorAll("[data-sankofa]").forEach(el => {
    el.innerHTML = sankofaSVG();
  });
}

/* ---------------------------------------------------------------------
   INIT — runs on every page
   ------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initFloatingHelpers();
  updateCartCountBadges();
  paintSankofaMarks();
});
