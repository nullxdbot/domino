# 📝 CATATAN PERUBAHAN

🌐 **Bahasa:** [English](CHANGELOG_EN.md) | [Indonesia](CHANGELOG.md)

> Catatan perubahan dan riwayat versi Domino Score NullXD

---

## Versi 2.3 (2026-02-04) - Update Multi-bahasa & Kode Bersih 🌍

### ✨ Fitur Baru
- 🌍 **Dukungan Multi-bahasa:** Dukungan penuh **Bahasa Indonesia** dan **English**. Ganti bahasa secara instan melalui menu Pengaturan.
- 💾 **Persistensi Bahasa:** Aplikasi otomatis mengingat pilihan bahasa terakhir Anda.

### 🔧 Peningkatan
- 🧹 **Arsitektur Kode Bersih:** Pembersihan total kode (HTML/CSS/JS), menghapus komentar yang tidak perlu, dan merapikan struktur agar lebih ringan.
- ⚡ **Peningkatan Performa:** Kode dioptimalkan untuk kecepatan eksekusi yang lebih baik.
- 🎨 **UI Dinamis:** Teks antarmuka sekarang menyesuaikan panjang karakter bahasa secara dinamis agar layout tetap rapi.

### 🐛 Perbaikan Bug
- ✅ Memperbaiki glitch tampilan saat berpindah bahasa.
- ✅ Memastikan status "Ronde" dan "Skor" tersimpan dengan aman saat refresh.
- ✅ Perbaikan konsistensi teks pada dialog konfirmasi.

---

## Versi 2.2 (2026-02-02) - Edisi Android Native 🚀

### ✨ Fitur Baru
- 📱 **Rilis APK Resmi:** Aplikasi Android native dengan ikon Cube official.
- 🎯 **Pengalaman Layar Penuh:** Tampilan penuh tanpa gangguan browser bar.
- 🛡️ **Dialog Keamanan:** Dialog konfirmasi sebelum Reset dan Exit untuk mencegah aksi tidak disengaja.

### 🔧 Peningkatan
- 🎨 **Optimasi Layout:** Kedua card pemain sekarang muat sempurna dalam satu layar (Tanpa Scroll).
- 🚀 **Peningkatan Performa:** Optimasi rendering dan animasi untuk pengalaman yang lebih smooth.
- 📱 **Optimasi Android:** Khusus dioptimalkan untuk layar perangkat Android.

### 🐛 Perbaikan Bug
- ✅ Memperbaiki logika selisih skor yang menunjukkan tim yang salah.
- ✅ Memperbaiki layout overflow di layar kecil.
- ✅ Meningkatkan stabilitas untuk sesi permainan yang panjang.

---

## Versi 2.1 (2026-01-30) - Update Optimasi

### 🐛 Perbaikan Bug Kritis

#### Perbaikan Logika Selisih Skor
**File:** `js/app.js`

**Masalah:**
Indikator "Unggul" sebelumnya terbalik (menampilkan tim yang kalah sebagai yang unggul).

**Diperbaiki:**
Logika perbandingan skor diperbaiki sehingga lencana dan teks "Unggul" selalu menunjuk ke tim dengan skor lebih tinggi.

### 🎨 Optimasi Layout

**Masalah:** Kedua player card tidak muat dalam satu layar, harus scroll.

**Solusi:** Optimasi padding, margin, dan ukuran elemen.

#### Hasil:
- **Total tinggi dikurangi:** ~250px
- **Kedua card sekarang muat sempurna dalam satu layar** ✅
- **Tidak perlu scroll lagi!** 🎉

---

## Versi 2.0.0 (2025-12) - Redesain Besar-besaran 🎨

### ✨ Fitur Utama
- 🎨 **Redesain UI/UX Lengkap:** Antarmuka modern dengan efek glassmorphism.
- 🎵 **Efek Suara:** Umpan balik audio untuk klik dan kemenangan.
- 🎨 **4 Tema Warna:** Ungu (default), Biru, Hijau, Pink.
- 🌙 **Mode Gelap:** Tema gelap untuk kenyamanan mata.
- 📊 **Riwayat Skor:** Lacak semua perubahan skor.
- 🧮 **Mode Kalkulator:** Kalkulator terintegrasi untuk perhitungan cepat.

### 🎯 Fitur Inti
- ✅ Pelacakan skor real-time.
- ✅ Penghitung kemenangan untuk tiap tim.
- ✅ Progress bar visual.
- ✅ Indikator selisih skor.
- ✅ Target skor yang dapat disesuaikan.

---

## Versi 1.0.0 (2025-11) - Rilis Awal 🎉

### ✨ Fitur
- ✅ Pelacakan skor dasar untuk 2 pemain.
- ✅ Fungsi tambah/kurang skor.
- ✅ Deteksi kemenangan.
- ✅ Reset permainan.
- ✅ Antarmuka sederhana dan bersih.

---

<div align="center">

**[⬆ Kembali ke Atas](#-catatan-perubahan)**

</div>
