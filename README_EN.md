# 🎲 Domino Score NullXD

[![Version](https://img.shields.io/badge/version-2.2-blue.svg)](https://github.com/nullxdbot/domino)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-enabled-purple.svg)](https://web.dev/progressive-web-apps/)
[![APK](https://img.shields.io/badge/APK-Download-orange.svg)](https://www.mediafire.com/file/iu0i5jiqk7udv8z/DominoNullXD_V2.2.apk/file)

> Modern, beautiful, and feature-rich score keeper for domino games 🃏

🌐 **Language:** [English](README_EN.md) | [Indonesia](README.md)

[🎮 Live Demo](https://nullxdbot.github.io/domino/) | [📱 Download APK v2.2](https://www.mediafire.com/file/iu0i5jiqk7udv8z/DominoNullXD_V2.2.apk/file) | [🐛 Report Bug](https://github.com/nullxdbot/domino/issues) | [✨ Request Feature](https://github.com/nullxdbot/domino/issues)

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
- ✅ **Real-time Score Tracking** - Update scores instantly
- ✅ **Built-in Calculator** - Integrated calculator for quick calculations
- ✅ **Score History** - Track all score changes
- ✅ **Win Counter** - Count wins for each team
- ✅ **Progress Bar** - Visual indicator of progress towards target
- ✅ **Score Difference Indicator** - See real-time score difference (Fixed Logic)

### 🎨 Design & UX
- ✅ **Modern UI/UX** - Clean and intuitive interface
- ✅ **4 Color Themes** - Purple, Blue, Green, Pink
- ✅ **Dark Mode** - Eye-friendly for night gaming
- ✅ **Glassmorphism Effect** - Modern visual aesthetics
- ✅ **Smooth Animations** - Smooth transitions (Hardware Accelerated)
- ✅ **Responsive Design** - Supports all screen sizes
- ✅ **No-Scroll Layout** - Both cards fit perfectly on screen (Android Optimized)

### 🔧 Advanced Features
- ✅ **Native APK** - Full screen experience without browser bar
- ✅ **Offline Mode** - Works without internet connection
- ✅ **Auto-save** - Data saved automatically
- ✅ **Sound Effects** - Audio feedback (can be toggled)
- ✅ **Safety Dialogs** - Confirmation before Reset/Exit
- ✅ **Customizable Score Limit** - Set target score as you like

---

## 🚀 Quick Start

### Method 1: GitHub Pages (Recommended)

**Live Demo:** [https://nullxdbot.github.io/domino/](https://nullxdbot.github.io/domino/)

Simply open the link and start playing! 🎮

### Method 2: Clone & Run Locally

```bash
# Clone repository
git clone https://github.com/nullxdbot/domino.git

# Enter folder
cd domino

# Run with Python
python -m http.server 8000

# Or with Node.js
npx http-server

# Open browser
# http://localhost:8000
```

### Method 3: Download ZIP
* Download ZIP from Releases
* Extract to folder
* Open index.html in browser

### Method 4: Download APK (Android) 📱

Download the latest Android application (v2.2) from one of the following mirrors:

<div align="center">

| Mirror | Link | Status |
|---|---|---|
| 🔥 MediaFire | [Download APK](https://www.mediafire.com/file/iu0i5jiqk7udv8z/DominoNullXD_V2.2.apk/file) | ⚡ Recommended |
| 📦 APKAdmin | Download APK | ✅ Mirror 1 |
| 💾 SFile | Download APK | ✅ Mirror 2 |

</div>

**Installation Steps:**
* Download APK from one of the links above
* Enable "Install from Unknown Sources" in Settings
* Open the downloaded APK file
* Tap "Install"
* Done! 🎉

> ⚠️ **Note:** This APK is a PWA wrapper optimized into a Native App. Requires internet connection for first load, then can be used completely offline.

---

## 📱 Installation (PWA)

### Desktop (Chrome/Edge)
* Open the app in browser
* Click the Install icon in address bar
* Follow installation prompts

### Mobile (Android/iOS)
* Open the app in browser
* Tap menu (⋮) → Add to Home Screen
* Tap Add

---

## 🔧 Installation on Termux (Android)

### Step 1: Install Termux
Download Termux from F-Droid (not from Play Store)

### Step 2: Setup Termux
```bash
# Update package list
pkg update && pkg upgrade

# Install Git
pkg install git

# Install Python (for HTTP server)
pkg install python

# Or install Node.js
pkg install nodejs
```

### Step 3: Clone Repository
```bash
# Clone project
git clone https://github.com/nullxdbot/domino.git

# Enter folder
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

### Step 5: Access in Browser
```bash
# Server running at:
http://localhost:8000

# Or via local IP (for access from other devices):
# Check IP with:
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
* Open application
* Set score limit (default 101)
* Choose your favorite color theme

**Add Score**
* Tap "+" button or tap on score number
* Enter number in calculator
* Press ✓ to confirm

**Remove Score**
* Tap "-" button to reduce 1 point
* Or tap history item to remove specific score

**New Round**
* After there's a winner
* Tap "New Round" to start again
* Win counter will increase

**Reset All**
* Settings → "Reset All"
* Deletes all data including win counter

### Advanced Features

**Calculator Mode:**
* Supports operations: +, -, ×, ÷
* Can chain operations
* Backspace to delete digit

**History:**
* Tap on history chip to remove score
* History saved automatically

**Themes:**
* 4 theme choices: Purple, Blue, Green, Pink
* Auto-save preference

**Compact Mode:**
* Toggle for more compact display
* Ideal for small screens

**Sound Effects:**
* Toggle on/off in settings
* Click sound & victory sound

---

## ⚙️ Configuration

### Change Score Limit
Settings → Score Limit → Enter value (example: 50, 101, 200)

### Change Theme
Settings → Color Theme → Choose color

### Toggle Features
* Sound Effects: ON/OFF
* Compact Mode: ON/OFF

---

## 🛠️ Development

### Prerequisites

```bash
# Node.js (optional, for development server)
node --version

# Python (alternative, for simple server)
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
# or
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

**Q: Is this APK safe?**  
A: Yes, this APK is a safe PWA (Progressive Web App) wrapper. No access to sensitive data.

**Q: Why does it need internet when first opened?**  
A: This APK is a PWA wrapper that needs to load assets from the web. After first load, it can be used completely offline.

**Q: Is this a native Android app?**  
A: Version 2.2 is Hybrid. Uses Web technology but wrapped as a Native App for Full Screen experience without browser bar.

**Q: Why is the APK size small?**  
A: Because main assets are loaded efficiently from the web at first run.

**Q: APK download link not accessible?**  
A: Use available alternative mirrors (MediaFire, APKAdmin, or SFile).

### 🎮 Gameplay

**Q: How to calculate score?**  
A: Tap the score area or "+" button, then use calculator to count total from your domino cards.

**Q: What happens when reaching 101 points?**  
A: Team that reaches 101 points = LOSES. Opponent is the winner!

**Q: Can I change the score limit?**  
A: Yes, go to Settings → Score Limit, change as desired (default 101).

**Q: Where is data saved?**  
A: Data is saved in browser/app LocalStorage. No server connection needed.

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

Like this project?

* ⭐ Star this repository
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
