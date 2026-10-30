// KONFIGURASI RESTORAN APRIANSYAH (FIREBASE AKTIF LINTAS PERANGKAT)
const DEFAULT_STORE = {
  name: "APRIANSYAH",
  founder: "Riski Apriansyah",
  hours: "Open Daily: 08:00 — 23:00 WIB",
  isOpen: true,
  adminPin: "220408",
  firebaseUrl: "https://apriansyah-pos-default-rtdb.asia-southeast1.firebasedatabase.app",
  qrisUrl: "https://i.ibb.co.com/hFtPJRKh/QRIS-DANA-BISNIS-Salin.jpg",
  bankName: "BCA (Bank Central Asia)",
  bankNumber: "8415-2910-29",
  bankHolder: "Riski Apriansyah",
  shippingZones: [
    { name: "Zona VIP Dekat (< 3 km)", fee: 8000 },
    { name: "Dalam Kota (3 - 8 km)", fee: 15000 },
    { name: "Area Luar (> 8 km)", fee: 25000 }
  ],
  promos: {
    "RISKI15": 15000,
    "APRIANSYAHVIP": 25000
  }
};

// 18 MENU KURASI BERGAYA QISSA (GAMBAR VALID & AKTIF)
const DEFAULT_PRODUCTS = [
  // 1. APRIANSYAH SIGNATURES
  { 
    id: 1, 
    name: "Apriansyah Wagyu Brisket Sambal Lu'at", 
    category: "Apriansyah Signatures", 
    price: 85000, 
    isBestSeller: true, 
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80", 
    desc: "Daging sapi Wagyu panggang asap 12 jam, disajikan dengan nasi mentega rempah dan sambal lu'at khas Riski Apriansyah.", 
    tags: "wagyu daging sapi grill makan malam best seller signature" 
  },
  { 
    id: 2, 
    name: "Truffle Duck Confit & Butter Rice", 
    category: "Apriansyah Signatures", 
    price: 72000, 
    isBestSeller: true, 
    image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=600&auto=format&fit=crop&q=80", 
    desc: "Paha bebek renyah dimasak perlahan dengan minyak truffle hitam, disajikan bersama saus reduksi jeruk.", 
    tags: "bebek duck truffle nasi makan best seller signature" 
  },
  { 
    id: 3, 
    name: "Royal Salmon Lodeh Velouté", 
    category: "Apriansyah Signatures", 
    price: 78000, 
    isBestSeller: false, 
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80", 
    desc: "Fillet salmon Norwegia kulit renyah di atas saus velouté santan rempah kuning yang lembut.", 
    tags: "ikan salmon seafood makan malam sehat" 
  },

  // 2. BREAKFAST & ARTISAN BRUNCH
  { 
    id: 4, 
    name: "Sultan Shakshuka & Sourdough", 
    category: "Brunch & Plates", 
    price: 48000, 
    isBestSeller: true, 
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=600&auto=format&fit=crop&q=80", 
    desc: "Telur organik setengah matang dalam saus tomat panggang rempah Timur Tengah, keju feta & roti sourdough bakar.", 
    tags: "telur roti sarapan brunch best seller" 
  },
  { 
    id: 5, 
    name: "Brioche French Toast Caramelized Banana", 
    category: "Brunch & Plates", 
    price: 42000, 
    isBestSeller: false, 
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&auto=format&fit=crop&q=80", 
    desc: "Roti brioche lembut dengan pisang karamel, saus butterscotch, dan es krim vanila Madagaskar.", 
    tags: "roti manis pisang brunch dessert" 
  },
  { 
    id: 6, 
    name: "Smoked Beef Eggs Benedict", 
    category: "Brunch & Plates", 
    price: 52000, 
    isBestSeller: false, 
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&auto=format&fit=crop&q=80", 
    desc: "Poached egg di atas English muffin, daging sapi asap tebal, dan siraman saus hollandaise hangat.", 
    tags: "telur daging asap sarapan brunch" 
  },

  // 3. CHARCOAL GRILL & PASTA
  { 
    id: 7, 
    name: "Charcoal Grilled Lamb Chop Bumbu Kecap", 
    category: "Charcoal Grill", 
    price: 95000, 
    isBestSeller: true, 
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&auto=format&fit=crop&q=80", 
    desc: "Iga domba muda Australia panggang arang, glazur kecap rempah manis pedas dan kentang tumbuk bawang putih.", 
    tags: "kambing domba lamb grill steak best seller makan" 
  },
  { 
    id: 8, 
    name: "Tagliatelle Creamy Mushroom & Truffle", 
    category: "Charcoal Grill", 
    price: 58000, 
    isBestSeller: true, 
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80", 
    desc: "Pasta pita segar dengan saus krim jamur champignon, keju Parmigiano-Reggiano, dan aroma truffle.", 
    tags: "pasta spaghetti jamur creamy makan best seller" 
  },
  { 
    id: 9, 
    name: "Chargrilled Half Spring Chicken", 
    category: "Charcoal Grill", 
    price: 62000, 
    isBestSeller: false, 
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&auto=format&fit=crop&q=80", 
    desc: "Setengah ekor ayam organik panggang arang dengan bumbu marinasi madu bawang putih dan salad segar.", 
    tags: "ayam bakar grill makan kenyang" 
  },

  // 4. SMALL PLATES & PASTRY
  { 
    id: 10, 
    name: "Truffle Parmesan Shoestring Fries", 
    category: "Small Plates & Pastry", 
    price: 35000, 
    isBestSeller: true, 
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80", 
    desc: "Kentang goreng renyah berbalut minyak truffle, taburan keju parmesan parut, dan cocolan garlic aioli.", 
    tags: "kentang goreng cemilan snack truffle best seller" 
  },
  { 
    id: 11, 
    name: "Artisan Pistachio Rose Croissant", 
    category: "Small Plates & Pastry", 
    price: 32000, 
    isBestSeller: true, 
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80", 
    desc: "Croissant Prancis berlapis renyah dengan isian krim kacang pistachio panggang dan taburan kelopak mawar.", 
    tags: "croissant roti pastry cemilan manis best seller" 
  },
  { 
    id: 12, 
    name: "Crispy Calamari with Tartar Dip", 
    category: "Small Plates & Pastry", 
    price: 42000, 
    isBestSeller: false, 
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80", 
    desc: "Cumi segar goreng tepung rempah renyah disajikan dengan irisan lemon dan saus tartar buatan sendiri.", 
    tags: "cumi calamari gorengan snack cemilan gurih" 
  },
  { 
    id: 13, 
    name: "Belgian Molten Lava Cake & Gelato", 
    category: "Small Plates & Pastry", 
    price: 44000, 
    isBestSeller: false, 
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80", 
    desc: "Kue cokelat hitam hangat dengan bagian tengah yang meleleh, disajikan bersama satu scoop vanilla gelato.", 
    tags: "kue coklat lava cake dessert manis" 
  },

  // 5. RISKI APRIANSYAH ROASTERY & ELIXIRS
  { 
    id: 14, 
    name: "Kopi Susu Signature Riski Apriansyah", 
    category: "Roastery & Elixirs", 
    price: 28000, 
    isBestSeller: true, 
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80", 
    desc: "Racikan eksklusif Riski Apriansyah: double ristretto Arabika Gayo, susu oat creamy, dan nektar aren wangi.", 
    tags: "kopi susu aren dingin manis best seller minuman" 
  },
  { 
    id: 15, 
    name: "Smoked Cinnamon Bourbon Cold Brew (Non-Alc)", 
    category: "Roastery & Elixirs", 
    price: 36000, 
    isBestSeller: true, 
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80", 
    desc: "Cold brew 18 jam yang diasapi dengan batang kayu manis bakar dan sirup vanila madu.", 
    tags: "kopi cold brew dingin segar best seller minuman" 
  },
  { 
    id: 16, 
    name: "Uji Matcha Mascarpone Cloud", 
    category: "Roastery & Elixirs", 
    price: 34000, 
    isBestSeller: true, 
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80", 
    desc: "Matcha seremonial Kyoto grade A dengan lapisan krim keju mascarpone lembut di atasnya.", 
    tags: "matcha teh hijau non-coffee minuman dingin best seller" 
  },
  { 
    id: 17, 
    name: "Golden Saffron & Rosewater Karak Chai", 
    category: "Roastery & Elixirs", 
    price: 32000, 
    isBestSeller: false, 
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80", 
    desc: "Teh susu rempah kapulaga khas Timur Tengah yang direbus perlahan dengan helai saffron asli.", 
    tags: "teh susu chai hangat rempah minuman" 
  },
  { 
    id: 18, 
    name: "Hibiscus Pomegranate Sparkling Elixir", 
    category: "Roastery & Elixirs", 
    price: 32000, 
    isBestSeller: false, 
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80", 
    desc: "Mocktail bunga rosella merah, sari buah delima segar, daun mint, dan air soda dingin.", 
    tags: "mocktail teh buah segar dingin asam manis minuman" 
  }
];

