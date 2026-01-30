# 📱 Termux Installation Guide

Quick guide untuk install dan run Domino Score NullXD di Termux (Android)

---

## 📥 Step 1: Install Termux

Download Termux dari **F-Droid** (JANGAN dari Play Store!):
- 🔗 Link: https://f-droid.org/packages/com.termux/

---

## ⚙️ Step 2: Setup Termux

Jalankan command berikut satu per satu:

```bash
# Update packages
pkg update && pkg upgrade -y

# Install Git
pkg install git -y

# Install Python (untuk server)
pkg install python -y

# (Opsional) Install Node.js sebagai alternatif
pkg install nodejs -y
```

---

## 📦 Step 3: Clone Project

```bash
# Clone repository
git clone https://github.com/nullxdbot/domino.git

# Masuk ke folder project
cd domino

# Cek isi folder
ls -la
```

---

## 🚀 Step 4: Run Server

### Option A: Python Server (Recommended)

```bash
# Run server di port 8000
python -m http.server 8000
```

### Option B: Node.js Server

```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

---

## 🌐 Step 5: Access Aplikasi

### Akses Lokal (di device yang sama)

Buka browser di HP Anda, ketik:
```
http://localhost:8000
```

### Akses dari Device Lain (via WiFi)

1. **Cek IP Address HP Anda:**
   ```bash
   # Di Termux
   ifconfig
   
   # Atau lebih simple:
   ip addr show wlan0 | grep inet
   ```

2. **Cari yang seperti ini:**
   ```
   inet 192.168.1.100/24
        ↑ ini IP address Anda
   ```

3. **Akses dari device lain:**
   ```
   http://192.168.1.100:8000
   ```

---

## 💡 Tips & Tricks

### Keep Server Running in Background

**Option 1: Using tmux**
```bash
# Install tmux
pkg install tmux -y

# Start tmux session
tmux

# Run server
python -m http.server 8000

# Detach dari session: tekan Ctrl+B lalu D
# Re-attach: tmux attach
```

**Option 2: Using nohup**
```bash
# Run in background
nohup python -m http.server 8000 &

# Check if running
ps aux | grep python

# Stop server
pkill -f "http.server"
```

### Auto-Start on Boot (Advanced)

```bash
# Install termux-services
pkg install termux-services -y

# Restart termux setelah install
exit
# Buka Termux lagi

# Buat script untuk auto-start
mkdir -p ~/.termux/boot
nano ~/.termux/boot/start-domino-server.sh

# Isi file dengan:
#!/data/data/com.termux/files/usr/bin/bash
cd ~/domino
python -m http.server 8000

# Save: Ctrl+O, Enter, Ctrl+X

# Beri permission
chmod +x ~/.termux/boot/start-domino-server.sh

# Restart HP untuk test
```

### Update Project

```bash
# Masuk ke folder project
cd domino

# Pull latest changes
git pull origin main

# Restart server
```

---

## 🐛 Troubleshooting

### Error: Permission Denied

```bash
# Berikan storage permission
termux-setup-storage
```

### Error: Port Already in Use

```bash
# Gunakan port lain
python -m http.server 8080

# Atau kill process yang pakai port 8000
pkill -f "http.server"
```

### Server Tidak Bisa Diakses dari Device Lain

1. **Pastikan di WiFi yang sama**
2. **Check firewall** (jika ada)
3. **Coba port lain** (contoh: 8080, 3000)
4. **Restart server**

### Termux Crash/Force Close

```bash
# Update semua packages
pkg update && pkg upgrade -y

# Reinstall python
pkg reinstall python
```

---

## 📊 System Requirements

### Minimum:
- Android 7.0+
- 100 MB free storage
- RAM 512 MB

### Recommended:
- Android 10.0+
- 500 MB free storage
- RAM 2 GB+

---

## 🎯 Quick Commands Reference

```bash
# Start server
cd ~/domino && python -m http.server 8000

# Stop server (Ctrl + C)

# Check IP
ifconfig | grep inet

# View server logs
# (logs muncul di terminal saat server berjalan)

# Update project
cd ~/domino && git pull

# Clear cache
cd ~/domino && rm -rf __pycache__
```

---

## 🔧 Advanced: Custom Port & Settings

### Use Custom Port

```bash
# Port 3000
python -m http.server 3000

# Port 5500
python -m http.server 5500
```

### Bind to Specific IP

```bash
# Only localhost (tidak bisa diakses dari device lain)
python -m http.server 8000 --bind 127.0.0.1

# All interfaces (bisa diakses dari device lain)
python -m http.server 8000 --bind 0.0.0.0
```

---

## 📱 Alternative: Acode Editor

Install Acode dari Play Store untuk edit code langsung di HP:

1. Install **Acode** atau **Code Editor**
2. Open folder `domino`
3. Edit files directly
4. Save & refresh browser

---

## 💬 Need Help?

- 📧 Email: farelauliairfealdo99999@gmail.com
- 💬 Telegram: [@farrelauliairfealdo](https://t.me/farrelauliairfealdo)
- 🐛 Issues: [GitHub Issues](https://github.com/nullxdbot/domino/issues)

---

## ✅ Checklist Instalasi

- [ ] Termux installed dari F-Droid
- [ ] Git installed (`pkg install git`)
- [ ] Python installed (`pkg install python`)
- [ ] Project cloned (`git clone ...`)
- [ ] Server running (`python -m http.server 8000`)
- [ ] Accessible di browser (`http://localhost:8000`)
- [ ] (Optional) Tmux installed untuk background process
- [ ] (Optional) Auto-start configured

---

**Happy Gaming! 🎲🎉**

Made with ❤️ for Termux users
