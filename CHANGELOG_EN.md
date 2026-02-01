# 📝 CHANGELOG

🌐 **Language:** [English](CHANGELOG_EN.md) | [Indonesia](CHANGELOG.md)

> Version history and release notes for Domino Score NullXD

---

## Version 2.2 (2026-02-02) - Android Native Edition 🚀

### ✨ New Features
- 📱 **Official APK Release:** Native Android app with official Cube icon and full-screen experience
- 🎯 **Native App Experience:** Removed browser bar for more immersive experience
- 🛡️ **Safety Dialogs:** Confirmation dialogs before Reset and Exit to prevent accidental actions
- ⚡ **Hardware Acceleration:** Faster performance with GPU acceleration

### 🔧 Improvements
- 🎨 **Layout Optimization:** Both player cards now fit perfectly on one screen (No Scroll)
- 🚀 **Performance Boost:** Optimized rendering and animations for smoother experience
- 📱 **Android Optimization:** Specifically optimized for Android devices
- 💾 **Better APK Packaging:** Smaller APK size with efficient asset loading

### 🐛 Bug Fixes
- ✅ Fixed score difference logic showing wrong team
- ✅ Fixed layout overflow on small screens
- ✅ Improved stability for long-running sessions

---

## Version 2.1 (2026-01-30) - Optimization Update

### 🐛 Critical Bug Fixes

#### Score Difference Logic Fixed
**File:** `js/app.js` - Lines 177-193

**Problem:**
```javascript
// BEFORE - WRONG!
if (scores[0] < scores[1]) {
    diffEl.querySelector('.diff-text').textContent = `Team Alpha Leading +${diff}`;
    // But if scores[0] < scores[1], it means Team Beta is leading!
}
```

**Fixed:**
```javascript
// AFTER - CORRECT!
if (scores[0] > scores[1]) {
    // FIXED: Team Alpha (player 0) leads if scores[0] > scores[1]
    diffEl.querySelector('.diff-text').textContent = `Team Alpha Leading +${diff}`;
    diffEl.className = 'score-diff-card leading-p1';
} else {
    // FIXED: Team Beta (player 1) leads if scores[1] > scores[0]
    diffEl.querySelector('.diff-text').textContent = `Team Beta Leading +${diff}`;
    diffEl.className = 'score-diff-card leading-p2';
}
```

### 🎨 Layout Optimizations

**Problem:** Both player cards didn't fit on one screen, scrolling required

**Solution:** Optimized padding, margins, and element sizes

#### Change Details:

| Element | Before | After | Reduction |
|---------|--------|-------|-----------|
| **Container** |
| padding | 20px | 12px | -40% |
| **Header** |
| padding | 20px 24px | 14px 20px | -30% |
| margin-bottom | 24px | 12px | -50% |
| **Score Diff Card** |
| padding | 16px 20px | 10px 16px | -35% |
| margin-bottom | 24px | 12px | -50% |
| **Player Cards** |
| padding | 24px | 16px | -33% |
| gap between cards | 20px | 12px | -40% |
| **Score Display** |
| padding | 32px 20px | 20px 16px | -38% |
| font-size | 72px | 56px | -22% |
| **Progress Bar** |
| height | 40px | 32px | -20% |
| **Action Buttons** |
| height | 56px | 48px | -14% |

#### Result:
- **Total height saved:** ~200-250px
- **Both cards now fit perfectly on one screen** ✅
- **No scrolling needed!** 🎉

### 📊 Visual Comparison

```
BEFORE (Original):
┌─────────────────┐
│    Header       │ 88px
├─────────────────┤
│  Score Diff     │ 52px
├─────────────────┤
│                 │
│   Player 1      │
│   Card          │ ~420px
│                 │
├─────────────────┤
│                 │  ← SCROLLING NEEDED!
│   Player 2      │
│   Card          │ ~420px (HIDDEN)
│                 │
└─────────────────┘
Total: ~1000px+


AFTER (Optimized):
┌─────────────────┐
│    Header       │ 62px
├─────────────────┤
│  Score Diff     │ 34px
├─────────────────┤
│                 │
│   Player 1      │
│   Card          │ ~310px
│                 │
├─────────────────┤
│                 │  ← EVERYTHING FITS!
│   Player 2      │
│   Card          │ ~310px
│                 │
└─────────────────┘
Total: ~750px (fits on most screens!)
```

