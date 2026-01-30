# 🎮 Domino Score - Update Banner & Changelog Feature

## 🚀 Quick Start

### Files Modified:
1. ✅ `index.html` - Added banner & changelog section
2. ✅ `app.js` - Added banner management logic  
3. ✅ `update-banner-styles.css` - NEW styling file

---

## 📦 Installation

### Option 1: Replace Files (Recommended)
Replace your existing files dengan yang sudah dimodifikasi:

```bash
# Backup file lama
cp index.html index.html.backup
cp js/app.js js/app.js.backup

# Copy file baru
cp index.html /path/to/your/project/
cp app.js /path/to/your/project/js/
cp update-banner-styles.css /path/to/your/project/css/
```

### Option 2: Manual Integration
Ikuti langkah-langkah di `DOCUMENTATION.md`

---

## 🔗 Link CSS di HTML

**Tambahkan di `<head>` section:**
```html
<link rel="stylesheet" href="css/update-banner-styles.css">
```

---

## ⚙️ Configuration

### Update Version Number
Di `app.js`, ubah:
```javascript
const APP_VERSION = '2.0.1'; // Change to your version
```

### Update Banner Text
Di `index.html`:
```html
<strong>v2.0.1 Update!</strong>
<span>Bug fixes & no-scroll layout</span>
```

### Add New Changelog Entry
Di About Modal, tambahkan:
```html
<div class="changelog-item">
    <div class="changelog-header">
        <span class="changelog-version">v2.0.1</span>
        <span class="changelog-date">30 Jan 2026</span>
    </div>
    <ul class="changelog-list">
        <li><i class="fas fa-bug"></i> Your change here</li>
    </ul>
</div>
```

---

## 📋 Features

### Update Banner
- ✅ Auto-show pada first visit per version
- ✅ Dismissible dengan localStorage tracking
- ✅ Link to full changelog
- ✅ Smooth slide animation

### Changelog Section
- ✅ Version history lengkap
- ✅ Grouped by release
- ✅ Icon-based categorization
- ✅ Scrollable container
- ✅ Responsive design

---

## 🎨 Customization

### Change Banner Color
```css
.update-banner {
    background: linear-gradient(135deg, #your-color-1, #your-color-2);
}
```

### Change Animation Speed
```css
.update-banner {
    transition: all 0.4s ease; /* Adjust timing */
}
```

---

## 📱 Testing

### Test Banner Appearance
1. Clear localStorage: `localStorage.clear()`
2. Refresh page
3. Banner should appear

### Test Dismissal
1. Click X button
2. Refresh page
3. Banner should NOT appear (until version changes)

### Test New Version
1. Change `APP_VERSION` to different value
2. Refresh page
3. Banner should appear again

---

## 🐛 Common Issues

**Banner tidak muncul:**
- Check console for errors
- Verify CSS file is linked
- Clear browser cache

**Banner muncul terus:**
- Check localStorage: `localStorage.getItem('dismissedUpdateVersion')`
- Pastikan `dismissUpdateBanner()` function works

**Styling tidak match:**
- Verify CSS file path
- Check for CSS conflicts
- Inspect element di browser

---

## 📞 Need Help?

Read full documentation: `DOCUMENTATION.md`

---

## 📝 Changelog Format

```
v2.0.1 (30 Jan 2026)
--------------------
🐛 Fixed score difference indicator bug
🔄 Removed vertical scrolling
📱 Improved mobile layout
🎨 Better color contrast

v2.0.0 (15 Jan 2026)
--------------------
✨ Complete UI redesign
🧮 Built-in calculator
👑 Winner tracking system
📜 Score history chips
🎨 Multiple theme options
```

---

**Made with ❤️ by Farrel Aulia Irfealdo (NullXD)**
