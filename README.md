# 🎲 Domino Score NullXD

[![Version](https://img.shields.io/badge/version-2.2-blue.svg)](https://github.com/nullxdbot/domino)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-enabled-purple.svg)](https://web.dev/progressive-web-apps/)
[![APK](https://img.shields.io/badge/APK-Download-orange.svg)](https://github.com/nullxdbot/domino/releases/latest)

> Modern, beautiful, and feature-rich score keeper untuk permainan domino 🃏

🌐 **Bahasa:** [English](README_EN.md) | [Indonesia](README.md)

[🎮 Live Demo](https://nullxdbot.github.io/domino/) | [📱 Download APK v2.2](https://github.com/nullxdbot/domino/releases/latest) | [🐛 Report Bug](https://github.com/nullxdbot/domino/issues) | [✨ Request Feature](https://github.com/nullxdbot/domino/issues)

---

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/1750cae4-799c-4f10-b32a-35ba53c9ede3" width="22%" alt="Main Interface" />
  <img src="https://github.com/user-attachments/assets/5ab7e369-67b6-4467-b6ef-8243738c01ae" width="22%" alt="Score Difference" />
  <img src="https://github.com/user-attachments/assets/5fb24675-2ff9-4b36-989d-26ed24eca25b" width="22%" alt="Settings" />
  <img src="https://github.com/user-attachments/assets/f1184c0f-26f4-4964-92a9-9d4bf74fbb11" width="22%" alt="Safety Dialog" />
</p>

---

## ✨ Features

### 🎯 Core Features
- ✅ **Real-time Score Tracking** - Update skor secara langsung
- ✅ **Built-in Calculator** - Kalkulator terintegrasi untuk perhitungan cepat
- ✅ **Score History** - Track semua perubahan skor
- ✅ **Win Counter** - Hitung jumlah kemenangan tiap tim
- ✅ **Progress Bar** - Visual indicator progress menuju target
- ✅ **Score Difference Indicator** - Lihat selisih skor real-time (Fixed Logic)

### 🎨 Design & UX
- ✅ **Modern UI/UX** - Interface yang clean dan intuitive
- ✅ **4 Color Themes** - Purple, Blue, Green, Pink
- ✅ **Dark Mode** - Eye-friendly untuk main malam
- ✅ **Glassmorphism Effect** - Modern visual aesthetics
- ✅ **Smooth Animations** - Transisi yang mulus (Hardware Accelerated)
- ✅ **Responsive Design** - Support semua ukuran layar
- ✅ **No-Scroll Layout** - Both cards fit perfectly on screen (Android Optimized)

### 🔧 Advanced Features
- ✅ **Native APK** - Full screen experience tanpa browser bar
- ✅ **Offline Mode** - Bekerja tanpa internet
- ✅ **Auto-save** - Data tersimpan otomatis
- ✅ **Sound Effects** - Audio feedback (dapat di-toggle)
- ✅ **Safety Dialogs** - Konfirmasi sebelum Reset/Exit
- ✅ **Customizable Score Limit** - Atur target skor sesuka hati

---

## 🚀 Quick Start

### Method 1: GitHub Pages (Recommended)

**Live Demo:** [https://nullxdbot.github.io/domino/](https://nullxdbot.github.io/domino/)

Simply open the link and start playing! 🎮

### Method 2: Clone & Run Locally

```bash
# Clone repository
git clone https://github.com/nullxdbot/domino.git

# Masuk ke folder
cd domino

# Run dengan Python
python -m http.server 8000

# Atau dengan Node.js
npx http-server

# Buka browser
# http://localhost:8000
```

### Method 3: Download ZIP
* Download ZIP dari Releases
* Extract ke folder
* Buka index.html di browser

### Method 4: Download APK (Android) 📱

Download aplikasi Android versi terbaru (v2.2):

**🚀 Recommended: [Download dari GitHub Releases](https://github.com/nullxdbot/domino/releases/latest)**

**Alternative Mirrors:**

<div align="center">

| Mirror | Link | Status |
|---|---|---|
| 🔥 MediaFire | [Download APK](https://www.mediafire.com/file/iu0i5jiqk7udv8z/DominoNullXD_V2.2.apk/file) | ⚡ Fast |
| 📂 SFile.mobi | [Download APK](https://sfile.co/DP4SPKHLDmP) | ✅ Mirror 1 |
| 📦 APKAdmin | [Download APK](https://apkadmin.com/c0r9030ioaod/DominoNullXD_V2.2.apk.html) | ✅ Mirror 2 |

</div>

**Installation Steps:**
* Download APK dari salah satu link di atas
* Enable "Install from Unknown Sources" di Settings
* Buka file APK yang sudah didownload
* Tap "Install"
* Selesai! 🎉

> ⚠️ **Note:** APK ini adalah PWA wrapper yang sudah dioptimalkan menjadi Native App. Memerlukan koneksi internet untuk first load, setelah itu bisa digunakan offline sepenuhnya.

---

## 📱 Installation (PWA)

### Desktop (Chrome/Edge)
* Buka aplikasi di browser
* Klik icon Install di address bar
* Follow installation prompts

### Mobile (Android/iOS)
* Buka aplikasi di browser
* Tap menu (⋮) → Add to Home Screen
* Tap Add

---

## 🔧 Installation di Termux (Android)

### Step 1: Install Termux
Download Termux dari F-Droid (bukan dari Play Store)

### Step 2: Setup Termux
```bash
# Update package list
pkg update && pkg upgrade

# Install Git
pkg install git

# Install Python (untuk HTTP server)
pkg install python

# Atau install Node.js
pkg install nodejs
```

### Step 3: Clone Repository
```bash
# Clone project
git clone https://github.com/nullxdbot/domino.git

# Masuk ke folder
cd domino
```

### Step 4: Run Server

**Option A: Python Server**
```bash
python -m http.server 8000
```

**Option B: Node.js Server**
```bash
# Install http-server
npm install -g http-server

# Run server
http-server -p 8000
```

### Step 5: Access di Browser
```bash
# Server berjalan di:
http://localhost:8000

# Atau via IP lokal (untuk akses dari device lain):
# Cek IP dengan:
ifconfig

# Access via:
http://192.168.x.x:8000
```

📖 **Full Termux Guide:** [TERMUX_GUIDE.md](TERMUX_GUIDE.md)

---

## 📁 Project Structure

```
domino/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── README.md               # This file
├── CHANGELOG.md            # Version history
│
├── css/
│   └── style.css           # Main stylesheet
│
├── js/
│   └── app.js              # Main JavaScript
│
├── img/
│   ├── icon-*.png          # PWA icons (72-512px)
│   └── screenshot*.png     # App screenshots
│
└── sfx/
    ├── sfx-click.wav       # Click sound effect
    └── sfx-win.m4a         # Victory sound effect
```

---

## 🎮 How to Use

### Basic Usage

**Start Game**
* Open aplikasi
* Set score limit (default 101)
* Pilih tema warna favorit

**Add Score**
* Tap tombol "+" atau tap pada angka skor
* Masukkan angka di calculator
* Tekan ✓ untuk confirm

**Remove Score**
* Tap tombol "-" untuk kurangi 1 poin
* Atau tap history item untuk hapus score tertentu

**New Round**
* Setelah ada pemenang
* Tap "New Round" untuk mulai lagi
* Win counter akan bertambah

**Reset All**
* Settings → "Reset All"
* Menghapus semua data termasuk win counter

### Advanced Features

**Calculator Mode:**
* Support operasi: +, -, ×, ÷
* Dapat chain operations
* Backspace untuk hapus digit

**History:**
* Tap pada history chip untuk hapus score
* History tersimpan otomatis

**Themes:**
* 4 pilihan tema: Purple, Blue, Green, Pink
* Auto-save preference

**Compact Mode:**
* Toggle untuk tampilan lebih ringkas
* Ideal untuk layar kecil

**Sound Effects:**
* Toggle on/off di settings
* Click sound & victory sound

---

## ⚙️ Configuration

### Change Score Limit
Settings → Score Limit → Enter nilai (contoh: 50, 101, 200)

### Change Theme
Settings → Color Theme → Pilih warna

### Toggle Features
* Sound Effects: ON/OFF
* Compact Mode: ON/OFF

---

## 🛠️ Development

### Prerequisites

```bash
# Node.js (optional, untuk development server)
node --version

# Python (alternative, untuk simple server)
python --version

# Git
git --version
```

### Local Development

```bash
# Clone repo
git clone https://github.com/nullxdbot/domino.git
cd domino

# Run development server
python -m http.server 8000
# atau
npx http-server
```

### Tech Stack
* **Frontend:** Vanilla JavaScript (ES6+)
* **Styling:** CSS3 (Custom Properties, Flexbox, Grid)
* **PWA:** Service Worker, Web App Manifest
* **Storage:** LocalStorage API
* **Audio:** HTML5 Audio API
* **Icons:** Font Awesome 6.4.0
* **Fonts:** Google Fonts (Poppins, JetBrains Mono)

---

## 📝 Changelog

### Version 2.2 (Current - Android Native)
* 📱 Official APK Release: Full screen, native feel, official Cube icon.
* 🚀 Performance: Hardware accelerated & layout optimized (No Scroll).
* 🛡️ Stability: Smart Logic fix & Safety Dialogs for Reset/Exit.

### Version 2.0.0
* ✨ Complete UI/UX redesign
* ✨ Added PWA support
* ✨ Added sound effects & 4 color themes
* ✨ Added score history & calculator mode

📖 **Full Changelog:** [CHANGELOG.md](CHANGELOG.md)

---

## 🤝 Contributing

Contributions are welcome! 🎉

### How to Contribute

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

📖 **Contributing Guide:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

## ❓ FAQ (Frequently Asked Questions)

### 📱 APK Download & Installation

**Q: Apakah APK ini aman?**  
A: Ya, APK ini adalah PWA (Progressive Web App) wrapper yang aman. Tidak ada akses ke data sensitif.

**Q: Kenapa butuh internet saat pertama kali buka?**  
A: APK ini adalah PWA wrapper yang perlu load assets dari web. Setelah first load, bisa digunakan offline.

**Q: Apakah ini native Android app?**  
A: Versi 2.2 ini adalah Hybrid. Menggunakan teknologi Web tetapi dibungkus sebagai Native App untuk pengalaman Full Screen tanpa browser bar.

**Q: Kenapa size APK-nya kecil?**  
A: Karena asset utama di-load secara efisien dari web saat first run.

**Q: Link download APK tidak bisa diakses?**  
A: Gunakan mirror alternatif yang tersedia (MediaFire, APKAdmin, atau SFile).

### 🎮 Gameplay

**Q: Bagaimana cara menghitung skor?**  
A: Tap area skor atau tombol "+", lalu gunakan calculator untuk hitung total dari kartu domino Anda.

**Q: Apa yang terjadi jika mencapai 101 poin?**  
A: Tim yang mencapai 101 poin = KALAH. Lawan adalah pemenangnya!

**Q: Bisa ubah batas skor?**  
A: Ya, masuk ke Settings → Score Limit, ubah sesuai keinginan (default 101).

**Q: Data tersimpan dimana?**  
A: Data disimpan di LocalStorage browser/app. Tidak perlu koneksi server.

---

## 🐛 Known Issues

* Audio autoplay might be blocked by browser (requires user interaction)
* Some browsers might not support all CSS features (use modern browsers)

---

## 📋 Roadmap

- [ ] Multi-player support (3-4 players)
- [ ] Game statistics & analytics
- [ ] Export/Import game data
- [ ] Tournament mode
- [ ] Multiple languages (i18n)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Farrel Aulia Irfealdo (NullXD)**

* 📧 Email: farelauliairfealdo99999@gmail.com
* 🐙 GitHub: [@nullxdbot](https://github.com/nullxdbot)
* 📱 Instagram: [@farrelauliairfealdo_](https://instagram.com/farrelauliairfealdo_)
* 🎵 TikTok: [@farrel.aulia.irfealdo](https://tiktok.com/@farrel.aulia.irfealdo)
* 💬 Telegram: [@farrelauliairfealdo](https://t.me/farrelauliairfealdo)

---

## 💖 Support

Suka dengan project ini?

* ⭐ Star repository ini
* 🐛 Report bugs
* 💡 Suggest new features
* ☕ Buy me a coffee

---

## 🙏 Acknowledgments

* [Font Awesome](https://fontawesome.com) - Icons
* [Google Fonts](https://fonts.google.com) - Typography
* Inspired by modern score keeper apps
* Thanks to all contributors! 🎉

---

## 📞 Contact & Support

* **Issues:** [GitHub Issues](https://github.com/nullxdbot/domino/issues)
* **Discussions:** [GitHub Discussions](https://github.com/nullxdbot/domino/discussions)
* **Email:** farelauliairfealdo99999@gmail.com

---

<div align="center">

**Made with ❤️ by Farrel Aulia Irfealdo**

🇮🇩 Indonesia

[⬆ Back to Top](#-domino-score-nullxd)

</div>
