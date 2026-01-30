# 🚀 GITHUB PAGES - DEPLOYMENT GUIDE

## ✅ Files yang Sudah Diperbarui untuk GitHub Pages

### URL Live Demo
**https://nullxdbot.github.io/domino/**

Karena ada subfolder `/domino/`, beberapa file perlu adjustment!

---

## 📦 SEMUA FILES YANG DIPERBARUI

### 🔴 **CRITICAL - Wajib Update** (untuk GitHub Pages)

#### 1. **manifest.json** ⚠️
**PERUBAHAN:**
```json
{
  "start_url": "/domino/",      // CHANGED: "/" → "/domino/"
  "id": "/domino/",              // CHANGED: "/domino-score-nullxd" → "/domino/"
  "scope": "/domino/",           // CHANGED: "/" → "/domino/"
  "version": "2.0.1"             // ADDED: version field
}
```

#### 2. **sw.js** (Service Worker) ⚠️
**PERUBAHAN:**
```javascript
const CACHE_NAME = 'domino-score-v2.0.1';  // CHANGED: version number
const BASE_PATH = '/domino';                // ADDED: base path

const urlsToCache = [
  `${BASE_PATH}/`,                          // CHANGED: menambah BASE_PATH
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/css/style.css`,
  // ... semua path dengan BASE_PATH
];
```

---

### ✅ **UPDATED FILES** (info & links)

#### 3. **index.html**
- Updated audio path: `sfx/sfx-click.wav`, `sfx/sfx-win.m4a`
- Version in About modal: "Version 2.0.1"

#### 4. **README.md**
- Updated links ke: `https://github.com/nullxdbot/domino`
- Updated email: `farelauliairfealdo99999@gmail.com`
- Live demo: `https://nullxdbot.github.io/domino/`

#### 5. **package.json**
- Version: 2.0.1
- Repository links updated
- Homepage: `https://nullxdbot.github.io/domino/`

---

### 📄 **DOCUMENTATION FILES** (baru/updated)

6. **LICENSE** - MIT License
7. **CONTRIBUTING.md** - Contribution guide
8. **TERMUX_GUIDE.md** - Termux installation
9. **VERSIONING.md** - Version management guide
10. **STRUKTUR_FOLDER.md** - Folder structure
11. **VERSION** - Simple version file (2.0.1)
12. **.gitignore** - Git ignore rules
13. **setup-folders.sh** - Automated setup script

---

### 📁 **SOURCE FILES** (unchanged - gunakan yang sudah ada)

