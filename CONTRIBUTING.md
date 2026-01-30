# Contributing to Domino Score NullXD

First off, thank you for considering contributing to Domino Score NullXD! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

---

## 📜 Code of Conduct

This project follows a simple code of conduct:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

---

## 🤝 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** and description
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** (if applicable)
- **Environment**: Browser, OS, device

### 💡 Suggesting Features

Feature suggestions are tracked as GitHub issues. When suggesting a feature:

- **Use a clear title** that describes the feature
- **Provide detailed description** of the proposed feature
- **Explain why** this feature would be useful
- **Provide examples** of how it would work

### 🔨 Code Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit with clear messages (`git commit -m 'Add some AmazingFeature'`)
6. Push to your branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

---

## 💻 Development Setup

### Prerequisites

```bash
# Git
git --version

# Python (for local server)
python --version

# Or Node.js
node --version
```

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/domino.git
cd domino

# Create a branch
git checkout -b feature/my-feature

# Run local server
python -m http.server 8000
# or
npx http-server

# Open browser
open http://localhost:8000
```

---

## 📝 Pull Request Process

1. **Update Documentation**: Update README.md if needed
2. **Test Thoroughly**: Test on multiple browsers/devices
3. **Follow Style Guide**: Maintain coding standards
4. **Update CHANGELOG**: Add entry for your changes
5. **Clear Description**: Explain what and why in PR description
6. **Link Issues**: Reference related issues

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile devices
- [ ] PWA features still work

---

## 🎨 Style Guidelines

### JavaScript

```javascript
// Use const/let, not var
const scoreLimit = 101;
let currentScore = 0;

// Use meaningful variable names
// ❌ Bad
const x = 10;

// ✅ Good
const scoreIncrement = 10;

// Use arrow functions
const updateScore = (player, amount) => {
    // function body
};

// Add comments for complex logic
// Calculate progress percentage and update UI
const percentage = Math.min((score / limit) * 100, 100);
```

### CSS

```css
/* Use CSS variables for theming */
:root {
    --primary: #8b5cf6;
    --secondary: #ec4899;
}

/* Use meaningful class names */
.player-card { /* ... */ }
.score-display { /* ... */ }

/* Group related properties */
.button {
    /* Positioning */
    position: relative;
    
    /* Display & Box Model */
    display: flex;
    padding: 12px 24px;
    
    /* Typography */
    font-size: 16px;
    
    /* Visual */
    background: var(--primary);
    border-radius: 12px;
    
    /* Animation */
    transition: all 0.3s ease;
}
```

### HTML

```html
<!-- Use semantic HTML -->
<header>
    <nav><!-- navigation --></nav>
</header>

<main>
    <section><!-- content --></section>
</main>

<!-- Add accessibility attributes -->
<button 
    aria-label="Open settings"
    role="button"
    tabindex="0">
    Settings
</button>

<!-- Use meaningful IDs and classes -->
<div id="player-score-card" class="card player-card">
    <!-- content -->
</div>
```

### Commit Messages

```bash
# Format: <type>: <description>

# Types:
# feat: New feature
# fix: Bug fix
# docs: Documentation changes
# style: Code style changes (formatting)
# refactor: Code refactoring
# test: Test additions/changes
# chore: Build/config changes

# Examples:
git commit -m "feat: add multi-player support"
git commit -m "fix: calculator not showing decimal correctly"
git commit -m "docs: update installation guide"
git commit -m "style: format code with prettier"
```

---

## 🧪 Testing

Before submitting:

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Feature Testing
- [ ] Score tracking works
- [ ] Calculator functions correctly
- [ ] History tracking accurate
- [ ] PWA install works
- [ ] Offline mode works
- [ ] Sound effects play
- [ ] Theme switching works
- [ ] LocalStorage saves data

---

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [PWA Guide](https://web.dev/progressive-web-apps/)
- [JavaScript Best Practices](https://github.com/ryanmcdermott/clean-code-javascript)
- [CSS Guidelines](https://cssguidelin.es/)

---

## ❓ Questions?

- Open an issue for questions
- Join discussions on GitHub
- Contact: farelauliairfealdo99999@gmail.com

---

**Thank you for contributing! 🎉**

Your contributions make this project better for everyone.
