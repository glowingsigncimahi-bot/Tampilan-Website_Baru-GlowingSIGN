GLOWINGSIGN V4 — VERCEL READY
===============================

1. DEPLOY KE VERCEL
-------------------
Cara paling mudah:
- Upload folder project ini ke GitHub.
- Import repository tersebut di Vercel.
- Framework Preset: Other.
- Build Command: kosongkan.
- Output Directory: public
  (Jika Vercel meminta Root Directory, biarkan root project.)

Alternatif:
- Install Vercel CLI lalu jalankan "vercel" dari folder project.

2. STRUKTUR FILE
----------------
/
├── index.html
├── vercel.json
├── README.txt
└── public/
    └── assets/
        ├── app.js
        ├── portfolio.js       <-- daftar project
        ├── style.css
        ├── favicon.svg
        └── portfolio/         <-- TEMPAT UPLOAD FOTO
            └── README.txt

3. MENAMBAH FOTO PORTFOLIO
--------------------------
Upload gambar ke:
public/assets/portfolio/

Contoh:
public/assets/portfolio/
├── nemu-kopi.jpg
├── amar.jpg
├── mangkatsu.jpg
└── klinik.jpg

Lalu buka:
public/assets/portfolio.js

Tambahkan:
{
  image: "nemu-kopi.jpg",
  title: "Nemu Kopi",
  category: "Huruf Timbul",
  location: "Cimahi, Jawa Barat"
}

Kategori yang tersedia:
- Neon Box
- Huruf Timbul
- LED Sign
- Instalasi

PENTING:
Vercel adalah hosting static. Browser tidak bisa otomatis "scan isi folder"
seperti PHP di shared hosting. Karena itu daftar file portfolio dikelola di
portfolio.js. Ini lebih aman, cepat, dan stabil untuk Vercel.

Jika Vercel terhubung ke GitHub:
upload foto + ubah portfolio.js -> commit -> Vercel otomatis deploy.

4. FORMAT FOTO
--------------
Rekomendasi:
- JPG / JPEG / WEBP
- 1600px sisi panjang sudah cukup untuk website
- Gunakan foto landscape 4:3 jika ingin tampilan paling seragam.
- Foto portrait tetap aman karena website menggunakan object-fit: cover.
- Nama file sebaiknya tanpa karakter aneh, contoh: project-nemu-kopi.jpg

5. GANTI NOMOR WHATSAPP
-----------------------
Nomor saat ini:
0811854213

Di website, link sudah memakai format internasional:
62811854213

Cari "62811854213" di index.html jika ingin menggantinya.

6. GANTI DATA BRAND
-------------------
Data yang mudah diganti ada di index.html:
- nama brand
- email
- sosial media
- teks layanan
- CTA

7. CATATAN
----------
Versi ini sengaja dibuat tanpa PHP agar native dan aman di Vercel.
Semua portfolio tampil responsif, proporsional, memiliki filter kategori,
dan bisa dibuka fullscreen.
