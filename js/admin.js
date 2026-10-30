let STORE_CONFIG = JSON.parse(localStorage.getItem("RA_CONFIG")) || {
  name: "APRIANSYAH",
  hours: "Open Daily: 08:00 — 23:00 WIB",
  isOpen: true,
  adminPin: "220408",
  firebaseUrl: "https://apriansyah-pos-default-rtdb.asia-southeast1.firebasedatabase.app",
  qrisUrl: "https://i.ibb.co.com/hFtPJRKh/QRIS-DANA-BISNIS-Salin.jpg",
  bankName: "BCA (Bank Central Asia)",
  bankNumber: "8415-2910-29",
  bankHolder: "Riski Apriansyah"
};

let PRODUCTS = JSON.parse(localStorage.getItem("RA_PRODUCTS")) || [];
let ORDERS = JSON.parse(localStorage.getItem("RA_ORDERS")) || [];
let RESERVATIONS = JSON.parse(localStorage.getItem("RA_RESERVATIONS")) || [];

// Filter status antrean yang aktif saat ini
let currentStatusFilter = "ALL";

const formatRupiah = (n) => "Rp" + Number(n).toLocaleString("id-ID");

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  updateClock();
  setInterval(updateClock, 1000);
  checkAdminSession();
});

function updateClock() {
  const now = new Date();
  document.getElementById("live-clock").innerText = now.toLocaleDateString("id-ID", { weekday: 'long', hour: '2-digit', minute: '2-digit' }) + " WIB";
}

function checkAdminSession() {
  document.getElementById("admin-lock-screen").classList.remove("hidden");
  document.getElementById("admin-main-screen").classList.add("hidden");
}

window.verifyAdminPin = function() {
  const pin = document.getElementById("inp-admin-pin").value.trim();
  if (pin === STORE_CONFIG.adminPin) {
    showDashboard();
  } else {
    alert("PIN Tidak Valid! (Gunakan PIN Anda: 220408)");
  }
};

window.logoutAdmin = function() {
  const pinInput = document.getElementById("inp-admin-pin");
  if (pinInput) pinInput.value = "";
  document.getElementById("admin-lock-screen").classList.remove("hidden");
  document.getElementById("admin-main-screen").classList.add("hidden");
  window.location.href = "index.html";
};

// GANTI FILTER STATUS KATEGORI ANTREAN
window.setOrderStatusFilter = function(status) {
  currentStatusFilter = status;

  // Update styling tombol tab filter
  const filterKeys = ["ALL", "Menunggu Verifikasi", "Dimasak Chef / Barista", "Siap Disajikan", "Selesai", "Archived"];
  filterKeys.forEach(k => {
    const btn = document.getElementById(`filter-pill-${k}`);
    if (btn) {
      if (k === status) {
        btn.className = "px-3 py-1.5 rounded-xl text-xs font-black bg-amber-500 text-slate-950 shadow whitespace-nowrap";
      } else {
        btn.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:text-white whitespace-nowrap";
      }
    }
  });

  renderKDS();
};

// Variabel untuk melacak apakah staf sedang membuka dropdown status
let isDropdownActive = false;

