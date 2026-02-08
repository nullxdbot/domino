# 📝 CATATAN PERUBAHAN

🌐 **Bahasa:** [English](CHANGELOG_EN.md) | [Indonesia](CHANGELOG.md)

> Catatan perubahan dan riwayat versi Domino Score NullXD

---

## Versi 2.5 (2026-02-08) - Perfect Fit Layout 🎯

### ✨ Fitur Baru
- 🎯 **Branding Update:** Nama tim kedua diubah dari "TIM BETA" menjadi "TIM ZENITH" untuk identitas yang lebih unik.
- 🎵 **Music Player:** Integrasi YouTube untuk memutar musik langsung di aplikasi.
- 🧮 **Built-in Calculator:** Kalkulator terintegrasi untuk perhitungan cepat.
- 🌍 **Multi-bahasa Ditingkatkan:** Dukungan penuh Bahasa Indonesia & English dengan auto-save preferensi.
- 💾 **Auto-save Data:** Semua data tersimpan otomatis ke localStorage.
- 🎨 **4 Tema Warna:** Purple, Blue, Green, Pink dengan pilihan yang mudah.

### 🔧 Peningkatan
- 🚫 **Perfect Fit Layout:** Semua konten (termasuk modal About) muat sempurna di layar tanpa scroll.
- 📦 **Ultra Compact Mode:** Mode ultra ringkas yang benar-benar dioptimalkan untuk layar kecil.
- ⚡ **Optimasi Spacing:** Balanced spacing & sizing di semua elemen untuk tampilan yang rapi.
- 📊 **Real-time Score Tracking:** Sistem pelacakan skor yang lebih responsif.
- 🎨 **UI Polish:** Button, card, dan font sizes dioptimalkan untuk pengalaman terbaik.
- 📝 **History & Undo Ditingkatkan:** Sistem riwayat dan undo yang lebih robust.

### 🐛 Perbaikan Bug
- ✅ Layout modal "Tentang Aplikasi" tidak lagi terpotong.
- ✅ Music player overlay spacing diperbaiki.
- ✅ Scrollbar dihilangkan di seluruh UI untuk tampilan yang lebih bersih.
- ✅ All content fit dalam 1 screen tanpa overflow.

---

## Versi 2.4 (2026-02-06) - Optimal & Modern Design 🎯

### ✨ Fitur Baru
- 🎯 **Branding Update:** Nama default tim diubah dari "TIM ALPHA" menjadi "TIM NULLXD" untuk identitas brand yang lebih kuat.
- 📦 **Mode Ringkas:** Mode compact yang benar-benar berfungsi untuk device dengan layar lebih kecil.
- 🎨 **Font Custom:** Implementasi custom font di semua dialog untuk tampilan yang lebih unik.
- 🌈 **Social Media Dialog Redesign:** Dialog social media dengan gradient background yang menarik dan modern.

### 🔧 Peningkatan
- 🏆 **Logika Domino Tradisional:** Memperbaiki logika menang/kalah sesuai aturan domino kampung - pemain yang mencapai/melewati limit 101 poin = KALAH (bukan menang).
- 📱 **UI Full Screen Optimal:** Dioptimalkan khusus untuk layar 1440x3200 (395 ppi) agar pas full screen tanpa scroll.
- 📊 **Info "Sisa X lagi":** Format teks lebih jelas dan informatif ("Sisa 46 lagi" vs "Batas tersisa: 46").
- ⚡ **Spacing Optimization:** Optimasi menyeluruh untuk padding, margin, dan gap di semua elemen.
- 🎨 **Visual Polish:** Icon lebih besar, text center, gradient backgrounds, dan shadow effects.

### 📐 Detail Optimasi Layout
- **App Container:** Padding disesuaikan (14px top, 20px bottom)
- **Header:** Ukuran brand icon, font, dan button dioptimalkan
- **Player Card:** Padding, score display, progress bar disesuaikan
- **Action Button:** Height dinaikkan untuk touch target yang lebih baik
- **History Section:** Max-height dan spacing dioptimalkan
- **VS Circle:** Ukuran optimal untuk visual hierarchy

### 🐛 Perbaikan Bug
- ✅ Memperbaiki logika win/lose yang terbalik (yang mencapai limit sekarang benar-benar kalah).
- ✅ Layout tidak lagi terpotong di device dengan layar 1440x3200.
- ✅ Mode compact sekarang benar-benar berfungsi dengan CSS yang proper.

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
