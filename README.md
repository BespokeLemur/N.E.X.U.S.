# N.E.X.U.S.
### *Native Environment for Xero-trace Usb Systems*

<p align="center">
  <img src="https://img.shields.io/badge/version-3.2.0-38bdf8?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PC9zdmc+" />
  <img src="https://img.shields.io/badge/license-MIT-10b981?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PWA-ready-a855f7?style=for-the-badge" />
  <img src="https://img.shields.io/badge/i18n-5_languages-f59e0b?style=for-the-badge" />
  <img src="https://img.shields.io/badge/mobile-responsive-38bdf8?style=for-the-badge" />
</p>

<p align="center">
  <strong>N.E.X.U.S.</strong> is a futuristic, fully portable developer and security ecosystem that runs entirely from a USB drive — no installation required on the host machine.
</p>

---

## ✨ Features

| Module | Description |
|--------|-------------|
| 🔴 **Ventoy Multi-Boot** | Turn any USB into a bootable multi-ISO drive |
| 📦 **Portable Dev Pack** | VS Code, Git, Node.js, Python — all portable |
| 🤖 **Offline AI Node** | Local LLM (Qwen2.5-Coder, Phi-3) — works without internet |
| 🐳 **Docker Offline Cache** | Pre-cached container images on USB |
| 🔐 **Code Vault (AES-256)** | Encrypt your projects with military-grade encryption |
| 🗝️ **SSH & Token Vault** | Manage SSH keys and API tokens securely |
| 🛡️ **Security Scanner** | ClamAV virus scan + Sysinternals audit |
| 📋 **SBOM Auditor** | CycloneDX license compliance auditing |
| 📡 **P2P Direct Share** | WebRTC peer-to-peer file transfer — no cloud |
| 🎨 **Dotfiles Manager** | Carry your shell config everywhere |
| ☁️ **Cloud Backup** | Zero-knowledge encrypted sync to GitHub Gist / Cloudflare R2 |
| 📱 **Mobile Companion** | Real QR code — monitor USB from your phone |
| 💾 **ISO Hub** | Download & manage Linux/Windows ISOs |
| 🔍 **Host Auditor** | Detect what's installed on any host machine |
| ⚡ **USB Benchmark** | Sequential read/write + S.M.A.R.T. health check |
| 🎮 **Dev Break Lounge** | Terminal retro games for coding breaks |
| 📊 **Dashboard** | Live system overview with animated stats |
| 🌐 **Network Scanner** | Discover N.E.X.U.S. peers on local network |

---

## 🌍 Languages Supported

🇹🇷 Turkish | 🇺🇸 English | 🇩🇪 German | 🇪🇸 Spanish | 🇫🇷 French

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org) v18+ (for running the dev server)
- A modern browser (Chrome, Firefox, Edge, Safari)

### Installation

```bash
# Clone the repository
git clone https://github.com/BespokeLemur/N.E.X.U.S.git
cd N.E.X.U.S.

# Install dependencies
npm install

# Start development server (accessible on local network)
npm run dev
```

The app will be available at:
- **Local:** `http://localhost:8080`
- **Network (Mobile):** `http://<your-ip>:8080`

### Mobile Access
1. Run `npm run dev`
2. Open N.E.X.U.S. on your computer
3. Navigate to **Mobile Companion** tab
4. Scan the QR code with your phone
5. Both devices must be on the **same WiFi network**

### Build for Production

```bash
npm run build
# Output: ./dist/
```

---

## 📱 PWA — Add to Home Screen

N.E.X.U.S. is a Progressive Web App (PWA). After opening on mobile:
- **Android (Chrome):** Tap menu → "Add to Home Screen"
- **iOS (Safari):** Tap Share → "Add to Home Screen"

This gives you a native app-like experience with offline support.

---

## 🏗️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Vite 5** | Dev server & build tool |
| **Vanilla JS (ES Modules)** | Zero framework overhead |
| **Custom CSS** | Glassmorphism dark design system |
| **Lucide Icons** | Beautiful SVG icon set |
| **Google Fonts** | Orbitron + JetBrains Mono + Inter |
| **api.qrserver.com** | Real scannable QR code generation |

---

## 📁 Project Structure

```
N.E.X.U.S./
├── src/
│   ├── components/          # UI modules (18 components)
│   │   ├── Dashboard.js     # Main dashboard
│   │   ├── VentoyManager.js # Ventoy multi-boot
│   │   ├── AiNode.js        # Offline AI
│   │   ├── MobileCompanion.js # QR & mobile
│   │   └── ...              # 14 more modules
│   ├── i18n.js              # 5-language translation engine
│   ├── state.js             # Central state management
│   └── main.js              # App entry point
├── public/
│   └── manifest.json        # PWA manifest
├── style.css                # Design system
├── index.html               # Shell HTML
├── vite.config.js           # Vite configuration
└── package.json
```

---

## ⚙️ Configuration

### Network Setup (for Mobile Access)
The dev server runs on `0.0.0.0:8080` by default. To change the port:

```js
// vite.config.js
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8080, // change this
  }
});
```

### Windows Firewall
If mobile can't connect, allow port 8080 in Windows Firewall:
```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "N.E.X.U.S. Dev Server" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 8080
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

## 🔗 Links

- **Live Demo:** Coming soon
- **GitHub:** [BespokeLemur/N.E.X.U.S.](https://github.com/BespokeLemur/N.E.X.U.S.)
- **Issues:** [Report a bug](https://github.com/BespokeLemur/N.E.X.U.S./issues)

---

<p align="center">Made with ⚡ by <a href="https://github.com/BespokeLemur">BespokeLemur</a></p>