function showDashboard() {
  document.getElementById("admin-lock-screen").classList.add("hidden");
  document.getElementById("admin-main-screen").classList.remove("hidden");
  renderKDS();
  renderReservations();
  renderAdminProducts();
  loadSettings();

  // Polling pintar: Tidak akan merender ulang jika staf sedang mengklik dropdown
  async function fetchCloudData() {
    if (!STORE_CONFIG.firebaseUrl || isDropdownActive) return;

    try {
      // 1. Sinkronisasi Orders
      const resOrders = await fetch(`${STORE_CONFIG.firebaseUrl}/orders.json`);
      const dataOrders = await resOrders.json();
      if (dataOrders) {
        const cloudOrdersList = Object.keys(dataOrders).map(key => ({
          firebaseKey: key,
          ...dataOrders[key]
        })).reverse();

        // Bandingkan apakah ada data baru sebelum me-render ulang
        const hasNewOrder = cloudOrdersList.length > ORDERS.length;
        const isDataDifferent = JSON.stringify(cloudOrdersList) !== JSON.stringify(ORDERS);

        if (hasNewOrder) {
          playBeep(); // Bunyi notifikasi jika ada pesanan baru masuk
        }

        if (isDataDifferent) {
          ORDERS = cloudOrdersList;
          localStorage.setItem("RA_ORDERS", JSON.stringify(ORDERS));
          renderKDS();
        }
      }

      // 2. Sinkronisasi Reservations
      const resRsv = await fetch(`${STORE_CONFIG.firebaseUrl}/reservations.json`);
      const dataRsv = await resRsv.json();
      if (dataRsv) {
        const cloudRsvList = Object.keys(dataRsv).map(key => ({
          firebaseKey: key,
          ...dataRsv[key]
        })).reverse();

        if (cloudRsvList.length > RESERVATIONS.length) {
          playBeep();
        }

        if (JSON.stringify(cloudRsvList) !== JSON.stringify(RESERVATIONS)) {
          RESERVATIONS = cloudRsvList;
          localStorage.setItem("RA_RESERVATIONS", JSON.stringify(RESERVATIONS));
          renderReservations();
        }
      }
    } catch (e) {
      console.warn("Sinkronisasi Firebase offline/gagal:", e);
    }
  }

  fetchCloudData();
  setInterval(fetchCloudData, 2500);
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.connect(ctx.destination);
    osc.frequency.setValueAtTime(784, ctx.currentTime);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {}
}

window.switchTab = function(t) {
  ["orders", "reservations", "menus", "settings"].forEach(tab => {
    document.getElementById(`view-tab-${tab}`).classList.toggle("hidden", tab !== t);
    document.getElementById(`tab-${tab}`).className = tab === t 
      ? "px-4 py-2 font-black text-xs bg-amber-500 text-slate-950 rounded-xl whitespace-nowrap"
      : "px-4 py-2 font-bold text-xs bg-slate-900 text-slate-300 rounded-xl hover:bg-slate-800 whitespace-nowrap";
  });
};