// STATE MANAGEMENT
let STORE_CONFIG = JSON.parse(localStorage.getItem("RA_CONFIG")) || DEFAULT_STORE;
let PRODUCTS = JSON.parse(localStorage.getItem("RA_PRODUCTS")) || DEFAULT_PRODUCTS;
let ORDERS = JSON.parse(localStorage.getItem("RA_ORDERS")) || [];
let RESERVATIONS = JSON.parse(localStorage.getItem("RA_RESERVATIONS")) || [];

let cart = [];
let currentServiceType = "dine_in";
let activeCategory = "Semua";
let currentCustomizingProduct = null;
let discountApplied = 0;

const formatRupiah = (n) => "Rp" + Number(n).toLocaleString("id-ID");

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  setupUI();
  renderCategories();
  renderProducts();
});

function setupUI() {
  function applyStoreStatus(isOpen, hours) {
    const badge = document.getElementById("badge-status-toko");
    const banner = document.getElementById("closed-banner");
    const hoursEl = document.getElementById("txt-store-hours");

    if (hoursEl && hours) hoursEl.innerText = hours;

    if (isOpen) {
      if (badge) {
        badge.className = "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider";
        badge.innerText = "OPEN";
      }
      if (banner) banner.classList.add("hidden");
    } else {
      if (badge) {
        badge.className = "bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider";
        badge.innerText = "CLOSED";
      }
      if (banner) banner.classList.remove("hidden");
    }
  }

  // Terapkan status awal lokal
  applyStoreStatus(STORE_CONFIG.isOpen, STORE_CONFIG.hours);

  // Tarik Status Toko Real-Time dari Firebase Cloud
  async function syncStoreStatusFromCloud() {
    if (!STORE_CONFIG.firebaseUrl) return;
    try {
      const res = await fetch(`${STORE_CONFIG.firebaseUrl}/config.json`);
      const cloudConfig = await res.json();
      if (cloudConfig) {
        STORE_CONFIG.isOpen = cloudConfig.isOpen !== undefined ? cloudConfig.isOpen : STORE_CONFIG.isOpen;
        if (cloudConfig.hours) STORE_CONFIG.hours = cloudConfig.hours;
        if (cloudConfig.qrisUrl) STORE_CONFIG.qrisUrl = cloudConfig.qrisUrl;

        localStorage.setItem("RA_CONFIG", JSON.stringify(STORE_CONFIG));
        applyStoreStatus(STORE_CONFIG.isOpen, STORE_CONFIG.hours);
      }
    } catch (e) {
      console.warn("Gagal cek status toko:", e);
    }
  }

  // Pengecekan saat halaman dibuka dan diulang setiap 3 detik
  syncStoreStatusFromCloud();
  setInterval(syncStoreStatusFromCloud, 3000);

  const selDelivery = document.getElementById("sel-delivery-zone");
  if (selDelivery) {
    selDelivery.innerHTML = STORE_CONFIG.shippingZones.map(z => 
      `<option value="${z.fee}">${z.name} (+${formatRupiah(z.fee)})</option>`
    ).join("");
  }

  const searchBox = document.getElementById("search-box");
  if (searchBox) {
    searchBox.addEventListener("input", (e) => {
      document.getElementById("btn-clear-search").classList.toggle("hidden", e.target.value.length === 0);
      renderProducts();
    });
  }
}

