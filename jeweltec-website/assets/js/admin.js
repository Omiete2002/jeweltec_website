/* =========================================================================
   JEWELTEC — ADMIN DASHBOARD SCRIPT
   -------------------------------------------------------------------------
   IMPORTANT — READ THIS FIRST
   This dashboard is a front-end-only tool for VIEWING your catalog and
   generating the code snippet for a new product. It cannot write to
   assets/js/products-data.js itself (a static website has no server to
   save files with), so it does not replace editing that file by hand.

   The login below is a simple deterrent, NOT real security — the
   password lives in this file, in plain text, and anyone who views the
   page source can read it. Do not use this dashboard to protect anything
   sensitive. If you need genuine access control, this site would need a
   backend, which was intentionally left out per the project brief.

   HOW TO CHANGE THE ADMIN PASSWORD
   Edit ADMIN_PASSWORD below.
   ========================================================================= */

const ADMIN_PASSWORD = "jeweltec2026"; // change this to your own password
const ADMIN_SESSION_KEY = "jeweltec_admin_session";

function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function adminLogin(password) {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    return true;
  }
  return false;
}

function adminLogout() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  window.location.href = "admin.html";
}

/* ---------------------------------------------------------------------
   DASHBOARD RENDERING
   ------------------------------------------------------------------- */
function renderAdminStats() {
  const total = PRODUCTS.length;
  const available = PRODUCTS.filter(p => p.available).length;
  const sold = total - available;
  const featured = PRODUCTS.filter(p => p.featured).length;

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-available").textContent = available;
  document.getElementById("stat-sold").textContent = sold;
  document.getElementById("stat-featured").textContent = featured;
}

function renderAdminProductTable() {
  const tbody = document.getElementById("admin-product-tbody");
  tbody.innerHTML = PRODUCTS.map(p => `
    <tr>
      <td><img src="${p.image}" alt="${p.name}"></td>
      <td>${p.name}<br><span style="color:var(--text-muted); font-size:0.78rem;">ID ${p.id}</span></td>
      <td>${p.category}</td>
      <td>${formatNaira(p.price)}</td>
      <td><span class="badge ${p.available ? "badge--available" : "badge--sold"}">${p.available ? "Available" : "Sold"}</span></td>
      <td>${p.featured ? '<span class="badge badge--featured">Featured</span>' : "—"}</td>
      <td><a href="product.html?id=${p.id}" class="btn btn--ghost btn--sm" target="_blank">View</a></td>
    </tr>`).join("");
}

/* ---------------------------------------------------------------------
   NEW PRODUCT CODE-SNIPPET GENERATOR
   Builds a ready-to-paste JavaScript object in the same shape as
   products-data.js, using the next available id automatically.
   ------------------------------------------------------------------- */
function generateProductSnippet(formData) {
  const nextId = Math.max(...PRODUCTS.map(p => p.id)) + 1;
  const gallery = formData.gallery.length ? formData.gallery : [formData.image];

  return `  {
    id: ${nextId},
    name: "${formData.name}",
    category: "${formData.category}",
    price: ${formData.price},
    available: ${formData.available},
    featured: ${formData.featured},
    image: "assets/images/products/${formData.image}",
    gallery: [${gallery.map(g => `"assets/images/products/${g}"`).join(", ")}],
    shortDescription: "${formData.shortDescription}",
    description: "${formData.description}",
    materials: "${formData.materials}",
    occasions: "${formData.occasions}",
    care: "${formData.care}"
  },`;
}