---

## Version 2.0.0 (2025-12) - Major Redesign 🎨

### ✨ Major Features
- 🎨 **Complete UI/UX Redesign:** Modern interface with glassmorphism effect
- 📱 **PWA Support:** Install as app on desktop and mobile
- 🎵 **Sound Effects:** Audio feedback for clicks and victory
- 🎨 **4 Color Themes:** Purple (default), Blue, Green, Pink
- 🌙 **Dark Mode:** Dark theme for eye comfort
- 📊 **Score History:** Track all score changes
- 🧮 **Calculator Mode:** Integrated calculator for quick calculations

### 🎯 Core Features
- ✅ Real-time score tracking
- ✅ Win counter for each team
- ✅ Visual progress bar
- ✅ Score difference indicator
- ✅ Customizable score limit

### 🔧 Technical Improvements
- ⚡ Hardware accelerated animations
- 💾 LocalStorage for auto-save
- 🔄 Service Worker for offline mode
- 📱 Responsive design for all screen sizes

---

## Version 1.0.0 (2025-11) - Initial Release 🎉

### ✨ Features
- ✅ Basic score tracking for 2 players
- ✅ Add/Remove score functionality
- ✅ Win detection
- ✅ Reset game
- ✅ Simple, clean interface

---

## 📋 File Changes Summary

### Version 2.2
- ✅ **APK Build:** Native Android packaging
- ✅ **index.html:** Added exit confirmation
- ✅ **manifest.json:** Updated for native app
- ✅ **Icons:** New Cube icon set

### Version 2.1
- ✅ **js/app.js:** Fixed score difference logic
- ✅ **css/style.css:** Optimized layout for no-scroll design

### Version 2.0
- ✅ **index.html:** Complete restructure
- ✅ **css/style.css:** New design system
- ✅ **js/app.js:** Refactored with new features
- ✅ **manifest.json:** PWA configuration
- ✅ **sw.js:** Service Worker implementation
- ✅ **Audio files:** Added sound effects

---

## ✅ Testing & Compatibility

### Tested Platforms
- ✅ Mobile Chrome (Android)
- ✅ Mobile Safari (iOS)
- ✅ Desktop Chrome
- ✅ Desktop Firefox
- ✅ Desktop Safari
- ✅ Edge
- ✅ PWA (Desktop & Mobile)
- ✅ Native Android APK

### Screen Sizes Tested
- ✅ 667px (iPhone SE)
- ✅ 736px (iPhone 8 Plus)
- ✅ 812px (iPhone X)
- ✅ 844px (iPhone 12)
- ✅ 896px (iPhone 11 Pro Max)
- ✅ 1920x1080 (Desktop)

---

## 🐛 Known Issues

### Current Issues (v2.2)
- Audio autoplay might be blocked by browser (requires user interaction)
- Some older browsers might not support all CSS features

### Fixed Issues
- ✅ Score difference showing wrong team (v2.1)
- ✅ Layout overflow on small screens (v2.1)
- ✅ Progress bar not updating correctly (v2.0)
- ✅ History not saved after refresh (v2.0)

---

## 📅 Release Timeline

```
Nov 2025  ──►  Dec 2025  ──►  Jan 2026  ──►  Feb 2026
   v1.0         v2.0          v2.1          v2.2
  Initial    Major Redesign  Bug Fixes   Android Native
```

---

## 🔮 Upcoming Features

### Planned for v2.3
- [ ] Multi-player support (3-4 players)
- [ ] Game statistics & analytics
- [ ] Export/Import game data
- [ ] Cloud sync (optional)

### Planned for v3.0
- [ ] Tournament mode
- [ ] Multiple language support (i18n)
- [ ] Custom themes builder
- [ ] Advanced statistics

---

## 📞 Support & Feedback

Found a bug or have suggestions?
- 🐛 **Report Bug:** [GitHub Issues](https://github.com/nullxdbot/domino/issues)
- 💡 **Request Feature:** [GitHub Issues](https://github.com/nullxdbot/domino/issues)
- 💬 **Discussion:** [GitHub Discussions](https://github.com/nullxdbot/domino/discussions)

---

<div align="center">

**Made with ❤️ by Farrel Aulia Irfealdo (NullXD)**

🇮🇩 Indonesia

</div>