window.setServiceType = function(type) {
  currentServiceType = type;
  document.getElementById("btn-type-dinein").className = type === 'dine_in' ? "flex-1 sm:flex-none px-4 py-2 rounded-2xl text-xs font-bold bg-brass text-noir-950 shadow transition" : "flex-1 sm:flex-none px-4 py-2 rounded-2xl text-xs font-bold bg-noir-900 text-stone-300 border border-brass/20";
  document.getElementById("btn-type-takeaway").className = type === 'takeaway' ? "flex-1 sm:flex-none px-4 py-2 rounded-2xl text-xs font-bold bg-brass text-noir-950 shadow transition" : "flex-1 sm:flex-none px-4 py-2 rounded-2xl text-xs font-bold bg-noir-900 text-stone-300 border border-brass/20";
  document.getElementById("btn-type-delivery").className = type === 'delivery' ? "flex-1 sm:flex-none px-4 py-2 rounded-2xl text-xs font-bold bg-brass text-noir-950 shadow transition" : "flex-1 sm:flex-none px-4 py-2 rounded-2xl text-xs font-bold bg-noir-900 text-stone-300 border border-brass/20";

  const indicator = document.getElementById("current-service-indicator");
  indicator.innerText = type === 'dine_in' ? "Makan di Tempat (Dine-In Meja)" : type === 'takeaway' ? "Bawa Pulang (Takeaway)" : "Antar ke Alamat (Delivery)";

  document.getElementById("box-input-table").classList.toggle("hidden", type !== "dine_in");
  document.getElementById("box-input-delivery").classList.toggle("hidden", type !== "delivery");
  document.getElementById("checkout-service-subtitle").innerText = `Layanan: ${indicator.innerText}`;
  recalculateTotals();
};

