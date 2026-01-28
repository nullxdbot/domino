# 🎲 Domino Score NullXD

Aplikasi web modern untuk pencatat skor permainan domino dengan antarmuka elegan dan fitur lengkap.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![PWA](https://img.shields.io/badge/PWA-ready-orange)

## ✨ Fitur Utama

### 🎮 Core Features
- **2 Player Mode** - Pencatatan skor untuk 2 pemain/tim
- **Win Counter** - Badge mahkota kemenangan dengan tracking jumlah menang
- **Calculator Built-in** - Kalkulator terintegrasi untuk hitung skor cepat
- **Score History** - Riwayat input skor per ronde dengan visual chips
- **Last Winner Badge** - Indikator pemenang ronde terakhir
- **Quick Reset** - Reset skor individual per pemain
- **Auto-Save** - Data otomatis tersimpan di LocalStorage
- **Wake Lock** - Layar tidak mati saat bermain (anti-sleep mode)

### 🎨 UI/UX Features
- **3 Color Themes** - Blue (default), Purple, Dark
- **Animated Particles Background** - Partikel bergerak di background
- **Score Color Indicator** - Warna berubah sesuai progress (hijau → kuning → merah)
- **Score Difference Display** - Tampilan real-time selisih skor
- **Compact Mode** - Mode tampilan ringkas
- **Smooth Animations** - Animasi score counter, transitions, dan effects
- **Glass Morphism** - Card dengan backdrop blur effect
- **Responsive Design** - Optimal di mobile dan desktop

### ⚙️ Settings & Customization
- **Custom Score Limit** - Atur batas poin kalah (default: 101)
- **Sound Effects Toggle** - Aktifkan/nonaktifkan efek suara
- **Compact Mode Toggle** - Mode tampilan compact
- **Theme Selector** - Pilih dari 3 tema warna
- **About Page** - Informasi lengkap aplikasi dengan changelog

### 📱 Progressive Web App (PWA)
- **Installable** - Dapat di-install ke home screen
- **Service Worker** - Dukungan offline
- **App Manifest** - Icon dan splash screen custom
- **Mobile Optimized** - Safe area support untuk notch devices

## 📂 Struktur Project

```
domino-score-nullxd/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # All styles (27 KB)
├── js/
│   └── app.js              # JavaScript logic (16 KB)
├── img/
│   └── icon.png            # App icon
├── sfx-click.wav           # Click sound effect
├── sfx-win.m4a             # Win sound effect
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
└── README.md               # Documentation
```

## 🚀 Instalasi & Penggunaan

### Via GitHub Pages
1. Fork atau clone repository ini
2. Upload ke GitHub repository Anda
3. Aktifkan GitHub Pages di Settings → Pages
4. Akses via `https://username.github.io/repo-name/`

### Local Development
1. Clone repository:
   ```bash
   git clone https://github.com/username/domino-score-nullxd.git
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
2. Skor dimulai dari 0 untuk kedua tim
3. Ronde dimulai dari Ronde 1

### Menambah Skor
1. **Cara 1**: Tap area skor besar (angka 0)
2. **Cara 2**: Tap tombol **+** di bawah card
3. Calculator akan terbuka
4. Hitung total skor dari domino Anda
5. Tap **Done** untuk menambahkan ke skor

### Mengurangi Skor
- Tap tombol **−** untuk mengurangi 1 poin sekaligus
- Berguna untuk koreksi kesalahan input

### Quick Reset Per Pemain
- Tap icon **↻** di pojok kanan atas card
- Hanya reset skor pemain tersebut tanpa mempengaruhi pemain lain

### Indikator Visual
- **"Kurang X lagi"** - Menunjukkan sisa poin hingga kalah
- **Score Color**:
  - 🟢 Hijau (0-30% menuju limit)
  - 🟡 Kuning (30-60% menuju limit)
  - 🟠 Orange (60-85% menuju limit)
  - 🔴 Merah (>85% menuju limit, dengan pulse animation)
- **Selisih Skor** - Banner di atas menunjukkan siapa yang unggul

### Game Over
- Pemain pertama yang mencapai **batas skor (default: 101)** = **KALAH**
- Modal pemenang muncul dengan:
  - Trophy icon dengan glow animation
  - Nama pemenang
  - Skor akhir
  - Win counter +1
- Tombol "Lanjut Ronde Baru" untuk melanjutkan

### History Tracking
- Setiap input skor tercatat dalam chips history
- Format: +10, +15, -1, dll
- Scroll horizontal untuk melihat semua history
- Auto-scroll ke item terbaru

## ⚙️ Pengaturan (Settings)

Tap icon **⚙️** di header untuk membuka menu settings:

### Tema Warna
- **Blue** - Gradient biru-pink (default)
- **Purple** - Gradient ungu-cyan
- **Dark** - Gradient merah-kuning

### Batas Poin Kalah
- Default: 101 point
- Range: 1 - 999+ (bisa custom)
- Perubahan langsung diterapkan

### Sound Effects
- Toggle ON/OFF efek suara
- Click sound saat input
- Win sound saat game over

### Compact Mode
- Mode tampilan lebih ringkas
- Score lebih kecil, padding lebih tipis
- Hemat ruang layar

### Reset Options
- **Reset Skor (Ronde Baru)**: Skor kembali 0, ronde +1, win counter tetap
- **Hapus Semua Data**: Reset total (skor, wins, history, ronde)

### About Page
Tap tombol **"Tentang Aplikasi"** untuk melihat:
- Informasi aplikasi lengkap
- Daftar fitur
- Tutorial cara penggunaan
- Changelog versi
- Credits & attributions
- Link donasi developer (Saweria)
- Social media links

## 🛠️ Teknologi

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling dengan CSS Variables
- **Vanilla JavaScript** - No framework, no dependencies
- **Google Fonts** - Outfit & Space Mono
- **Font Awesome 6.4.0** - Icons

### Storage & Data
- **LocalStorage API** - Persistent data storage
- **JSON** - Data serialization format

### PWA Technologies
- **Service Worker** - Offline capability
- **Web App Manifest** - Install to home screen
- **Wake Lock API** - Keep screen awake during game

### Performance
- **Lightweight** - Total ~200 KB (with external fonts)
- **Vanilla JS** - No heavy frameworks
- **LocalStorage** - Fast data access
- **CSS Animations** - Hardware accelerated

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

### Required Features
- CSS Variables
- LocalStorage API
- ES6+ JavaScript
- Backdrop Filter (untuk glass effect)
- Canvas API (untuk particles)

## 🎨 Kustomisasi

### Mengubah Tema Default
Edit di `js/app.js`:
```javascript
let currentTheme = 'blue'; // Ganti: 'blue', 'purple', 'dark'
```

### Menambah Tema Baru
1. Edit `js/app.js`:
```javascript
const themeConfig = {
    'blue': { primary: '#4361ee', accent: '#f72585' },
    'newtheme': { primary: '#yourcolor', accent: '#yourcolor2' }
};
```

2. Edit `index.html` (theme selector):
```html
<div class="t-circle t-newtheme" onclick="setTheme('newtheme')"></div>
```

3. Edit `css/style.css`:
```css
.t-newtheme {
    background: linear-gradient(135deg, #yourcolor, #yourcolor2);
}
```

### Mengubah Batas Default
Edit di `js/app.js`:
```javascript
let limit = 101; // Ganti dengan angka yang diinginkan
```

### Mengubah Jumlah Particles
Edit di `js/app.js`:
```javascript
const particleCount = 30; // Kurangi untuk performa lebih baik
```

## 📊 Data Structure

Data yang tersimpan di LocalStorage:
```javascript
{
  "scores": [0, 0],              // Skor Tim 1 dan Tim 2
  "wins": [0, 0],                 // Jumlah kemenangan
  "limit": 101,                   // Batas skor kalah
  "theme": "blue",                // Tema aktif
  "history": [[], []],            // History input skor
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
git clone https://github.com/username/domino-score-nullxd.git

# Masuk ke folder
cd domino-score-nullxd

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

### Build untuk Production
File sudah production-ready, tidak perlu build process.

Optional minification:
```bash
# Minify CSS
npx csso css/style.css -o css/style.min.css

# Minify JS
npx terser js/app.js -o js/app.min.js
```

## 🐛 Known Issues

- Particles animation bisa lag di device lama (solusi: toggle compact mode)
- Wake Lock API tidak support di semua browser
- Service Worker butuh HTTPS untuk production

## 📝 Changelog

### Version 1.0.0 (29 Jan 2026)
- ✨ Initial release
- ✨ Basic 2-player score tracking
- ✨ Integrated calculator
- ✨ Win counter with crown badge
- ✨ Score history tracking
- ✨ 3 color themes
- ✨ Sound effects toggle
- ✨ Compact mode
- ✨ Auto-save to LocalStorage
- ✨ PWA support with Service Worker
- ✨ Particles background animation
- ✨ Wake Lock anti-sleep
- ✨ About page with app info
- ✨ Confirmation modals
- ✨ Quick player reset
- ✨ Last winner badge

## 🤝 Kontribusi

Kontribusi sangat diterima! Untuk berkontribusi:

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 💝 Support Developer

Jika aplikasi ini bermanfaat, Anda bisa mendukung developer:

- ☕ [Donasi via Saweria](https://saweria.co/nullxd)
- ⭐ Star repository ini di GitHub
- 🐛 Report bugs atau request features
- 📢 Share ke teman-teman

## 📞 Contact

**Developer**: Farrel Aulia Irfealdo

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

---

<div align="center">

**Made with ❤️ in Indonesia**

🎲 **Domino Score NullXD** - Score Tracker untuk Pecinta Domino

[⭐ Star](https://github.com/username/repo) · [🐛 Report Bug](https://github.com/username/repo/issues) · [✨ Request Feature](https://github.com/username/repo/issues)

</div>
