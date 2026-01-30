# 🎲 Domino Score NullXD

Aplikasi web modern untuk pencatat skor permainan domino dengan antarmuka elegan dan fitur lengkap.

[![Version](https://img.shields.io/badge/version-2.0.1-blue)](https://github.com/nullxdbot/domino)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-ready-orange)](https://github.com/nullxdbot/domino)
[![Status](https://img.shields.io/badge/status-optimized-success)](https://github.com/nullxdbot/domino)

**[🎮 Live Demo](https://nullxdbot.github.io/domino/)** | **[📖 Documentation](#-fitur-utama)** | **[🐛 Report Bug](https://github.com/nullxdbot/domino/issues)**

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/nullxdbot/domino.git

# Buka di browser
open index.html
```

**Atau langsung coba:** [nullxdbot.github.io/domino](https://nullxdbot.github.io/domino/)

---

## ✨ Fitur Utama

### 🎮 Core Features
- **2 Player Mode** - Pencatatan skor untuk 2 pemain/tim
- **Win Counter** - Badge mahkota kemenangan dengan tracking jumlah menang
- **Calculator Built-in** - Kalkulator terintegrasi untuk hitung skor cepat
- **Score History** - Riwayat input skor per ronde dengan visual chips
- **Delete Score** - Hapus skor individual dari history dengan konfirmasi
- **Last Winner Badge** - Indikator pemenang ronde terakhir
- **Quick Reset** - Reset skor individual per pemain
- **Auto-Save** - Data otomatis tersimpan di LocalStorage
- **Score Difference Display** - Real-time selisih skor antar tim (✅ **FIXED!**)

### 🎨 UI/UX Features
- **4 Color Themes** - Purple (default), Blue, Green, Pink
- **Optimized Layout** - ✅ **Kedua card muat sempurna tanpa scroll!**
- **Score Color Indicator** - Warna berubah sesuai progress (hijau → kuning → orange → merah)
- **Progress Bar** - Visual progress menuju batas skor
- **Compact Mode** - Mode tampilan ringkas
- **Smooth Animations** - Animasi score counter, transitions, dan effects
- **Glass Morphism** - Card dengan backdrop blur effect
- **Responsive Design** - Optimal di mobile dan desktop
- **VS Indicator** - Badge VS di tengah untuk membedakan kedua tim

### ⚙️ Settings & Customization
- **Custom Score Limit** - Atur batas poin kalah (default: 101)
- **Sound Effects Toggle** - Aktifkan/nonaktifkan efek suara
- **Compact Mode Toggle** - Mode tampilan compact
- **Theme Selector** - Pilih dari 4 tema warna
- **About Page** - Informasi lengkap aplikasi

### 📱 Progressive Web App (PWA)
- **Installable** - Dapat di-install ke home screen
- **Service Worker** - Dukungan offline
- **App Manifest** - Icon dan splash screen custom
- **Mobile Optimized** - Safe area support untuk notch devices

---

## 🎯 What's New in v2.0.1

### 🐛 Bug Fixes
- **Fixed Score Difference Logic** - Indikator "Tim Unggul" sekarang menampilkan tim yang benar
  - Before: Logic terbalik (Tim Alpha unggul saat scores[0] < scores[1]) ❌
  - After: Logic benar (Tim Alpha unggul saat scores[0] > scores[1]) ✅

### 🎨 Layout Optimization
- **No More Scrolling!** - Kedua player card sekarang muat sempurna dalam 1 layar
- **Reduced Padding** - 30-50% pengurangan pada semua spacing
- **Smaller Fonts** - Score: 72px → 56px untuk tampilan lebih compact
- **Optimized Elements** - Progress bar, history, buttons semua lebih compact
- **Total Height Saved** - ~200-250px lebih pendek!

### 📱 Mobile Experience
- Tested pada berbagai device (iPhone SE hingga Pro Max)
- Perfect fit pada layar 375px - 430px width
- Smooth scrolling di history section saja (bukan full page)
- Better touch targets dan spacing

**Result:** User experience jauh lebih baik! 🎉

---

## 📂 Struktur Project

```
domino/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # Optimized styles (32 KB)
├── js/
│   └── app.js              # JavaScript logic with bug fixes (17 KB)
├── img/
│   └── icon-192.png        # App icon 192x192
│   └── icon-512.png        # App icon 512x512
├── sfx-click.wav           # Click sound effect
├── sfx-win.m4a             # Win sound effect
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── README.md               # Documentation
└── CHANGELOG.md            # Version history & changes
```

## 🚀 Instalasi & Penggunaan

### Via GitHub Pages
1. Fork atau clone repository ini
2. Upload ke GitHub repository Anda
3. Aktifkan GitHub Pages di Settings → Pages
4. Akses via `https://nullxdbot.github.io/domino/`

### Local Development
1. Clone repository:
   ```bash
   git clone https://github.com/nullxdbot/domino.git
   ```
2. Buka `index.html` di browser modern
3. Atau gunakan local server:
   ```bash
   python -m http.server 8000
   # atau
   npx http-server
   ```

### Install sebagai PWA
1. Buka aplikasi di browser mobile (Chrome/Safari)
2. Tap menu "Add to Home Screen"
3. Icon aplikasi akan muncul di home screen
4. Akses seperti native app!

## 🎯 Cara Bermain

### Memulai Permainan
1. Buka aplikasi
2. Skor dimulai dari 0 untuk kedua tim (Tim Alpha & Tim Beta)
3. Ronde dimulai dari Ronde 1
4. Target default: 101 poin (bisa diubah di Settings)

### Menambah Skor
1. **Cara 1**: Tap area skor besar (angka di tengah card)
2. **Cara 2**: Tap tombol **+ Add Score** di bawah card
3. Calculator akan terbuka
4. Hitung total skor dari domino Anda
5. Gunakan operator matematika (+, -, ×, ÷) jika perlu
6. Tap **Done** untuk menambahkan ke skor

### Mengurangi Skor
- Tap tombol **−** untuk mengurangi 1 poin sekaligus
- Berguna untuk koreksi kesalahan input

### Menghapus Score dari History
- Tap salah satu chip di History section
- Konfirmasi penghapusan
- Skor akan dikurangi otomatis sesuai nilai yang dihapus

### Quick Reset Per Pemain
- Tap icon **↻** di pojok kanan atas card
- Hanya reset skor pemain tersebut tanpa mempengaruhi pemain lain
- Memerlukan konfirmasi

### Indikator Visual
- **Progress Bar** - Visual bar menunjukkan progress menuju limit
  - Angka menunjukkan: Skor Sekarang / Batas Skor
- **"Kurang X lagi"** - Menunjukkan sisa poin hingga kalah
- **Score Color**:
  - 🟢 Hijau (0-30% menuju limit)
  - 🟡 Kuning (30-60% menuju limit)
  - 🟠 Orange (60-85% menuju limit)
  - 🔴 Merah (>85% menuju limit, dengan pulse animation)
- **Selisih Skor** - Banner di atas menunjukkan:
  - "Pertandingan Seimbang" (skor sama)
  - "Tim Alpha Unggul +X" (Tim Alpha lebih tinggi)
  - "Tim Beta Unggul +X" (Tim Beta lebih tinggi)

### Game Over
- Pemain pertama yang mencapai **batas skor (default: 101)** = **KALAH**
- Yang menang adalah lawannya!
- Modal pemenang muncul dengan:
  - Trophy icon dengan bounce animation
  - Nama pemenang
  - Skor akhir pemenang
  - Win counter +1 untuk pemenang
- Tombol "New Round" untuk melanjutkan
- Tombol "View Scores" untuk melihat skor final

### History Tracking
- Setiap input skor tercatat dalam chips history
- Format: +10, +15, -1, dll
- Tap chip untuk menghapus score tersebut
- Icon × muncul saat hover/tap
- Auto-update total skor setelah penghapusan

## ⚙️ Pengaturan (Settings)

Tap icon **⚙️** di header untuk membuka menu settings:

### Tema Warna
- **Purple** - Gradient ungu-pink (default)
- **Blue** - Gradient biru-cyan
- **Green** - Gradient hijau-light green
- **Pink** - Gradient pink-light pink

### Batas Poin Kalah
- Default: 101 point
- Range: 1 - 999+ (bisa custom)
- Perubahan langsung diterapkan ke semua elemen
- Progress bar otomatis menyesuaikan

### Sound Effects
- Toggle ON/OFF efek suara
- Click sound saat menambah/mengurangi skor
- Win sound saat game over
- Berfungsi dengan graceful fallback jika file audio tidak tersedia

### Compact Mode
- Mode tampilan lebih ringkas
- History section disembunyikan
- Score dan padding lebih kecil
- Hemat ruang layar

### Reset Options
- **New Round**: 
  - Skor kembali 0
  - Ronde +1
  - Win counter tetap
  - History direset
- **Reset All**: 
  - Reset total (skor, wins, history, ronde kembali ke 1)
  - Memerlukan konfirmasi

### About Page
Tap tombol **About** untuk melihat:
- Informasi aplikasi lengkap
- Daftar fitur aplikasi
- Informasi developer
- Link donasi (Saweria)
- Social media links

## 🛠️ Teknologi

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling dengan CSS Variables
- **Vanilla JavaScript** - No framework, no dependencies
- **Google Fonts** - Poppins & JetBrains Mono
- **Font Awesome 6.4.0** - Icons

### Storage & Data
- **LocalStorage API** - Persistent data storage
- **JSON** - Data serialization format

### PWA Technologies
- **Service Worker** - Offline capability & caching
- **Web App Manifest** - Install to home screen
- **Theme Color** - Native app-like appearance

### Performance
- **Lightweight** - Total ~70 KB (excluding external fonts)
- **Vanilla JS** - No heavy frameworks
- **LocalStorage** - Fast data access
- **CSS Animations** - Hardware accelerated
- **Optimized Layout** - No unnecessary scrolling

## 📱 Kompatibilitas Browser

| Browser | Version | Status |
|---------|---------|--------|
| Chrome (Desktop) | 90+ | ✅ Fully Supported |
| Chrome (Android) | 90+ | ✅ Fully Supported |
| Safari (iOS) | 14+ | ✅ Fully Supported |
| Safari (macOS) | 14+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |
| Samsung Internet | 14+ | ✅ Fully Supported |

### Screen Sizes Tested
- ✅ iPhone SE (375×667)
- ✅ iPhone 8 Plus (414×736)
- ✅ iPhone X (375×812)
- ✅ iPhone 12/13 (390×844)
- ✅ iPhone 14 Pro Max (430×932)
- ✅ Samsung Galaxy S21 (360×800)
- ✅ iPad (768×1024)
- ✅ Desktop (1920×1080+)

### Required Features
- CSS Variables
- LocalStorage API
- ES6+ JavaScript
- Backdrop Filter (untuk glass effect)
- Flexbox & Grid

## 🎨 Kustomisasi

### Mengubah Tema Default
Edit di `js/app.js`:
```javascript
let currentTheme = 'purple'; // Ganti: 'purple', 'blue', 'green', 'pink'
```

### Menambah Tema Baru
1. Edit `js/app.js`:
```javascript
const themeConfig = {
    'purple': { primary: '#8b5cf6', secondary: '#ec4899' },
    'newtheme': { primary: '#yourcolor', secondary: '#yourcolor2' }
};
```

2. Edit `index.html` (theme selector):
```html
<button class="theme-option newtheme" onclick="setTheme('newtheme')" title="Your Theme">
    <div class="theme-preview" style="background: linear-gradient(135deg, #yourcolor, #yourcolor2)"></div>
</button>
```

### Mengubah Batas Default
Edit di `js/app.js`:
```javascript
let limit = 101; // Ganti dengan angka yang diinginkan
```

### Mengubah Nama Tim
Edit di `index.html`:
```html
<span class="player-name">TIM ALPHA</span>  <!-- Tim 1 -->
<span class="player-name">TIM BETA</span>   <!-- Tim 2 -->
```

## 📊 Data Structure

Data yang tersimpan di LocalStorage:
```javascript
{
  "scores": [0, 0],              // Skor Tim Alpha dan Tim Beta
  "wins": [0, 0],                 // Jumlah kemenangan
  "limit": 101,                   // Batas skor kalah
  "theme": "purple",              // Tema aktif
  "history": [[], []],            // History input skor per tim
  "roundCount": 1,                // Nomor ronde
  "lastWinner": null,             // Index pemenang terakhir (0/1)
  "compactMode": false,           // Status compact mode
  "soundEnabled": true            // Status sound effects
}
```

## 🔧 Development

### Prerequisites
- Text editor (VS Code, Sublime, dll)
- Browser modern dengan DevTools
- (Optional) Local server untuk testing PWA

### Setup Development
```bash
# Clone repository
git clone https://github.com/nullxdbot/domino.git

# Masuk ke folder
cd domino

# Buka di editor
code .

# (Optional) Jalankan local server
python -m http.server 8000
```

### Testing
1. Buka browser DevTools (F12)
2. Test di berbagai viewport sizes (Responsive mode)
3. Test LocalStorage di Application tab
4. Test Service Worker di Application → Service Workers
5. Test PWA installability
6. Test pada device fisik untuk memastikan no-scroll design

### Build untuk Production
File sudah production-ready, tidak perlu build process.

Optional minification:
```bash
# Minify CSS
npx csso css/style.css -o css/style.min.css

# Minify JS
npx terser js/app.js -o js/app.min.js
```

## 🐛 Known Issues & Solutions

### Fixed in v2.0.1:
- ✅ Score difference indicator showing wrong team (FIXED)
- ✅ Layout requiring scroll on mobile devices (FIXED)

### Current Known Issues:
- Service Worker butuh HTTPS untuk production (gunakan GitHub Pages atau hosting dengan SSL)
- Audio files bersifat optional (app tetap berfungsi tanpa audio)

## 📝 Changelog

### Version 2.0.1 (30 Jan 2026)
- 🐛 **FIXED**: Score difference logic - sekarang menampilkan tim yang benar
- 🎨 **OPTIMIZED**: Layout untuk mobile - kedua card muat tanpa scroll
- ✂️ **REDUCED**: Padding dan margin sebesar 30-50% pada semua elemen
- 📏 **ADJUSTED**: Font sizes untuk lebih compact
- 📊 **IMPROVED**: Progress bar height (40px → 32px)
- 🎯 **ENHANCED**: History section lebih compact (80px → 60px max height)
- ⚡ **PERFORMANCE**: Hemat ~200-250px tinggi total layout
- 📱 **MOBILE**: Tested pada berbagai ukuran layar (375px - 430px width)
- 📖 **DOCS**: Tambahan CHANGELOG.md dengan detail perubahan

### Version 1.0.0 (29 Jan 2026)
- ✨ Initial release
- ✨ Basic 2-player score tracking
- ✨ Integrated calculator
- ✨ Win counter with crown badge
- ✨ Score history tracking with delete function
- ✨ 4 color themes (Purple, Blue, Green, Pink)
- ✨ Sound effects toggle
- ✨ Compact mode
- ✨ Auto-save to LocalStorage
- ✨ PWA support with Service Worker
- ✨ About page with app info
- ✨ Confirmation modals
- ✨ Quick player reset
- ✨ Last winner badge
- ✨ Score difference indicator

## 🤝 Kontribusi

Kontribusi sangat diterima! Untuk berkontribusi:

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Areas for Contribution
- 🌍 Internationalization (i18n)
- 🎨 Additional themes
- ✨ New features
- 🐛 Bug fixes
- 📖 Documentation improvements
- ♿ Accessibility enhancements

## 💝 Support Developer

Jika aplikasi ini bermanfaat, Anda bisa mendukung developer:

- ☕ [Donasi via Saweria](https://saweria.co/nullxd)
- ⭐ Star repository ini di GitHub
- 🐛 Report bugs atau request features
- 📢 Share ke teman-teman
- 📝 Write a review atau testimonial

## 📞 Contact

**Developer**: Farrel Aulia Irfealdo (NullXD)

- Instagram: [@farrelauliairfealdo_](https://instagram.com/farrelauliairfealdo_)
- TikTok: [@farrel.aulia.irfealdo](https://tiktok.com/@farrel.aulia.irfealdo)
- Telegram: [@farrelauliairfealdo](https://t.me/farrelauliairfealdo)

## 📄 License

MIT License

Copyright (c) 2026 Farrel Aulia Irfealdo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🙏 Acknowledgments

- Font Awesome for the icon library
- Google Fonts for Poppins & JetBrains Mono
- Claude AI (Anthropic) for optimization assistance
- The domino gaming community for inspiration

---

<div align="center">

**Made with ❤️ in Indonesia 🇮🇩**

🎲 **Domino Score NullXD** - Score Tracker untuk Pecinta Domino

**[⭐ Star](https://github.com/nullxdbot/domino) · [🐛 Report Bug](https://github.com/nullxdbot/domino/issues) · [✨ Request Feature](https://github.com/nullxdbot/domino/issues)**

*Version 2.0.1 - Optimized & Bug Fixed Edition*

</div>