14. **CHANGELOG.md** - Version history
15. **app.js** - JavaScript (di folder `js/`)
16. **style.css** - CSS (di folder `css/`)
17. **img/** - Icons & screenshots
18. **sfx/** - Audio files

---

## 📂 STRUKTUR FOLDER FINAL

```
domino/
├── index.html              ← UPDATED (audio paths)
├── manifest.json           ← UPDATED (paths untuk GitHub Pages)
├── sw.js                   ← UPDATED (paths untuk GitHub Pages)
├── package.json            ← UPDATED (links & version)
├── README.md               ← UPDATED (links & email)
├── LICENSE                 ← NEW
├── CONTRIBUTING.md         ← NEW
├── TERMUX_GUIDE.md         ← NEW
├── VERSIONING.md           ← NEW
├── STRUKTUR_FOLDER.md      ← NEW
├── CHANGELOG.md            ← EXISTING
├── VERSION                 ← NEW
├── .gitignore              ← NEW
├── setup-folders.sh        ← NEW
│
├── css/
│   └── style.css           ← EXISTING
│
├── js/
│   └── app.js              ← EXISTING
│
├── img/
│   ├── icon-72.png         ← EXISTING (pastikan ada)
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   ├── icon-512.png
│   ├── screenshot1.png
│   ├── screenshot2.png
│   └── screenshot3.png
│
└── sfx/
    ├── sfx-click.wav       ← EXISTING (pastikan ada)
    └── sfx-win.m4a         ← EXISTING (pastikan ada)
```

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Organize Files

```bash
# Di komputer Anda, struktur harus seperti di atas
cd domino

# Pastikan struktur folder benar
ls -la css/
ls -la js/
ls -la img/
ls -la sfx/
```

### Step 2: Update Files

**Replace these files dengan version yang saya berikan:**
1. ✅ `manifest.json` - WAJIB (GitHub Pages paths)
2. ✅ `sw.js` - WAJIB (GitHub Pages paths)
3. ✅ `index.html` - WAJIB (audio paths)
4. ✅ `README.md` - Updated links
5. ✅ `package.json` - Updated info

**Add these new files:**
6. ✅ `LICENSE`
7. ✅ `CONTRIBUTING.md`
8. ✅ `TERMUX_GUIDE.md`
9. ✅ `VERSIONING.md`
10. ✅ `STRUKTUR_FOLDER.md`
11. ✅ `VERSION`
12. ✅ `.gitignore`
13. ✅ `setup-folders.sh`

### Step 3: Git Commands

```bash
# Add all files
git add .

# Commit
git commit -m "feat: update for GitHub Pages compatibility v2.0.1"

# Tag version
git tag -a v2.0.1 -m "Release version 2.0.1 - GitHub Pages ready"

# Push
git push origin main

# Push tags
git push origin --tags
```

### Step 4: Enable GitHub Pages

1. Go to: **https://github.com/nullxdbot/domino/settings/pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main`
4. **Folder**: `/ (root)`
5. Click **Save**

⏳ Wait 1-2 minutes untuk deployment

### Step 5: Verify

✅ Open: **https://nullxdbot.github.io/domino/**

**Test checklist:**
- [ ] App loads correctly
- [ ] All images load (icons, screenshots)
- [ ] Audio files work (click & win sounds)
- [ ] Calculator works
- [ ] Score tracking works
- [ ] Settings work
- [ ] PWA install button appears
- [ ] Can install as app
- [ ] Offline mode works (after first visit)

---

## 🔍 TROUBLESHOOTING

### ❌ Problem: 404 - Page Not Found

**Solution:**
- Cek GitHub Pages settings
- Pastikan branch = `main` dan folder = `/ (root)`
- Wait 1-2 minutes after enabling

### ❌ Problem: CSS/JS Not Loading

**Solution:**
- Cek struktur folder: `css/style.css`, `js/app.js`
- Cek di browser console (F12) untuk error
- Clear cache: Ctrl+Shift+R (hard refresh)

### ❌ Problem: PWA Install Not Working

**Possible causes:**
1. **manifest.json paths salah**
   - Solution: Gunakan `manifest.json` yang saya berikan
   
2. **Service Worker error**
   - Solution: Gunakan `sw.js` yang saya berikan
   - Check console: F12 → Application → Service Workers

3. **Icons missing**
   - Solution: Pastikan folder `img/` ada dengan semua icons

### ❌ Problem: Audio Not Playing

**Possible causes:**
1. **Files tidak ada di folder `sfx/`**
   - Solution: Pastikan `sfx-click.wav` dan `sfx-win.m4a` ada

2. **Path salah**
   - Solution: Gunakan `index.html` yang saya berikan (sudah fix path)

3. **Browser blocking autoplay**
   - Solution: User harus interact dengan page dulu (ini normal)

### ❌ Problem: Offline Mode Not Working

**Solution:**
1. Visit the site first (cache will be populated)
2. Check Service Worker registered: F12 → Application → Service Workers
3. Try closing all tabs and reopening
4. Clear cache and try again

---

## 🎯 VERIFICATION COMMANDS

### Check if files exist locally:

```bash
cd domino

# Check critical files
ls -la manifest.json
ls -la sw.js
ls -la index.html

# Check folders
ls -la css/
ls -la js/
ls -la img/
ls -la sfx/

# Check if audio files exist
ls -la sfx/sfx-click.wav
ls -la sfx/sfx-win.m4a

# Check if icons exist
ls -la img/icon-*.png
```

### Check Git status:

```bash
git status
git log --oneline -5
git tag
```

### Check live site:

```bash
# Use curl to check if site is up
curl -I https://nullxdbot.github.io/domino/

# Should return: HTTP/2 200
```

---

## 📊 KEY DIFFERENCES

### For Local Development:
```json
// manifest.json
"start_url": "/",
"scope": "/"
```

```javascript
// sw.js
const urlsToCache = [
  '/',
  '/index.html',
  ...
];
```

### For GitHub Pages (nullxdbot.github.io/domino/):
```json
// manifest.json
"start_url": "/domino/",
"scope": "/domino/"
```

```javascript
// sw.js
const BASE_PATH = '/domino';
const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  ...
];
```

---

## ⚙️ OPTIONAL: Custom Domain

Jika mau pakai custom domain (contoh: `domino.nullxd.dev`):

1. **Add CNAME file** di root:
   ```
   domino.nullxd.dev
   ```

2. **Update manifest.json** kembali ke:
   ```json
   "start_url": "/",
   "scope": "/"
   ```

3. **Update sw.js** kembali ke:
   ```javascript
   const BASE_PATH = '';
   // atau hapus BASE_PATH dan gunakan path relatif
   ```

4. **Configure DNS** di domain provider:
   ```
   Type: CNAME
   Name: domino
   Value: nullxdbot.github.io
   ```

---

## ✅ FINAL CHECKLIST

Sebelum push ke GitHub:

- [ ] **manifest.json** updated dengan `/domino/` paths
- [ ] **sw.js** updated dengan BASE_PATH
- [ ] **index.html** updated dengan `sfx/` paths
- [ ] **README.md** updated dengan correct links
- [ ] **package.json** updated dengan correct info
- [ ] All documentation files added
- [ ] Folder structure correct (`css/`, `js/`, `img/`, `sfx/`)
- [ ] All icons exist in `img/`
- [ ] Audio files exist in `sfx/`
- [ ] `.gitignore` added
- [ ] `LICENSE` added
- [ ] Git committed and tagged
- [ ] Pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Live site verified

---

## 🎉 SUCCESS INDICATORS

Your deployment is successful if:

✅ Site loads at: https://nullxdbot.github.io/domino/
✅ No console errors in browser (F12)
✅ PWA install prompt appears
✅ Can install as standalone app
✅ Works offline after first visit
✅ All features functional (calculator, score, sound, themes)
✅ Responsive on mobile devices

---

## 📞 NEED HELP?

- 🐛 **Issues**: https://github.com/nullxdbot/domino/issues
- 📧 **Email**: farelauliairfealdo99999@gmail.com
- 📱 **Telegram**: @farrelauliairfealdo

---

**Last Updated**: January 31, 2026
**Version**: 2.0.1
**Status**: ✅ GitHub Pages Ready
