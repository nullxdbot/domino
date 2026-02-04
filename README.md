# 🎲 Domino Score NullXD

[![Version](https://img.shields.io/badge/version-2.3-blue.svg)](https://github.com/nullxdbot/domino)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![APK](https://img.shields.io/badge/APK-Download-orange.svg)](https://www.mediafire.com/file/p9lg6t7t6jrxm1x/DominoNullXD_V2.3.apk/file)

> Aplikasi pencatat skor modern, indah, dan kaya fitur untuk permainan domino 🃏

🌐 **Bahasa:** [English](README_EN.md) | [Indonesia](README.md)

[🎮 Demo Langsung](https://nullxdbot.github.io/domino/) | [📱 Download APK v2.3](https://www.mediafire.com/file/p9lg6t7t6jrxm1x/DominoNullXD_V2.3.apk/file) | [🐛 Laporkan Bug](https://github.com/nullxdbot/domino/issues)

---

## 📸 Tangkapan Layar

<p align="center">
  <img src="https://github.com/user-attachments/assets/1750cae4-799c-4f10-b32a-35ba53c9ede3" width="22%" alt="Antarmuka Utama" />
  <img src="https://github.com/user-attachments/assets/5ab7e369-67b6-4467-b6ef-8243738c01ae" width="22%" alt="Selisih Skor" />
  <img src="https://github.com/user-attachments/assets/5fb24675-2ff9-4b36-989d-26ed24eca25b" width="22%" alt="Pengaturan" />
  <img src="https://github.com/user-attachments/assets/f1184c0f-26f4-4964-92a9-9d4bf74fbb11" width="22%" alt="Dialog Keamanan" />
</p>

---

## ✨ Fitur

### 🎯 Fitur Utama
- ✅ **Pelacakan Skor Real-time** - Update skor secara langsung
- ✅ **Kalkulator Terintegrasi** - Kalkulator built-in untuk perhitungan cepat
- ✅ **Riwayat Skor** - Lacak semua perubahan skor
- ✅ **Penghitung Kemenangan** - Hitung jumlah kemenangan tiap tim
- ✅ **Progress Bar** - Indikator visual progress menuju target
- ✅ **Indikator Selisih Skor** - Lihat selisih skor secara real-time

### 🎨 Desain & UX
- ✅ **UI/UX Modern** - Antarmuka yang bersih dan intuitif
- ✅ **4 Tema Warna** - Ungu, Biru, Hijau, Pink
- ✅ **Mode Gelap** - Ramah mata untuk bermain malam hari
- ✅ **Efek Glassmorphism** - Estetika visual modern
- ✅ **Animasi Halus** - Transisi yang mulus (Hardware Accelerated)
- ✅ **Desain Responsif** - Mendukung semua ukuran layar
- ✅ **Layout Tanpa Scroll** - Kedua kartu muat sempurna di layar

### 🔧 Fitur Lanjutan
- ✅ **Dukungan Multi-bahasa** - 🇮🇩 Bahasa Indonesia & 🇺🇸 English (Baru di v2.3)
- ✅ **Kode Ringan** - Struktur kode yang bersih dan ringan
- ✅ **Auto-save** - Data tersimpan otomatis di browser/local storage
- ✅ **Efek Suara** - Umpan balik audio (dapat di-toggle)
- ✅ **Dialog Keamanan** - Konfirmasi sebelum Reset/Keluar
- ✅ **Target Skor Kustom** - Atur target skor sesuka hati

---

## 🚀 Memulai

### Metode 1: Jalankan Secara Lokal (Source Code)

```bash
# Clone repository
git clone https://github.com/nullxdbot/domino.git

# Masuk ke folder
cd domino

# Buka file index.html langsung di browser Anda
# Atau gunakan simple server:
python -m http.server 8000
```

### Metode 2: Demo Langsung
Coba langsung di browser tanpa instalasi:

👉 [Mainkan Sekarang](https://nullxdbot.github.io/domino/)

### Metode 3: Download APK (Android) 📱
Download aplikasi Android (Webview Wrapper):

🚀 **Rekomendasi:** [Download dari GitHub Releases](https://github.com/nullxdbot/domino/releases)

**Mirror Alternatif:**

<div align="center">

| Mirror | Link | Status |
|---|---|---|
| 🔥 MediaFire | [Download APK](https://www.mediafire.com/file/p9lg6t7t6jrxm1x/DominoNullXD_V2.3.apk/file) | ⚡ Cepat |
| 📂 SFile.mobi | [Download APK](#) | ✅ Mirror 1 |
| 📦 APKAdmin | [Download APK](#) | ✅ Mirror 2 |

</div>

---

## 📁 Struktur Proyek

```
domino/
├── index.html              # File HTML utama (v2.3 Multi-bahasa)
├── README.md               # Dokumentasi
├── CHANGELOG.md            # Riwayat versi
│
├── css/
│   └── style.css           # Stylesheet utama (Bersih & Dioptimalkan)
│
├── js/
│   └── app.js              # Logika utama (Bersih & Multi-bahasa)
│
├── img/
│   ├── icon-*.png          # Ikon aplikasi
│   └── screenshot*.png     # Gambar preview
│
└── sfx/
    ├── sfx-click.wav       # Efek suara klik
    └── sfx-win.m4a         # Efek suara kemenangan
```

---

## 📝 Catatan Perubahan

### Versi 2.3 (Terbaru - Update Bersih)
- 🌍 **Multi-bahasa:** Menambahkan dukungan untuk Indonesia & English.
- 🧹 **Kode Bersih:** Menghapus komentar yang tidak digunakan dan dependensi eksternal.
- ⚡ **Performa:** Ukuran file lebih ringan dan eksekusi lebih cepat.

### Versi 2.2
- 📱 **APK Resmi:** Rilis wrapper Android.
- 🛡️ **Keamanan:** Menambahkan dialog konfirmasi.

📖 **Catatan Lengkap:** [CHANGELOG.md](CHANGELOG.md)

---

## 🤝 Kontribusi

Kontribusi sangat diterima! 🎉

1. Fork repository
2. Buat feature branch (`git checkout -b feature/FiturKeren`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan FiturKeren'`)
4. Push ke branch (`git push origin feature/FiturKeren`)
5. Buat Pull Request

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

---

<div align="center">

**Dibuat dengan ❤️ oleh Farrel Aulia Irfealdo (NullXD)**

🇮🇩 Indonesia

[⬆ Kembali ke Atas](#-domino-score-nullxd)

</div>
