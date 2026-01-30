# 📦 Version Management Guide

## 🔢 Current Version: **2.0.1**

---

## 📝 Where to Update Version

Saat release versi baru, update version number di **5 files** ini:

### 1. **package.json** (Line 3)
```json
{
  "name": "domino-score-nullxd",
  "version": "2.0.1",  ← UPDATE INI
  "description": "...",
}
```

### 2. **manifest.json** (Opsional - add version field)
```json
{
  "name": "Domino Score NullXD",
  "short_name": "Domino Score",
  "version": "2.0.1",  ← TAMBAHKAN INI (opsional)
  "description": "Score keeper untuk permainan domino",
}
```

### 3. **index.html** (About Modal - Line 416)
```html
<p class="version">Version 2.0.1</p>  ← UPDATE INI
```

### 4. **README.md** (Line 3 & Changelog section)
```markdown
[![Version](https://img.shields.io/badge/version-2.0.1-blue.svg)]  ← UPDATE INI

## 📝 Changelog

### Version 2.0.1 (Current)  ← UPDATE INI
- Changes here...
```

### 5. **VERSION** (Single line file)
```
2.0.1
```

### 6. **CHANGELOG.md** (Add new section at top)
```markdown
# CHANGELOG

## Version 2.0.1 - Date: January 31, 2026  ← ADD NEW SECTION

### Added
- New feature...

### Fixed
- Bug fix...

### Changed
- Improvement...
```

---

## 📊 Semantic Versioning (SemVer)

Format: **MAJOR.MINOR.PATCH** (contoh: 2.0.1)

### MAJOR (2.x.x)
- Breaking changes
- Major redesign
- Complete rewrite
- **Contoh**: 1.0.0 → 2.0.0

### MINOR (x.0.x)
- New features
- Non-breaking additions
- New functionality
- **Contoh**: 2.0.0 → 2.1.0

### PATCH (x.x.1)
- Bug fixes
- Performance improvements
- Small tweaks
- **Contoh**: 2.0.0 → 2.0.1

---

## 🚀 Release Workflow

### Step 1: Update Version Numbers

```bash
# Tentukan versi baru
NEW_VERSION="2.0.2"  # atau 2.1.0, atau 3.0.0

# Update manual di 6 files di atas
```

### Step 2: Update CHANGELOG.md

```markdown
# CHANGELOG

## Version 2.0.2 - Date: January 31, 2026

### Fixed
- Fixed calculator bug
- Improved performance

### Added
- Added new theme

---

## Version 2.0.1 - Date: January 30, 2026
...
```

### Step 3: Commit Changes

```bash
# Add all changes
git add .

# Commit dengan version tag
git commit -m "chore: bump version to 2.0.2"

# Tag the release
git tag -a v2.0.2 -m "Release version 2.0.2"

# Push changes
git push origin main

# Push tags
git push origin --tags
```

### Step 4: Create GitHub Release

1. Go to: https://github.com/nullxdbot/domino/releases
2. Click **"Draft a new release"**
3. Choose tag: `v2.0.2`
4. Title: `Version 2.0.2`
5. Description: Copy dari CHANGELOG.md
6. Attach files (optional): ZIP of source code
7. Click **"Publish release"**

---

## 📋 Version History

### Version 2.0.1 (Current)
- **Date**: January 30, 2026
- **Type**: Patch (Bug Fix)
- **Changes**:
  - 🐛 Fixed score difference indicator
  - 🎨 Optimized layout for no-scroll design
  - ✅ Both player cards fit perfectly on screen

### Version 2.0.0
- **Date**: January 2026
- **Type**: Major (Complete Redesign)
- **Changes**:
  - ✨ Complete UI/UX redesign
  - ✨ Added PWA support
  - ✨ Added sound effects
  - ✨ Added 4 color themes
  - ✨ Added compact mode
  - ✨ Added calculator mode
  - ✨ Auto-save functionality

### Version 1.0.0
- **Date**: 2025
- **Type**: Initial Release
- Basic score keeper functionality

---

## 🔄 Quick Commands

### Check Current Version

```bash
# Via package.json
cat package.json | grep version

# Via VERSION file
cat VERSION

# Via git tags
git describe --tags --abbrev=0
```

### Automated Version Bump (Optional)

**Using npm version:**

```bash
# Patch (2.0.1 → 2.0.2)
npm version patch

# Minor (2.0.1 → 2.1.0)
npm version minor

# Major (2.0.1 → 3.0.0)
npm version major
```

**Manual script** (optional - create `bump-version.sh`):

```bash
#!/bin/bash

# Usage: ./bump-version.sh 2.0.2

NEW_VERSION=$1

if [ -z "$NEW_VERSION" ]; then
    echo "Usage: ./bump-version.sh <version>"
    exit 1
fi

# Update VERSION file
echo $NEW_VERSION > VERSION

# Update package.json
sed -i "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" package.json

# Update README.md badge
sed -i "s/version-.*-blue/version-$NEW_VERSION-blue/" README.md

echo "Version bumped to $NEW_VERSION"
echo "Don't forget to:"
echo "1. Update index.html (About modal)"
echo "2. Update CHANGELOG.md"
echo "3. Commit and tag: git tag v$NEW_VERSION"
```

---

## 🎯 Checklist untuk Release Baru

Sebelum release versi baru, pastikan:

- [ ] Version number updated di semua files (6 files)
- [ ] CHANGELOG.md updated dengan perubahan
- [ ] All tests passed (manual testing)
- [ ] No console errors
- [ ] PWA still works
- [ ] Works offline
- [ ] Responsive on all devices
- [ ] Sound effects work
- [ ] All features functional
- [ ] README.md updated if needed
- [ ] Git commit dengan message yang jelas
- [ ] Git tag created (v2.0.x)
- [ ] Pushed to GitHub
- [ ] GitHub Release created
- [ ] Live demo updated (GitHub Pages)

---

## 📞 Questions?

If you're confused about versioning:
- 📧 Email: farelauliairfealdo99999@gmail.com
- 🐛 Open Issue: https://github.com/nullxdbot/domino/issues

---

**Last Updated:** January 31, 2026  
**Current Version:** 2.0.1
