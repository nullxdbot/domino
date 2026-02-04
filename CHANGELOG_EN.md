# 📝 CHANGELOG

🌐 **Language:** [English](CHANGELOG_EN.md) | [Indonesia](CHANGELOG.md)

> Change log and version history of Domino Score NullXD

---

## Version 2.3 (2026-02-04) - Multi-language & Clean Update 🌍

### ✨ New Features
- 🌍 **Multi-language Support:** Full support for **Bahasa Indonesia** and **English**. Switch language instantly through Settings menu.
- 💾 **Language Persistence:** App automatically remembers your last language choice.

### 🔧 Improvements
- 🧹 **Clean Code Architecture:** Complete code cleanup (HTML/CSS/JS), removed unnecessary comments, and tidied structure for lighter weight.
- ⚡ **Performance Boost:** Code optimized for better execution speed.
- 🎨 **Dynamic UI:** Interface text now dynamically adjusts to language character length to keep layout neat.

### 🐛 Bug Fixes
- ✅ Fixed display glitch when switching languages.
- ✅ Ensured "Round" and "Score" status saved safely on refresh.
- ✅ Fixed text consistency in confirmation dialogs.

---

## Version 2.2 (2026-02-02) - Android Native Edition 🚀

### ✨ New Features
- 📱 **Official APK Release:** Native Android app with official Cube icon.
- 🎯 **Full Screen Experience:** Full display without browser bar interruption.
- 🛡️ **Safety Dialogs:** Confirmation dialog before Reset and Exit to prevent accidental actions.

### 🔧 Improvements
- 🎨 **Layout Optimization:** Both player cards now fit perfectly on one screen (No Scroll).
- 🚀 **Performance Boost:** Rendering and animation optimization for smoother experience.
- 📱 **Android Optimization:** Specially optimized for Android device screens.

### 🐛 Bug Fixes
- ✅ Fixed score difference logic showing wrong team.
- ✅ Fixed layout overflow on small screens.
- ✅ Improved stability for long-running sessions.

---

## Version 2.1 (2026-01-30) - Optimization Update

### 🐛 Critical Bug Fixes

#### Score Difference Logic Fixed
**File:** `js/app.js`

**Issue:**
"Leading" indicator was previously reversed (showing losing team as leading).

**Fixed:**
Score comparison logic fixed so badge and "Leading" text always point to team with higher score.

### 🎨 Layout Optimizations

**Issue:** Both player cards didn't fit on one screen, required scrolling.

**Solution:** Optimized padding, margin, and element sizes.

#### Results:
- **Total height reduced:** ~250px
- **Both cards now fit perfectly on one screen** ✅
- **No more scrolling needed!** 🎉

---

## Version 2.0.0 (2025-12) - Major Redesign 🎨

### ✨ Major Features
- 🎨 **Complete UI/UX Redesign:** Modern interface with glassmorphism effect.
- 🎵 **Sound Effects:** Audio feedback for click and victory.
- 🎨 **4 Color Themes:** Purple (default), Blue, Green, Pink.
- 🌙 **Dark Mode:** Dark theme for eye comfort.
- 📊 **Score History:** Track all score changes.
- 🧮 **Calculator Mode:** Integrated calculator for quick calculations.

### 🎯 Core Features
- ✅ Real-time score tracking.
- ✅ Win counter for each team.
- ✅ Visual progress bar.
- ✅ Score difference indicator.
- ✅ Customizable score limit.

---

## Version 1.0.0 (2025-11) - Initial Release 🎉

### ✨ Features
- ✅ Basic score tracking for 2 players.
- ✅ Add/Remove score functionality.
- ✅ Win detection.
- ✅ Reset game.
- ✅ Simple, clean interface.

---

<div align="center">

**[⬆ Back to Top](#-changelog)**

</div>
