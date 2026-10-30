# 📖 BUKU PANDUAN INDUK (MASTER MANUAL)
## Sistem Website Restoran, Kafe & Smart POS — APRIANSYAH Edition

Dokumen ini adalah panduan lengkap dari akar hingga ujung untuk memahami fungsi, lokasi kode, dan cara mengedit seluruh bagian website ketika Anda ingin menyesuaikannya untuk klien UMKM/Restoran baru.

---

## 🗂️ BAGIAN 1: STRUKTUR FOLDER & FUNGSI SETIAP FILE

Setiap file memiliki tugas spesifik agar kode rapi dan tidak saling tumpang tindih:

```text
📁 cafe-pos-enterprise/
 ├── 📄 index.html       --> [HALAMAN DEPAN] Tampilan utama untuk pelanggan (Hero, Cerita, Katalog Menu, Keranjang, Form Reservasi Meja, & Pop-up Bayar).
 ├── 📄 admin.html       --> [HALAMAN BELAKANG] Tampilan khusus Kasir & Dapur (Login PIN, Monitor Pesanan Masuk, Jadwal Reservasi, Edit Menu, & Struk 58mm).
 ├── 📁 css/
 │    └── 📄 style.css   --> [DESAIN & CETAK] Mengatur font mewah, warna dasar, efek kaca (glassmorphism), animasi zoom gambar, dan ukuran kertas struk kasir.
 ├── 📁 js/
 │    ├── 📄 app.js      --> [OTAK PELANGGAN] Menyimpan daftar 18 menu awal, konfigurasi nomor rekening/QRIS, kode voucher, hitung ongkir, dan keranjang belanja.
 │    └── 📄 admin.js    --> [OTAK KASIR] Mengatur kunci PIN admin, bunyi "beep" saat ada orderan baru, ubah status masakan, cetak struk, dan download Excel (CSV).
 └── 📄 README.md        --> [PANDUAN] Dokumen petunjuk penggunaan dan pengeditan ini.

 BAGIAN 2: DAFTAR LENGKAP FITUR & LOKASI FUNGSINYA
Berikut adalah peta fitur yang ada di dalam website beserta letak kodenya:

A. Fitur Halaman Pelanggan (index.html + js/app.js)
Indikator Status Buka/Tutup Real-Time:

Fungsi: Menampilkan badge hijau OPEN atau merah CLOSED. Jika status CLOSED, pelanggan tetap bisa lihat menu tapi tidak bisa klik bayar/reservasi.

Lokasi: Diatur oleh fungsi setupUI() di js/app.js dan ditampilkan di <header> pada index.html.

Pemilih 3 Mode Layanan (Dine-In Meja, Takeaway, Delivery):

Fungsi: Jika pilih Dine-In, muncul kolom wajib isi Nomor Meja (Ongkir Rp0). Jika pilih Takeaway, tanpa meja & tanpa ongkir. Jika pilih Delivery, muncul pilihan Zona Kecamatan Ongkir dan kolom Alamat Lengkap.

Lokasi: Fungsi setServiceType() di js/app.js.

Mesin Pencari Pintar & Filter Kategori:

Fungsi: Mencari menu berdasarkan nama, deskripsi, atau kata kunci tersembunyi (tags). Tombol kategori dibuat otomatis mengikuti kategori produk yang ada.

Lokasi: Fungsi renderCategories() dan renderProducts() di js/app.js.

Pop-up Kustomisasi Menu (Suhu, Gula, Catatan):

Fungsi: Saat klik + Select pada menu minuman (Roastery & Elixirs), muncul pilihan Es/Panas dan Level Gula. Jika menu makanan, pilihan Es/Panas otomatis disembunyikan dan hanya menyisakan pilihan rasa/catatan koki.

Lokasi: Fungsi promptCustomization() di js/app.js dan #modal-item-custom di index.html.

Sistem Kode Voucher Diskon:

Fungsi: Memotong total belanja secara otomatis jika pelanggan mengetik kode promo yang benar (contoh: RISKI15).

Lokasi: Objek promos dan fungsi applyPromoCode() di js/app.js.

Payment Gateway Non-Tunai (QRIS & Transfer Bank + Upload Bukti):

Fungsi: Menampilkan nominal tagihan pas, gambar barcode QRIS, nomor rekening dengan tombol Salin, serta mewajibkan pembeli mengunggah foto bukti transfer sebelum pesanan masuk ke dapur.

Lokasi: #modal-pay-gate di index.html dan fungsi launchPaymentGatewayModal() serta finalizeCustomerOrder() di js/app.js.

Formulir Reservasi Meja VIP (Book a Table):

Fungsi: Memungkinkan tamu memesan tempat duduk untuk tanggal, jam, jumlah orang (Pax), dan area ruangan tertentu tanpa harus memesan makanan terlebih dahulu.

Lokasi: <section id="reservation-section"> di index.html dan fungsi submitTableReservation() di js/app.js.

B. Fitur Halaman Admin & Kasir (admin.html + js/admin.js)
Keamanan Login PIN Staf:

Fungsi: Mengunci halaman admin.html agar pelanggan biasa tidak bisa masuk. PIN bawaan adalah 123456.

Lokasi: Fungsi verifyAdminPin() di js/admin.js.

Monitor Dapur Real-Time (KDS) + Audio Alert:

Fungsi: Mengecek pesanan baru setiap 2 detik secara otomatis. Jika ada pesanan atau reservasi baru masuk, layar kasir akan mengeluarkan bunyi "Beep!" dan menampilkan kartu pesanan.

Lokasi: Fungsi showDashboard() dan playBeep() di js/admin.js.

Pengubah Status Pesanan:

Fungsi: Staf bisa mengubah status dari ⏳ Menunggu Verifikasi 
→ 🔥 Dimasak Chef / Barista 
→ 🔔 Siap Disajikan 
→ ✅ Selesai.

Lokasi: Fungsi updateOrderStatus() di js/admin.js.

Cetak Struk Kasir Thermal 58mm:

Fungsi: Mencetak struk belanja dengan ukuran pas untuk printer kasir Bluetooth/USB ukuran kertas 58mm atau 80mm.

Lokasi: Fungsi printThermal() di js/admin.js dan blok @media print di css/style.css.

Download Laporan Penjualan ke Excel (CSV):

Fungsi: Mengunduh seluruh riwayat pesanan dan omzet menjadi file tabel .csv yang bisa dibuka di Microsoft Excel atau Google Sheets.

Lokasi: Fungsi exportOrdersToCSV() di js/admin.js.

Manajemen Menu Tanpa Koding (CRUD):

Fungsi: Menambah menu baru, mengedit harga, mengganti foto, atau menghapus menu langsung dari layar admin.

Lokasi: Tab 🍲 Kelola Menu & Harga di admin.html dan fungsi saveProductData() di js/admin.js.

✏️ BAGIAN 3: PANDUAN CARA MENGEDIT DARI AWAL SAMPAI AKHIR
Saat Anda mendapatkan klien baru (misalnya kafe bernama "Kopi Senja"), ikuti urutan langkah di bawah ini menggunakan VS Code:

Langkah 1: Mengubah Nama Restoran, Slogan, dan Alamat (index.html)
Buka file index.html, lalu tekan Ctrl + F untuk mencari dan mengubah bagian berikut:

Judul Tab Browser (Baris 6):
Ubah teks di dalam <title>APRIANSYAH — ...</title> menjadi nama toko klien.

Logo Inisial & Nama di Navbar Atas (Baris 29–35):

Ubah huruf RA menjadi inisial toko klien (misal: KS).

Ubah APRIANSYAH dan By Riski Apriansyah menjadi nama brand klien.

Gambar Background Hero Utama (Baris 58):
Ganti URL di dalam <img src="https://images.unsplash.com/..." dengan link foto interior toko klien.

Judul Besar & Deskripsi di Hero (Baris 69–76):
Ubah kalimat "A Culinary Tale Crafted by Riski Apriansyah" dan deskripsi di bawahnya sesuai konsep kafe klien.

Alamat Toko (Baris 88 & Baris 435):
Ganti teks 📍 Grand Heritage Boulevard No. 88 dengan alamat asli toko klien.

Cerita Founder / Tentang Kami (Baris 96–134):

Ganti foto di baris 99 dengan foto pemilik usaha atau foto produk andalan.

Ubah teks cerita paragraf di baris 112–118.

Langkah 2: Mengubah Rekening Bank, QRIS, Ongkir & Kode Promo (js/app.js)
Buka file js/app.js, lihat bagian paling atas pada blok DEFAULT_STORE (Baris 2–20):

JavaScript
const DEFAULT_STORE = {
  name: "APRIANSYAH",                    // 1. Ganti nama toko untuk struk kasir
  founder: "Riski Apriansyah",           // 2. Ganti nama pemilik
  hours: "Open Daily: 08:00 — 23:00 WIB",// 3. Ganti jam buka
  isOpen: true,                          // 4. true = Buka, false = Tutup
  adminPin: "123456",                    // 5. Ganti PIN rahasia untuk login admin.html
  qrisUrl: "[https://link-qris.jpg](https://link-qris.jpg)",      // 6. Tempel link gambar barcode QRIS asli klien
  bankName: "BCA (Bank Central Asia)",   // 7. Ganti nama bank klien
  bankNumber: "8415-2910-29",            // 8. Ganti nomor rekening klien
  bankHolder: "Riski Apriansyah",        // 9. Ganti nama pemilik rekening
  shippingZones: [                       // 10. Atur daftar kecamatan & harga ongkirnya
    { name: "Zona Dekat (< 3 km)", fee: 8000 },
    { name: "Dalam Kota (3 - 8 km)", fee: 15000 },
    { name: "Area Luar (> 8 km)", fee: 25000 }
  ],
  promos: {                              // 11. Atur kode voucher diskon & nominal potongannya
    "RISKI15": 15000,
    "APRIANSYAHVIP": 25000
  }
};
💡 Cara Mengubah Foto QRIS:
Minta foto barcode QRIS dari klien Anda 
→ Unggah foto tersebut ke situs gratis postimages.org 
→ Salin link pada kolom Direct Link (yang berakhiran .jpg atau .png) 
→ Tempelkan ke bagian qrisUrl.

Langkah 3: Mengubah Daftar Menu, Harga & Foto Produk (js/app.js)
Masih di dalam file js/app.js, gulir ke bawah ke bagian DEFAULT_PRODUCTS (Baris 23–85).

Setiap 1 produk diwakili oleh 1 blok kurung kurawal { ... } seperti ini:

JavaScript
{ 
  id: 1,                                         // Nomor urut unik (jangan ada angka yang sama)
  name: "Apriansyah Wagyu Brisket",              // Nama makanan/minuman
  category: "Apriansyah Signatures",             // Nama Kategori (Otomatis jadi tombol filter di web)
  price: 85000,                                  // Harga (Tulis angka saja TANPA titik atau Rp)
  isBestSeller: true,                            // true = Muncul bintang ★ Signature, false = Biasa
  image: "[https://link-foto-makanan.jpg](https://link-foto-makanan.jpg)",        // Link URL foto produk
  desc: "Daging sapi Wagyu panggang asap...",    // Penjelasan menu
  tags: "wagyu daging sapi grill best seller"    // Kata kunci bantuan saat dicari di kolom search
},
Aturan Penting Khusus Minuman:
Jika Anda ingin suatu menu memunculkan pilihan Es / Panas (Iced / Hot) saat diklik pembeli, pastikan category menu tersebut diberi nama "Roastery & Elixirs" (atau jika Anda ingin mengganti nama kategori minuman, sesuaikan juga nama kategorinya di baris 218 dan 229 pada js/app.js).

Langkah 4: Mengubah Pilihan Ruangan Reservasi Meja (index.html)
Jika klien memiliki nama area tempat duduk yang berbeda (misal: Lantai 1 Indoor, Lantai 2 Smoking Area, Lesehan), buka index.html pada baris 213–218:

HTML
<select id="res-area" class="w-full p-3 bg-noir-900 border border-brass/30 rounded-xl text-white">
  <option value="Lantai 1 (Indoor Non-Smoking)">Lantai 1 (Indoor Non-Smoking)</option>
  <option value="Lantai 2 (Smoking & Balkon)">Lantai 2 (Smoking & Balkon)</option>
  <option value="Ruang VIP Meeting">Ruang VIP Meeting</option>
</select>
Langkah 5: Mengubah Warna Tema Website (index.html)
Jika klien tidak ingin warna Hitam-Emas, Anda bisa mengubah seluruh warna website hanya dalam 10 detik. Buka index.html di baris 14–21:

JavaScript
colors: {
  noir: { 950: '#070605', 900: '#0b0908', 800: '#14110f', 700: '#1f1a17' }, // Warna Background Gelap
  brass: { DEFAULT: '#c9a050', light: '#e3c485', dark: '#9c7832' },         // Warna Tombol & Aksen Emas
  ivory: '#f9f6f0'                                                          // Warna Teks Terang
}
Contoh Tema Hijau Starbucks/Klasik: Ubah noir.900 menjadi #091912 dan noir.800 menjadi #11261d.

Contoh Tema Biru Navy Mewah: Ubah noir.900 menjadi #0a101d dan noir.800 menjadi #131c31.

⚠️ BAGIAN 4: PENTING! MENGATASI DATA TIDAK BERUBAH SAAT DIEDIT (CACHE BROWSER)
Website ini memiliki fitur penyimpanan pintar di memori browser (localStorage) agar perubahan yang dilakukan kasir di admin.html tidak hilang saat halaman di-refresh.

Masalah yang sering terjadi:

Saat Anda mengedit harga atau menu di kode js/app.js lewat VS Code, lalu Anda membuka browser, terkadang browser masih menampilkan daftar menu yang lama karena browser membaca memori lama (RA_PRODUCTS dan RA_CONFIG).

Cara Meresetnya Agar Perubahan Kode Langsung Muncul:

Buka website Anda di browser Chrome/Edge.

Tekan tombol F12 di keyboard (atau Klik Kanan di layar 
→ pilih Inspect / Inspeksi).

Di kotak yang muncul, klik tab Application di bagian atas (jika tidak terlihat, klik tanda panah >>).

Di menu sebelah kiri, klik Local Storage 
→ klik alamat website Anda.

Klik kanan pada RA_PRODUCTS dan RA_CONFIG 
→ pilih Delete / Clear.

Refresh halaman browser Anda (Ctrl + R), maka seluruh menu dan pengaturan baru dari VS Code Anda akan langsung tampil!

🚀 BAGIAN 5: CARA UPDATE KODE KE GITHUB & VERCEL
Setiap kali Anda selesai mengedit file di laptop dan ingin memperbarui tampilan di link internet Vercel:

Buka repository proyek Anda di github.com.

Masuk ke dalam folder tempat file berada (misalnya di dalam folder cafe-pos-enterprise).

Klik tombol Add file 
→ Upload files.

Seret (drag and drop) file yang habis Anda edit dari laptop ke GitHub (file lama dengan nama yang sama akan otomatis tertimpa/diperbarui).

Klik tombol hijau Commit changes di bawah.

Tunggu 15 detik, Vercel akan otomatis mendeteksi perubahan dari GitHub dan memperbarui website Anda secara live!


---

Simpan teks di atas ke dalam file **`README.md`** di folder proyek Anda. Dengan panduan ini, kapan pun Anda lupa letak pengaturan suatu fitur atau ingin mengubah isi website untuk klien baru, Anda tinggal membuka file `README.md` tersebut di VS Code.