function renderCategories() {
  const cats = ["Semua", "Chef's Signature", ...new Set(PRODUCTS.map(p => p.category))];
  document.getElementById("filter-categories").innerHTML = cats.map(c => `
    <button onclick="selectCategory('${c.replace(/'/g, "\\'")}')" class="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
      activeCategory === c ? 'bg-brass text-noir-950 shadow' : 'bg-noir-800 text-stone-300 border border-brass/20 hover:border-brass'
    }">${c}</button>
  `).join("");
}

window.selectCategory = function(c) {
  activeCategory = c;
  renderCategories();
  renderProducts();
};

window.quickFilter = function(keyword) {
  if (keyword === 'best_seller') {
    activeCategory = "Chef's Signature";
  } else {
    document.getElementById("search-box").value = keyword;
    document.getElementById("btn-clear-search").classList.remove("hidden");
    activeCategory = "Semua";
  }
  renderCategories();
  renderProducts();
};

window.resetSearch = function() {
  document.getElementById("search-box").value = "";
  document.getElementById("btn-clear-search").classList.add("hidden");
  renderProducts();
};

function renderProducts() {
  const q = document.getElementById("search-box").value.toLowerCase().trim();
  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === "Semua" ? true : activeCategory === "★ Chef's Signature" ? p.isBestSeller : p.category === activeCategory;
    const matchQ = p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || (p.tags && p.tags.toLowerCase().includes(q));
    return matchCat && matchQ;
  });

  document.getElementById("lbl-catalog-count").innerText = `Showing ${filtered.length} Culinary Creations`;
  const grid = document.getElementById("product-grid");

  grid.innerHTML = filtered.map(p => `
    <div class="luxury-card rounded-3xl overflow-hidden flex flex-col justify-between">
      <div class="relative h-48 bg-noir-950 img-zoom-container">
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
        ${p.isBestSeller ? `<span class="absolute top-3 left-3 bg-brass text-noir-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow">★ Signature</span>` : ''}
        <span class="absolute bottom-2.5 right-3 bg-noir-950/85 text-brass border border-brass/30 text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm">${p.category}</span>
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h4 class="font-editorial font-bold text-xl text-white leading-snug">${p.name}</h4>
          <p class="text-xs text-stone-400 line-clamp-2 mt-1.5 font-light leading-relaxed">${p.desc}</p>
        </div>
        <div class="pt-3 border-t border-brass/15 flex items-center justify-between">
          <span class="font-mono font-bold text-sm text-brass">${formatRupiah(p.price)}</span>
          <button onclick="promptCustomization(${p.id})" class="bg-brass/15 hover:bg-brass text-brass hover:text-noir-950 border border-brass/40 text-xs font-extrabold px-4 py-2 rounded-full transition">
            + Select
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

window.promptCustomization = function(prodId) {
  const p = PRODUCTS.find(x => x.id === prodId);
  currentCustomizingProduct = p;
  document.getElementById("mod-cust-title").innerText = p.name;
  document.getElementById("mod-cust-price").innerText = formatRupiah(p.price);

  const isDrink = p.category === "Roastery & Elixirs";
  document.getElementById("group-opt-temp").classList.toggle("hidden", !isDrink);
  document.getElementById("opt-notes").value = "";

  document.getElementById("modal-item-custom").classList.remove("hidden");
};

window.closeCustomModal = function() {
  document.getElementById("modal-item-custom").classList.add("hidden");
};

window.commitCustomAddToCart = function() {
  const p = currentCustomizingProduct;
  const isDrink = p.category === "Roastery & Elixirs";
  const temp = isDrink ? document.querySelector('input[name="opt-temp"]:checked').value : "-";
  const sugar = document.querySelector('input[name="opt-sugar"]:checked').value;
  const notes = document.getElementById("opt-notes").value.trim();

  cart.push({
    cartItemId: Date.now() + Math.random(),
    productId: p.id,
    name: p.name,
    price: p.price,
    qty: 1,
    temp, sugar, notes
  });

  closeCustomModal();
  updateCartDisplay();
};

function updateCartDisplay() {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);

  document.getElementById("ui-cart-qty").innerText = totalQty;
  document.getElementById("ui-cart-total").innerText = formatRupiah(subtotal);
  document.getElementById("floating-bar").classList.toggle("hidden", totalQty === 0);
  recalculateTotals();
}

window.openCheckoutModal = function() {
  const list = document.getElementById("checkout-items-list");
  list.innerHTML = cart.map((item, idx) => `
    <div class="pt-2.5 flex justify-between items-start text-xs">
      <div>
        <p class="font-bold text-white">${item.name}</p>
        <p class="text-[10px] text-stone-400">${item.temp !== '-' ? item.temp + ' • ' : ''}${item.sugar} ${item.notes ? '(' + item.notes + ')' : ''}</p>
        <span class="font-mono text-brass">${formatRupiah(item.price)}</span>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="adjustCartItemQty(${idx}, -1)" class="w-6 h-6 bg-noir-900 border border-stone-700 rounded-lg font-bold text-white">-</button>
        <span class="font-bold text-xs text-white">${item.qty}</span>
        <button onclick="adjustCartItemQty(${idx}, 1)" class="w-6 h-6 bg-brass text-noir-950 rounded-lg font-bold">+</button>
      </div>
    </div>
  `).join("");

  document.getElementById("modal-checkout").classList.remove("hidden");
  recalculateTotals();
};

window.closeCheckoutModal = function() {
  document.getElementById("modal-checkout").classList.add("hidden");
};

window.adjustCartItemQty = function(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  if (cart.length === 0) closeCheckoutModal();
  updateCartDisplay();
  if (cart.length > 0) openCheckoutModal();
};

window.recalculateTotals = function() {
  const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  let fee = 0;
  if (currentServiceType === "delivery") {
    fee = Number(document.getElementById("sel-delivery-zone").value || 0);
  }

  const grandTotal = Math.max(0, subtotal - discountApplied + fee);

  document.getElementById("txt-subtotal").innerText = formatRupiah(subtotal);
  document.getElementById("txt-service-fee").innerText = formatRupiah(fee);
  document.getElementById("txt-discount").innerText = "-" + formatRupiah(discountApplied);
  document.getElementById("row-discount").classList.toggle("hidden", discountApplied === 0);
  document.getElementById("txt-grand-total").innerText = formatRupiah(grandTotal);

  return { subtotal, fee, grandTotal };
};

window.applyPromoCode = function() {
  const code = document.getElementById("inp-promo-code").value.trim().toUpperCase();
  const feedback = document.getElementById("msg-promo-feedback");
  feedback.classList.remove("hidden");

  if (STORE_CONFIG.promos[code]) {
    discountApplied = STORE_CONFIG.promos[code];
    feedback.innerText = `✓ Privilege Code ${code} Applied (-${formatRupiah(discountApplied)})`;
    feedback.className = "text-[10px] font-bold text-emerald-400";
  } else {
    discountApplied = 0;
    feedback.innerText = "✕ Kode voucher tidak valid.";
    feedback.className = "text-[10px] font-bold text-rose-400";
  }
  recalculateTotals();
};

window.launchPaymentGatewayModal = function() {
  if (!STORE_CONFIG.isOpen) return alert("Mohon maaf, restoran sedang tutup sementara.");

  const name = document.getElementById("inp-cust-name").value.trim();
  const phone = document.getElementById("inp-cust-phone").value.trim();
  const email = document.getElementById("inp-cust-email").value.trim();
  const table = document.getElementById("inp-table-no").value.trim();
  const address = document.getElementById("inp-deliv-address").value.trim();

  if (!name || !phone || !email) return alert("Mohon lengkapi Nama, Nomor WhatsApp, dan Email Anda.");
  if (currentServiceType === "dine_in" && !table) return alert("Mohon masukkan Nomor Meja Anda.");
  if (currentServiceType === "delivery" && !address) return alert("Mohon lengkapi Alamat Pengiriman.");

  const { grandTotal } = recalculateTotals();
  const method = document.querySelector('input[name="pay-method"]:checked').value;

  document.getElementById("pay-nominal-display").innerText = formatRupiah(grandTotal);
  document.getElementById("box-pay-qris").classList.toggle("hidden", method !== "qris");
  document.getElementById("box-pay-transfer").classList.toggle("hidden", method === "qris");
  document.getElementById("img-qris-target").src = STORE_CONFIG.qrisUrl;
  document.getElementById("bank-title-display").innerText = STORE_CONFIG.bankName;
  document.getElementById("bank-acc-display").innerText = STORE_CONFIG.bankNumber;
  document.getElementById("bank-holder-display").innerText = STORE_CONFIG.bankHolder;

  closeCheckoutModal();
  document.getElementById("modal-pay-gate").classList.remove("hidden");
};

window.closePayGateModal = function() {
  document.getElementById("modal-pay-gate").classList.add("hidden");
};

window.copyBankAcc = function() {
  navigator.clipboard.writeText(STORE_CONFIG.bankNumber);
  alert("Nomor rekening berhasil disalin!");
};

// PENGIRIMAN PESANAN MAKANAN KE LOKAL & CLOUD FIREBASE LENGKAP DENGAN BUKTI BAYAR
window.finalizeCustomerOrder = function() {
  const fileInput = document.getElementById("inp-receipt-file");
  const file = fileInput.files[0];
  if (!file) return alert("Mohon lampirkan screenshot bukti pembayaran Anda.");

  // Konversi Gambar Bukti Transfer ke Base64 agar tersimpan di Database
  const reader = new FileReader();
  reader.onload = function(e) {
    const receiptBase64 = e.target.result;

    const { subtotal, fee, grandTotal } = recalculateTotals();
    const table = document.getElementById("inp-table-no").value.trim();
    const address = document.getElementById("inp-deliv-address").value.trim();

    const newOrder = {
      orderId: "RA-" + Math.floor(1000 + Math.random() * 9000),
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      name: document.getElementById("inp-cust-name").value.trim(),
      phone: document.getElementById("inp-cust-phone").value.trim(),
      email: document.getElementById("inp-cust-email").value.trim(),
      serviceType: currentServiceType,
      serviceLocation: currentServiceType === 'dine_in' ? `Meja ${table}` : currentServiceType === 'takeaway' ? 'Takeaway' : `Antar: ${address}`,
      items: [...cart],
      subtotal, fee, discountApplied, grandTotal,
      paymentMethod: document.querySelector('input[name="pay-method"]:checked').value.toUpperCase(),
      receiptImage: receiptBase64, // <-- Bukti bayar tersimpan di sini
      status: "Menunggu Verifikasi"
    };

    // 1. Simpan Lokal Browser
    ORDERS.unshift(newOrder);
    localStorage.setItem("RA_ORDERS", JSON.stringify(ORDERS));

    // 2. Sinkronisasi ke Firebase Cloud Realtime
    if (STORE_CONFIG.firebaseUrl) {
      fetch(`${STORE_CONFIG.firebaseUrl}/orders.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
      }).catch(err => console.error("Firebase Order Sync Error:", err));
    }

    closePayGateModal();
    document.getElementById("succ-modal-heading").innerText = "Order Received by Kitchen";
    document.getElementById("lbl-success-order-id").innerText = `#${newOrder.orderId}`;
    document.getElementById("lbl-success-location").innerText = newOrder.serviceLocation;
    document.getElementById("modal-success").classList.remove("hidden");

    cart = [];
    updateCartDisplay();
  };

  reader.readAsDataURL(file);
};

