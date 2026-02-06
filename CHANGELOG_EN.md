# 📝 CHANGELOG

🌐 **Languages:** [English](CHANGELOG_EN.md) | [Indonesia](CHANGELOG.md)

> Changelog and version history of Domino Score NullXD

---

## Version 2.4 (2026-02-06) - Optimal & Modern Design 🎯

### ✨ New Features
- 🎯 **Branding Update:** Default team name changed from "TEAM ALPHA" to "TEAM NULLXD" for stronger brand identity.
- 📦 **Compact Mode:** Properly functioning compact mode for devices with smaller screens.
- 🎨 **Custom Font:** Implementation of custom font in all dialogs for a more unique appearance.
- 🌈 **Social Media Dialog Redesign:** Social media dialog with attractive and modern gradient background.

### 🔧 Improvements
- 🏆 **Traditional Domino Logic:** Fixed win/lose logic according to traditional village domino rules - player who reaches/exceeds 101 points limit = LOSE (not win).
- 📱 **Optimal Full Screen UI:** Specially optimized for 1440x3200 screens (395 ppi) to fit full screen without scrolling.
- 📊 **"X Remaining" Info:** Clearer and more informative text format ("46 remaining" vs "Limit remaining: 46").
- ⚡ **Spacing Optimization:** Comprehensive optimization for padding, margin, and gap in all elements.
- 🎨 **Visual Polish:** Larger icons, centered text, gradient backgrounds, and shadow effects.

### 📐 Layout Optimization Details
- **App Container:** Adjusted padding (14px top, 20px bottom)
- **Header:** Optimized brand icon size, font, and button
- **Player Card:** Adjusted padding, score display, progress bar
- **Action Button:** Increased height for better touch target
- **History Section:** Optimized max-height and spacing
- **VS Circle:** Optimal size for visual hierarchy

### 🐛 Bug Fixes
- ✅ Fixed inverted win/lose logic (player reaching limit now truly loses).
- ✅ Layout no longer cut off on devices with 1440x3200 screens.
- ✅ Compact mode now properly functions with correct CSS.

---

## Version 2.3 (2026-02-04) - Multi-language Update & Clean Code 🌍

### ✨ New Features
- 🌍 **Multi-language Support:** Full support for **Bahasa Indonesia** and **English**. Switch language instantly via Settings menu.
- 💾 **Language Persistence:** App automatically remembers your last language choice.

### 🔧 Improvements
- 🧹 **Clean Code Architecture:** Total code cleanup (HTML/CSS/JS), removing unnecessary comments and tidying structure to be lighter.
- ⚡ **Performance Improvement:** Code optimized for better execution speed.
- 🎨 **Dynamic UI:** Interface text now dynamically adjusts to language character length to keep layout tidy.

### 🐛 Bug Fixes
- ✅ Fixed display glitch when switching languages.
- ✅ Ensured "Round" and "Score" status saved safely on refresh.
- ✅ Fixed text consistency in confirmation dialogs.

---

## Version 2.2 (2026-02-02) - Android Native Edition 🚀

### ✨ New Features
- 📱 **Official APK Release:** Native Android app with official Cube icon.
- 🎯 **Full Screen Experience:** Full display without browser bar interruptions.
- 🛡️ **Security Dialog:** Confirmation dialog before Reset and Exit to prevent accidental actions.

### 🔧 Improvements
- 🎨 **Layout Optimization:** Both player cards now fit perfectly in one screen (No Scroll).
- 🚀 **Performance Enhancement:** Rendering and animation optimization for smoother experience.
- 📱 **Android Optimization:** Specially optimized for Android device screens.

### 🐛 Bug Fixes
- ✅ Fixed score difference logic showing wrong team.
- ✅ Fixed layout overflow on small screens.
- ✅ Improved stability for long game sessions.

---

## Version 2.1 (2026-01-30) - Optimization Update

### 🐛 Critical Bug Fixes

#### Score Difference Logic Fix
**File:** `js/app.js`

**Issue:**
"Leading" indicator was previously inverted (showing losing team as leading).

**Fixed:**
Score comparison logic fixed so badge and "Leading" text always point to team with higher score.

### 🎨 Layout Optimization

**Issue:** Both player cards didn't fit in one screen, had to scroll.

**Solution:** Optimization of padding, margin, and element sizes.

#### Results:
- **Total height reduced:** ~250px
- **Both cards now fit perfectly in one screen** ✅
- **No more scrolling needed!** 🎉

---

## Version 2.0.0 (2025-12) - Major Redesign 🎨

### ✨ Main Features
- 🎨 **Complete UI/UX Redesign:** Modern interface with glassmorphism effects.
- 🎵 **Sound Effects:** Audio feedback for clicks and wins.
- 🎨 **4 Color Themes:** Purple (default), Blue, Green, Pink.
- 🌙 **Dark Mode:** Dark theme for eye comfort.
- 📊 **Score History:** Track all score changes.
- 🧮 **Calculator Mode:** Integrated calculator for quick calculations.

### 🎯 Core Features
- ✅ Real-time score tracking.
- ✅ Win counter for each team.
- ✅ Visual progress bar.
- ✅ Score difference indicator.
- ✅ Adjustable score target.

---

## Version 1.0.0 (2025-11) - Initial Release 🎉

### ✨ Features
- ✅ Basic score tracking for 2 players.
- ✅ Add/subtract score function.
- ✅ Win detection.
- ✅ Game reset.
- ✅ Simple and clean interface.

---

<div align="center">

**[⬆ Back to Top](#-changelog)**

</div>
