# 🎲 Domino Score - Full Featured

Aplikasi web pencatat skor permainan domino dengan sistem **lose** (kalah) dan berbagai fitur visual menarik.

## ✨ Fitur Utama

### 🎮 Gameplay
- **2 Pemain** - Mode untuk 2 pemain
- **Kalkulator Built-in** - Hitung skor dengan cepat
- **Sistem Lose** - Pemain yang mencapai batas skor (default: 101) = KALAH
- **Progress Bar** - Visualisasi menuju batas kalah
- **Auto Save** - Skor otomatis tersimpan di browser

### 🎨 Visual Effects
- **13 Color Themes** - Purple, Dark, Ocean, Sunset, Forest, Neon, Rose, Sky, Fire, dll
- **Confetti Animation** - Saat ada yang kalah
- **Score Pop Animation** - Animasi saat skor bertambah
- **Glass Morphism** - Efek kaca transparan
- **Text Glow Effects** - Skor dengan efek cahaya
- **Smooth Transitions** - Transisi halus di semua element

### 🛠️ Components
- **Glass Cards** - Kartu dengan backdrop blur
- **Ripple Buttons** - Tombol dengan efek ripple
- **Modal Overlay** - Overlay dengan blur effect
- **Progress Bars** - Bar progress dengan shimmer
- **Theme Switcher** - Ganti tema dengan 1 klik

## 📂 Struktur Folder

```
domino-score/
├── index.html              # File HTML utama
├── css/
│   ├── variables.css       # CSS Custom Properties
│   ├── animations.css      # Semua animasi
│   ├── efekteks.css        # Text effects
│   ├── components.css      # Komponen reusable
│   ├── utilities.css       # Helper classes
│   ├── themes.css          # 13 color themes
│   └── style.css           # Main styling
├── js/
│   └── app.js              # JavaScript logic
├── gambar/                 # Folder untuk gambar (optional)
└── README.md               # Dokumentasi ini
```

## 🚀 Cara Menggunakan

### Online (GitHub Pages)
1. Upload semua file ke GitHub repository
2. Aktifkan GitHub Pages di Settings
3. Buka link: `https://username.github.io/domino-score/`

### Offline (Local)
1. Download semua file
2. Buka `index.html` di browser modern
3. Selesai!

## 🎯 Cara Bermain

1. **Mulai Permainan**
   - Dua pemain siap bermain
   - Masing-masing mulai dari skor 0

2. **Tambah Skor**
   - Tap tombol **+** untuk membuka kalkulator
   - Hitung total skor dari kartu domino
   - Tap **Done** untuk menambahkan ke skor

3. **Kurangi Skor**
   - Tap tombol **−** untuk mengurangi 1 poin

4. **Progress Bar**
   - Bar menunjukkan progress menuju batas kalah
   - Semakin penuh = semakin dekat kalah

5. **Menang/Kalah**
   - Pemain pertama yang mencapai **101 point** = **KALAH** 💀
   - Confetti animation muncul saat game over

## ⚙️ Pengaturan

### Ganti Tema
1. Tap menu **☰** di kanan atas
2. Pilih tema warna favorit
3. Tema otomatis tersimpan

### Ubah Batas Skor
1. Tap menu **☰**
2. Ubah "Batas Skor Kalah"
3. Range: 50 - 500 point

### Ubah Nama Pemain
- Tap pada nama pemain
- Ketik nama baru
- Otomatis tersimpan

## 🎨 Daftar Themes

1. **Purple** (Default) - Gradient ungu-pink
2. **Dark** - Dark mode elegant
3. **Ocean** - Biru laut segar
4. **Sunset** - Orange-pink hangat
5. **Forest** - Hijau alami
6. **Neon** - Cyberpunk neon
7. **Rose** - Pink romantic
8. **Sky** - Biru langit cerah
9. **Grape** - Ungu gelap
10. **Fire** - Merah-orange panas
11. **Midnight** - Navy gelap
12. **Candy** - Pink-cyan manis
13. **Aurora** - Pastel soft

## 💡 CSS Classes yang Tersedia

### Animations
```css
.animate-fadeIn
.animate-bounce
.animate-pulse
.animate-shake
.animate-glow
.animate-float
.animate-scorePop
```

### Text Effects
```css
.text-gradient
.text-glow
.text-neon
.text-shadow-lg
.text-3d
.text-shimmer
```

### Components
```css
.glass-card
.btn-ripple
.badge-glow
.modal
.progress
.spinner
```

### Utilities
```css
.d-flex
.justify-center
.align-center
.m-3, .p-3
.rounded-lg
.shadow-xl
```

## 🛠️ Teknologi

- **HTML5** - Struktur semantic
- **CSS3** - Modern styling dengan variables
- **JavaScript (Vanilla)** - No dependencies
- **LocalStorage** - Persistent data
- **CSS Animations** - Smooth transitions
- **Backdrop Filter** - Glass morphism

## 📱 Browser Support

- ✅ Chrome 90+ (Desktop & Mobile)
- ✅ Firefox 88+
- ✅ Safari 14+ (iOS & macOS)
- ✅ Edge 90+
- ✅ Opera 76+

## 🎮 Keyboard Shortcuts

- `Esc` - Tutup calculator/modal
- `Enter` - Konfirmasi di calculator
- `Backspace` - Hapus digit terakhir

## 📄 Lisensi

MIT License - Bebas digunakan untuk keperluan pribadi atau komersial

## 👨‍💻 Kontribusi

Kontribusi welcome! Silakan:
1. Fork repository
2. Buat branch baru
3. Commit perubahan
4. Push dan buat Pull Request

## 🐛 Report Bug

Jika menemukan bug, silakan buat Issue di GitHub.

## 💡 Ide Fitur Tambahan

- [ ] Mode 4 pemain
- [ ] History skor permainan
- [ ] Sound effects toggle
- [ ] Leaderboard
- [ ] Export skor ke PDF/Image
- [ ] PWA (Progressive Web App)
- [ ] Multiplayer online
- [ ] Timer per ronde

---

**Made with ❤️ for Domino Players**

Version: 2.0.0
Last Updated: January 2026