function renderKDS() {
  // Hitung jumlah aktif (kecuali yang selesai dan diarsipkan)
  const activeOrders = ORDERS.filter(o => o.status !== 'Selesai' && o.status !== 'Archived');
  document.getElementById("kds-stat-active").innerText = activeOrders.length;
  document.getElementById("kds-stat-res").innerText = RESERVATIONS.length;
  
  // Total omzet HANYA dihitung dari pesanan yang sudah berstatus 'Selesai'
  const completedOrders = ORDERS.filter(o => o.status === 'Selesai');
  const totalOmzet = completedOrders.reduce((s, o) => s + (o.grandTotal || 0), 0);
  document.getElementById("kds-stat-omzet").innerText = formatRupiah(totalOmzet);

  const container = document.getElementById("kds-orders-container");

  // Filter pesanan sesuai tab aktif
  let filtered = ORDERS;
  if (currentStatusFilter === "ALL") {
    filtered = ORDERS.filter(o => o.status !== 'Archived');
  } else if (currentStatusFilter === "Archived") {
    filtered = ORDERS.filter(o => o.status === 'Archived');
  } else {
    filtered = ORDERS.filter(o => o.status === currentStatusFilter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="col-span-full py-16 text-center text-slate-500 text-xs">Tidak ada pesanan di kategori "${currentStatusFilter}".</div>`;
    return;
  }

  container.innerHTML = filtered.map(o => {
    const originalIndex = ORDERS.findIndex(x => x.orderId === o.orderId);

    return `
      <div class="bg-slate-900 border ${o.status === 'Selesai' ? 'border-slate-800 opacity-60' : o.status === 'Archived' ? 'border-stone-800 opacity-50 bg-slate-950' : 'border-amber-500/40'} rounded-2xl p-4 flex flex-col justify-between shadow-xl space-y-3">
        <div>
          <div class="flex justify-between items-center border-b border-slate-800 pb-2">
            <div>
              <span class="font-mono font-black text-amber-400 text-sm">#${o.orderId}</span>
              <span class="text-[10px] text-slate-400 block">${o.timestamp} WIB</span>
            </div>
            <span class="bg-slate-800 text-amber-300 font-extrabold px-2.5 py-1 rounded-lg text-xs">${o.serviceLocation}</span>
          </div>

          <div class="pt-2 text-xs space-y-1">
            <p class="font-bold text-white">${o.name}</p>
            <p class="text-[11px] text-slate-400">WA: <a href="https://wa.me/${o.phone}" target="_blank" class="text-emerald-400 underline font-bold">${o.phone}</a></p>
            <p class="text-[11px] text-slate-400">Email: ${o.email || '-'}</p>
            
            ${o.receiptImage ? `
              <div class="pt-1.5">
                <button onclick="openReceiptModal('${o.orderId}')" class="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold py-1.5 px-2 rounded-xl text-[10px] flex items-center justify-center gap-1 transition">
                  <i data-lucide="image" class="w-3.5 h-3.5"></i>
                  <span>Lihat Bukti Transfer</span>
                </button>
              </div>
            ` : ''}

            <div class="py-2 divide-y divide-slate-800">
              ${o.items.map(it => `
                <div class="py-1 flex justify-between">
                  <div>
                    <span class="font-bold text-white">${it.name}</span>
                    <p class="text-[10px] text-slate-400">${it.temp !== '-' ? it.temp + ' • ' : ''}${it.sugar} ${it.notes ? '(' + it.notes + ')' : ''}</p>
                  </div>
                  <strong class="text-amber-400 font-black">${it.qty}x</strong>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="pt-2 border-t border-slate-800 space-y-2">
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-400">Total:</span>
            <span class="font-black text-emerald-400">${formatRupiah(o.grandTotal)} (${o.paymentMethod})</span>
          </div>

          <!-- Dropdown Status: Dilengkapi onfocus dan onblur agar tidak terputus saat dipilih -->
          <select 
            onfocus="isDropdownActive = true" 
            onblur="isDropdownActive = false"
            onchange="isDropdownActive = false; updateOrderStatus('${o.orderId}', this.value)" 
            class="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white cursor-pointer focus:ring-2 focus:ring-amber-500 focus:outline-none">
            <option value="Menunggu Verifikasi" ${o.status === 'Menunggu Verifikasi' ? 'selected' : ''}>⏳ Menunggu Verifikasi</option>
            <option value="Dimasak Chef / Barista" ${o.status === 'Dimasak Chef / Barista' ? 'selected' : ''}>🔥 Dimasak Chef / Barista</option>
            <option value="Siap Disajikan" ${o.status === 'Siap Disajikan' ? 'selected' : ''}>🔔 Siap Disajikan</option>
            <option value="Selesai" ${o.status === 'Selesai' ? 'selected' : ''}>✅ Selesai</option>
            <option value="Archived" ${o.status === 'Archived' ? 'selected' : ''}>🗄️ Arsipkan (Riwayat)</option>
          </select>

          <div class="flex gap-2">
            <button onclick="printThermal(${originalIndex})" class="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-xl text-[11px] flex items-center justify-center gap-1">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i> Struk 58mm
            </button>
            <button onclick="archiveOrder('${o.orderId}')" title="Sembunyikan dari antrean aktif (Tersimpan Permanen)" class="px-3 bg-rose-950/60 text-rose-400 hover:bg-rose-900 rounded-xl font-bold text-xs flex items-center justify-center">
              ✕
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}

// UBAH STATUS ORDER & SINKRONKAN LANGSUNG KE FIREBASE
window.updateOrderStatus = function(orderId, newStatus) {
  const idx = ORDERS.findIndex(x => x.orderId === orderId);
  if (idx === -1) return;

  // 1. Update data lokal langsung
  ORDERS[idx].status = newStatus;
  localStorage.setItem("RA_ORDERS", JSON.stringify(ORDERS));

  // 2. Kirim update ke Firebase
  const order = ORDERS[idx];
  if (STORE_CONFIG.firebaseUrl && order.firebaseKey) {
    fetch(`${STORE_CONFIG.firebaseUrl}/orders/${order.firebaseKey}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    }).catch(err => console.error("Update status cloud error:", err));
  }

  // 3. Render ulang tampilan
  renderKDS();
};

// TOMBOL X: ARSIPKAN DARI ANTREAN AKTIF (TETAP TERSIMPAN DI RIWAYAT DAN FIREBASE)
window.archiveOrder = function(orderId) {
  if (confirm("Pindahkan pesanan ini ke Arsip Riwayat? (Data omzet & bukti transfer tetap tersimpan permanen)")) {
    updateOrderStatus(orderId, "Archived");
  }
};

// POP-UP LIHAT BUKTI TRANSFER (IN-APP DENGAN TOMBOL KEMBALI)
window.openReceiptModal = function(orderId) {
  const order = ORDERS.find(x => x.orderId === orderId);
  if (!order || !order.receiptImage) return alert("Bukti transfer tidak ditemukan.");

  document.getElementById("m-receipt-title").innerText = `Bukti Transfer #${order.orderId}`;
  document.getElementById("m-receipt-subtitle").innerText = `${order.name} • Total ${formatRupiah(order.grandTotal)} (${order.paymentMethod})`;
  document.getElementById("m-receipt-img").src = order.receiptImage;
  document.getElementById("modal-view-receipt").classList.remove("hidden");
  lucide.createIcons();
};

window.closeReceiptModal = function() {
  document.getElementById("modal-view-receipt").classList.add("hidden");
};

// CETAK STRUK THERMAL 58MM
window.printThermal = function(idx) {
  const o = ORDERS[idx];
  if (!o) return;

  document.getElementById("prn-time").innerText = `${new Date().toLocaleDateString("id-ID")} ${o.timestamp}`;
  document.getElementById("prn-order-id").innerText = `#${o.orderId}`;
  document.getElementById("prn-location").innerText = o.serviceLocation.toUpperCase();
  document.getElementById("prn-cust-name").innerText = o.name;
  document.getElementById("prn-cust-phone").innerText = o.phone;
  document.getElementById("prn-cust-email").innerText = o.email || "-";
  document.getElementById("prn-cust-notes").innerText = o.items.map(i => i.notes).filter(Boolean).join(", ") || "-";

  document.getElementById("prn-items-body").innerHTML = o.items.map(it => `
    <tr>
      <td style="padding: 2px 0;">${it.name}</td>
      <td style="text-align: center;">${it.qty}x</td>
      <td style="text-align: right;">${formatRupiah(it.price * it.qty)}</td>
    </tr>
  `).join("");

  document.getElementById("prn-subtotal").innerText = formatRupiah(o.subtotal);
  document.getElementById("prn-discount").innerText = "-" + formatRupiah(o.discountApplied || 0);
  document.getElementById("prn-total").innerText = formatRupiah(o.grandTotal);

  window.print();
};

window.exportOrdersToCSV = function() {
  if (ORDERS.length === 0) return alert("Belum ada data pesanan.");
  
  // Hitung ringkasan omzet pesanan selesai
  const omzetSelesai = ORDERS
    .filter(o => o.status === 'Selesai')
    .reduce((s, o) => s + (o.grandTotal || 0), 0);

  let csv = "Order ID,Jam,Lokasi,Nama,WA,Email,Total,Status\n";
  ORDERS.forEach(o => {
    csv += `"${o.orderId}","${o.timestamp}","${o.serviceLocation}","${o.name}","${o.phone}","${o.email}",${o.grandTotal},"${o.status}"\n`;
  });

  csv += `\n"TOTAL OMZET SELESAI",,,,,,"${omzetSelesai}","VALID"\n`;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Laporan-Omzet-Apriansyah-${new Date().toLocaleDateString("id-ID")}.csv`;
  a.click();
};

// RENDER RESERVASI MEJA
function renderReservations() {
  const container = document.getElementById("kds-reservations-container");
  if (RESERVATIONS.length === 0) {
    container.innerHTML = `<div class="col-span-full py-16 text-center text-slate-500 text-xs">Belum ada jadwal reservasi meja.</div>`;
    return;
  }

  container.innerHTML = RESERVATIONS.map((r, idx) => `
    <div class="bg-slate-900 border border-sky-500/30 rounded-2xl p-4 space-y-2 text-xs">
      <div class="flex justify-between items-center border-b border-slate-800 pb-2">
        <span class="font-mono font-black text-sky-400 text-sm">#${r.rsvId}</span>
        <span class="bg-sky-500/20 text-sky-300 font-bold px-2.5 py-0.5 rounded-full text-[10px]">${r.area}</span>
      </div>
      <p class="font-bold text-white text-sm">${r.name} (${r.guests})</p>
      <p class="text-amber-300 font-bold">📅 ${r.date} • Pukul ${r.time}</p>
      <p class="text-slate-400">WA: <a href="https://wa.me/${r.phone}" target="_blank" class="text-emerald-400 underline">${r.phone}</a> | ${r.email}</p>
      <p class="text-slate-300 italic">Catatan: "${r.notes}"</p>
      <div class="pt-2 flex justify-end">
        <button onclick="deleteReservation(${idx})" class="text-rose-400 font-bold text-[11px]">Hapus Reservasi</button>
      </div>
    </div>
  `).join("");
}

window.deleteReservation = function(idx) {
  if (confirm("Hapus jadwal reservasi ini?")) {
    RESERVATIONS.splice(idx, 1);
    localStorage.setItem("RA_RESERVATIONS", JSON.stringify(RESERVATIONS));
    renderReservations();
    renderKDS();
  }
};

// CRUD DAFTAR MENU
function renderAdminProducts() {
  document.getElementById("admin-product-table").innerHTML = PRODUCTS.map(p => `
    <div class="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between items-center text-xs">
      <div class="flex items-center gap-3">
        <img src="${p.image}" class="w-12 h-12 rounded-xl object-cover">
        <div>
          <p class="font-bold text-white">${p.name} ${p.isBestSeller ? '★' : ''}</p>
          <p class="text-slate-400">${p.category} • <strong class="text-amber-400">${formatRupiah(p.price)}</strong></p>
        </div>
      </div>
      <div class="flex gap-2">
        <button onclick="editProd(${p.id})" class="bg-slate-800 text-amber-400 font-bold px-3 py-1.5 rounded-xl">Edit</button>
        <button onclick="deleteProd(${p.id})" class="text-rose-400 px-2 py-1.5 font-bold">Hapus</button>
      </div>
    </div>
  `).join("");
}

window.saveProductData = function() {
  const id = document.getElementById("edit-prod-id").value;
  const name = document.getElementById("inp-prod-name").value.trim();
  const category = document.getElementById("inp-prod-cat").value.trim() || "Apriansyah Signatures";
  const price = Number(document.getElementById("inp-prod-price").value);
  const image = document.getElementById("inp-prod-img").value.trim() || "https://images.unsplash.com/photo-1544025162-d76694265947?w=600";
  const tags = document.getElementById("inp-prod-tags").value.trim();
  const desc = document.getElementById("inp-prod-desc").value.trim();
  const isBestSeller = document.getElementById("inp-prod-bestseller").checked;

  if (!name || !price) return alert("Nama dan Harga wajib diisi!");

  if (id) {
    const idx = PRODUCTS.findIndex(x => x.id == id);
    PRODUCTS[idx] = { ...PRODUCTS[idx], name, category, price, image, tags, desc, isBestSeller };
  } else {
    PRODUCTS.unshift({ id: Date.now(), name, category, price, image, tags, desc, isBestSeller });
  }

  localStorage.setItem("RA_PRODUCTS", JSON.stringify(PRODUCTS));
  resetMenuForm();
  renderAdminProducts();
  alert("Hidangan berhasil disimpan!");
};

window.editProd = function(id) {
  const p = PRODUCTS.find(x => x.id == id);
  document.getElementById("form-menu-mode").innerText = `✏️ Edit: ${p.name}`;
  document.getElementById("edit-prod-id").value = p.id;
  document.getElementById("inp-prod-name").value = p.name;
  document.getElementById("inp-prod-cat").value = p.category;
  document.getElementById("inp-prod-price").value = p.price;
  document.getElementById("inp-prod-img").value = p.image;
  document.getElementById("inp-prod-tags").value = p.tags || "";
  document.getElementById("inp-prod-desc").value = p.desc || "";
  document.getElementById("inp-prod-bestseller").checked = !!p.isBestSeller;
};

window.resetMenuForm = function() {
  document.getElementById("form-menu-mode").innerText = "➕ Tambah Hidangan Baru";
  document.getElementById("edit-prod-id").value = "";
  document.getElementById("inp-prod-name").value = "";
  document.getElementById("inp-prod-cat").value = "";
  document.getElementById("inp-prod-price").value = "";
  document.getElementById("inp-prod-img").value = "";
  document.getElementById("inp-prod-tags").value = "";
  document.getElementById("inp-prod-desc").value = "";
  document.getElementById("inp-prod-bestseller").checked = false;
};

window.deleteProd = function(id) {
  if (confirm("Hapus hidangan ini?")) {
    PRODUCTS = PRODUCTS.filter(x => x.id != id);
    localStorage.setItem("RA_PRODUCTS", JSON.stringify(PRODUCTS));
    renderAdminProducts();
  }
};

function loadSettings() {
  document.getElementById("set-store-status").value = String(STORE_CONFIG.isOpen);
  document.getElementById("set-store-hours").value = STORE_CONFIG.hours;
  document.getElementById("set-qris-image").value = STORE_CONFIG.qrisUrl;
  document.getElementById("set-bank-name").value = STORE_CONFIG.bankName;
  document.getElementById("set-bank-acc").value = STORE_CONFIG.bankNumber;
  document.getElementById("set-admin-pin").value = STORE_CONFIG.adminPin;
}

window.saveAdminSettings = async function() {
  const newIsOpen = document.getElementById("set-store-status").value === "true";
  const newHours = document.getElementById("set-store-hours").value.trim();
  const newQris = document.getElementById("set-qris-image").value.trim();
  const newBankName = document.getElementById("set-bank-name").value.trim();
  const newBankNumber = document.getElementById("set-bank-acc").value.trim();
  const newPin = document.getElementById("set-admin-pin").value.trim() || "220408";

  STORE_CONFIG.isOpen = newIsOpen;
  STORE_CONFIG.hours = newHours;
  STORE_CONFIG.qrisUrl = newQris;
  STORE_CONFIG.bankName = newBankName;
  STORE_CONFIG.bankNumber = newBankNumber;
  STORE_CONFIG.adminPin = newPin;

  // 1. Simpan di Lokal
  localStorage.setItem("RA_CONFIG", JSON.stringify(STORE_CONFIG));

  // 2. SINKRONKAN STATUS & JAM KE FIREBASE CLOUD
  if (STORE_CONFIG.firebaseUrl) {
    try {
      await fetch(`${STORE_CONFIG.firebaseUrl}/config.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isOpen: newIsOpen,
          hours: newHours,
          qrisUrl: newQris,
          bankName: newBankName,
          bankNumber: newBankNumber
        })
      });
      alert("Pengaturan & Status Toko berhasil diperbarui ke Cloud Firebase!");
    } catch (err) {
      console.error("Gagal sinkron status toko ke cloud:", err);
      alert("Pengaturan tersimpan lokal, namun gagal terhubung ke Firebase.");
    }
  } else {
    alert("Pengaturan berhasil disimpan di perangkat ini!");
  }
};