// PENGIRIMAN RESERVASI MEJA KE LOKAL & CLOUD FIREBASE
window.submitTableReservation = function(e) {
  e.preventDefault();
  if (!STORE_CONFIG.isOpen) return alert("Mohon maaf, reservasi sedang ditutup sementara.");

  const rsv = {
    rsvId: "RSV-" + Math.floor(1000 + Math.random() * 9000),
    createdAt: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    name: document.getElementById("res-name").value.trim(),
    phone: document.getElementById("res-phone").value.trim(),
    email: document.getElementById("res-email").value.trim(),
    date: document.getElementById("res-date").value,
    time: document.getElementById("res-time").value,
    guests: document.getElementById("res-guests").value,
    area: document.getElementById("res-area").value,
    notes: document.getElementById("res-notes").value.trim() || "-",
    status: "Terjadwal"
  };

  // Simpan Lokal
  RESERVATIONS.unshift(rsv);
  localStorage.setItem("RA_RESERVATIONS", JSON.stringify(RESERVATIONS));

  // Sinkronisasi ke Firebase Cloud Realtime
  if (STORE_CONFIG.firebaseUrl) {
    fetch(`${STORE_CONFIG.firebaseUrl}/reservations.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rsv)
    }).catch(err => console.error("Firebase Reservation Sync Error:", err));
  }

  e.target.reset();
  document.getElementById("succ-modal-heading").innerText = "Table Reservation Confirmed";
  document.getElementById("lbl-success-order-id").innerText = `#${rsv.rsvId}`;
  document.getElementById("lbl-success-location").innerText = `${rsv.area} (${rsv.guests})`;
  document.getElementById("lbl-live-order-status").innerText = `${rsv.date} • ${rsv.time}`;
  document.getElementById("modal-success").classList.remove("hidden");
};

window.closeSuccessModal = function() {
  document.getElementById("modal-success").classList.add("hidden");
};