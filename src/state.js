// N.E.X.U.S. - Central Application State Management (v3.1 i18n Multi-Language Enabled)

const STORAGE_KEY = 'nexus_state_v3_1';

const defaultState = {
  activeTab: 'dashboard', 
  activeProfile: 'web', 
  activeTheme: 'cyberpunk',
  activeLang: 'tr', // 'tr', 'en', 'de', 'es', 'fr'
  activeDriveId: 'usb1',
  isWriteProtected: false,
  soundFxEnabled: true,
  
  drives: [
    {
      id: 'usb1',
      name: 'NEXUS_EXTREME_64',
      letter: 'E:',
      totalBytes: 64000000000,
      usedBytes: 31200000000,
      filesystem: 'exFAT / Ventoy Bootable',
      isVentoyInstalled: true,
      ventoyVersion: 'v1.0.99-nexus',
      isEncrypted: false,
      files: [
        { name: 'ventoy/ventoy.json', type: 'config', size: '2.4 KB' },
        { name: 'ISO/ubuntu-24.04-desktop-amd64.iso', type: 'iso', size: '5.8 GB' },
        { name: 'ISO/archlinux-2026.08.01-x86_64.iso', type: 'iso', size: '1.1 GB' },
        { name: 'ISO/rescuezilla-2.5.1-64bit.iso', type: 'iso', size: '1.2 GB' },
        { name: 'Portable/VSCode-Portable/code.exe', type: 'exe', size: '120 MB' },
        { name: 'Portable/Git-Portable/cmd/git.exe', type: 'exe', size: '85 MB' },
        { name: 'Portable/NodeJS-Portable/node.exe', type: 'exe', size: '65 MB' },
        { name: 'Dotfiles/.zshrc', type: 'config', size: '4 KB' },
        { name: 'Dotfiles/.gitconfig', type: 'config', size: '1 KB' },
        { name: 'AI_Node/ollama_portable.exe', type: 'exe', size: '45 MB' },
        { name: 'AI_Node/models/qwen2.5-coder-1.5b.gguf', type: 'ai', size: '1.4 GB' },
        { name: 'Docker_Cache/postgres-alpine.tar', type: 'docker', size: '85 MB' },
        { name: 'Vault/vault_projects.aes', type: 'vault', size: '4.2 GB' },
        { name: 'SSH_Keys/id_ed25519.aes', type: 'vault', size: '2 KB' },
        { name: 'launch_nexus_env.bat', type: 'script', size: '1.2 KB' },
        { name: 'launch_nexus_env.sh', type: 'script', size: '1.1 KB' }
      ]
    },
    {
      id: 'usb2',
      name: 'NEXUS_DEV_VAULT',
      letter: 'F:',
      totalBytes: 128000000000,
      usedBytes: 12000000000,
      filesystem: 'NTFS',
      isVentoyInstalled: false,
      ventoyVersion: null,
      isEncrypted: false,
      files: [
        { name: 'Backup/project_alpha.zip', type: 'archive', size: '12 GB' }
      ]
    }
  ],

  portableTools: [
    { id: 'vscode', name: 'VS Code Portable', category: 'IDE / Editor', version: '1.92.2', size: '340 MB', description: 'Eklentiler ve kişisel ayarlarınızla birlikte taşınabilir Kod Editörü.', installed: true, icon: 'code-xml', badge: 'Popular', execPath: 'Portable/VSCode-Portable/Code.exe' },
    { id: 'git', name: 'Git Portable', category: 'Version Control', version: '2.46.0', size: '180 MB', description: 'Komut satırı ve GUI araçları içeren tam taşınabilir Git paketi.', installed: true, icon: 'git-branch', badge: 'Essential', execPath: 'Portable/Git-Portable/git-cmd.exe' },
    { id: 'nodejs', name: 'Node.js Portable', category: 'Runtime', version: 'v22.6.0 (LTS)', size: '120 MB', description: 'NPM ve npx paketi dahil bağımsız JavaScript çalıştırma ortamı.', installed: true, icon: 'box', badge: 'LTS', execPath: 'Portable/NodeJS-Portable/node.exe' },
    { id: 'python', name: 'Python Portable (Embedded)', category: 'Runtime', version: '3.12.5', size: '95 MB', description: 'Pip ve sanal ortam destekli taşınabilir Python yorumlayıcısı.', installed: false, icon: 'terminal', badge: 'Recommended', execPath: 'Portable/Python-Portable/python.exe' },
    { id: 'sqlite', name: 'DB Browser for SQLite', category: 'Database', version: '3.12.2', size: '45 MB', description: 'SQLite veritabanlarını oluşturmak ve düzenlemek için hafif GUI.', installed: true, icon: 'database', badge: 'Tool', execPath: 'Portable/SQLiteBrowser/sqlitebrowser.exe' },
    { id: 'bruno', name: 'Bruno / Postman Lite', category: 'API Client', version: '1.24.0', size: '80 MB', description: 'Çevrimdışı, gizlilik odaklı taşınabilir REST & GraphQL API istemcisi.', installed: false, icon: 'send', badge: 'API', execPath: 'Portable/Bruno/bruno.exe' },
    { id: 'browser_dev', name: 'Chromium DevTools Portable', category: 'Browser', version: '128.0', size: '220 MB', description: 'React/Vue/Redux DevTools eklentileri önceden yüklü gizli taşınabilir tarayıcı.', installed: true, icon: 'globe', badge: 'Browser', execPath: 'Portable/Chromium-Dev/chrome.exe' },
    { id: 'rust', name: 'Rustup & Cargo Portable', category: 'Compiler', version: '1.80.1', size: '420 MB', description: 'Sistem dili geliştirme için Rust derleyici ve kütüphane kiti.', installed: false, icon: 'cpu', badge: 'Advanced', execPath: 'Portable/Rust/cargo.exe' }
  ],

  aiModels: [
    { id: 'qwen-coder', name: 'Qwen2.5-Coder 1.5B (GGUF)', size: '1.4 GB', vram: '2.5 GB RAM', downloaded: true, description: 'C++, Python, JavaScript ve Rust için optimize edilmiş çevrimdışı yapay zeka kod modeli.' },
    { id: 'phi3-mini', name: 'Phi-3 Mini Instruct 3.8B', size: '2.2 GB', vram: '4.0 GB RAM', downloaded: false, description: 'Microsoft yapımı genel mantık ve algoritma anlatım modeli.' },
    { id: 'deepseek-coder', name: 'DeepSeek-Coder 1.3B Q4', size: '980 MB', vram: '1.8 GB RAM', downloaded: false, description: 'Hızlı kod üretimi ve hata tespiti için aşırı hafif model.' }
  ],

  dockerImages: [
    { id: 'postgres', name: 'postgres:16-alpine', category: 'Database', size: '85 MB', cached: true },
    { id: 'redis', name: 'redis:7-alpine', category: 'Cache', size: '32 MB', cached: true },
    { id: 'nginx', name: 'nginx:alpine', category: 'Web Server', size: '25 MB', cached: false },
    { id: 'mongodb', name: 'mongo:7.0', category: 'NoSQL DB', size: '210 MB', cached: false }
  ],

  dotfiles: [
    { name: '.gitconfig', target: '~/.gitconfig', synced: true, content: '[user]\n  name = N.E.X.U.S. Engineer\n  email = dev@nexus.io\n[alias]\n  co = checkout\n  st = status' },
    { name: '.zshrc', target: '~/.zshrc', synced: true, content: 'export PATH="/Volumes/NEXUS/Portable:$PATH"\nalias ll="ls -la"\nplugins=(git docker node)' },
    { name: 'starship.toml', target: '~/.config/starship.toml', synced: true, content: '[character]\nsuccess_symbol = "[⚡](bold cyan)"' }
  ],

  p2pPeers: [
    { id: 'p1', name: 'Nexus-Node-Alex (192.168.1.42)', status: 'Online', bytesShared: '1.4 GB' },
    { id: 'p2', name: 'Nexus-Node-Sarah (192.168.1.18)', status: 'Online', bytesShared: '850 MB' }
  ],

  sbomAudits: [
    { pkg: 'express', version: '4.19.2', license: 'MIT', status: 'COMPLIANT', vuln: '0 Low' },
    { pkg: 'jsonwebtoken', version: '9.0.2', license: 'MIT', status: 'COMPLIANT', vuln: '0 Low' },
    { pkg: 'lodash', version: '4.17.21', license: 'MIT', status: 'COMPLIANT', vuln: '0 Low' },
    { pkg: 'crypto-js', version: '4.2.0', license: 'MIT', status: 'COMPLIANT', vuln: '0 Low' }
  ],

  productivityStats: {
    totalHoursCoded: '142.5 Saat',
    commitsMade: 84,
    topLanguage: 'TypeScript / Rust',
    sessionTraceCleaned: true
  },

  sshKeys: [
    { id: 'k1', label: 'github_deploy_key', type: 'ED25519', fingerPrint: 'SHA256:8f3a...91b2', status: 'Encrypted' },
    { id: 'k2', label: 'aws_production_server', type: 'RSA 4096', fingerPrint: 'SHA256:1a4c...72d0', status: 'Encrypted' }
  ],

  benchmarkResult: null,
  cloudSyncAccounts: {
    githubGist: { connected: true, username: 'nexus-dev', lastSync: '2026-09-08 12:40' },
    cloudflareR2: { connected: true, bucket: 'nexus-vault-backup', lastSync: '2026-09-07 19:20' },
    awsS3: { connected: false, bucket: null, lastSync: 'Never' }
  },

  vaultProjects: [
    { id: 'v1', name: 'shot-hub-core', path: 'Vault/shot-hub-core.aes', size: '1.8 GB', lastBackup: '2026-09-08 11:30', status: 'Encrypted (AES-256)', encrypted: true },
    { id: 'v2', name: 'fintech-microservices', path: 'Vault/fintech-microservices.aes', size: '2.4 GB', lastBackup: '2026-09-07 18:45', status: 'Encrypted (AES-256)', encrypted: true }
  ],

  isoHubItems: [
    { id: 'ubuntu-dev', name: 'Ubuntu 24.04 LTS Dev-Edition', category: 'Linux Desktop', size: '5.8 GB', description: 'Docker, VS Code, Git, C++ ve Python geliştirme araçları önceden yüklü canlı imaj.', downloaded: true, progress: 100, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { id: 'arch-linux', name: 'Arch Linux Dev Setup', category: 'Minimal Linux', size: '1.1 GB', description: 'En güncel çekirdek ve özel Hyprland geliştirici yapılandırması.', downloaded: true, progress: 100, sha256: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3' },
    { id: 'kali-sec', name: 'Kali Linux CyberSec Pack', category: 'Security & Audit', size: '4.1 GB', description: 'Siber güvenlik, sızma testleri ve kod analizi araçları içeren canlı ISO.', downloaded: false, progress: 0, sha256: '7b8b965ad4bca0e41ab51de7b31363a1fa49e564164b11e087459b3a32252a12' },
    { id: 'rescuezilla', name: 'Rescuezilla System Recovery', category: 'Diagnostic', size: '1.2 GB', description: 'Disk imajı alma, bölüm kopyalama ve çökertilmiş sistem kurtarma aracı.', downloaded: true, progress: 100, sha256: '3f786850e387550fdab836ed7e6dc881de23001b70e470b7528328659d57a2f1' }
  ],

  hostAuditResult: null,
  terminalLogs: [
    { time: '12:51:02', level: 'info', msg: 'N.E.X.U.S. (Native Environment for Xero-trace Usb Systems) v3.1 i18n initialized.' },
    { time: '12:51:03', level: 'success', msg: 'Drive NEXUS_EXTREME_64 (E:) detected [Ventoy v1.0.99].' },
    { time: '12:51:04', level: 'info', msg: 'Multi-Language i18n Engine Active (TR, EN, DE, ES, FR).' }
  ]
};

class Store {
  constructor() {
    this.state = this.loadState();
    this.listeners = [];
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load local storage state:', e);
    }
    return defaultState;
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save state to local storage:', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.saveState();
    this.listeners.forEach(l => l(this.state));
  }

  getState() {
    return this.state;
  }

  setActiveTab(tab) {
    this.state.activeTab = tab;
    this.notify();
  }

  setLanguage(lang) {
    this.state.activeLang = lang;
    this.addLog('info', `N.E.X.U.S. System Language Changed: ${lang.toUpperCase()}`);
    this.notify();
  }

  setTheme(theme) {
    this.state.activeTheme = theme;
    this.addLog('info', `N.E.X.U.S. UI Theme Changed: ${theme.toUpperCase()}`);
    this.notify();
  }

  toggleWriteProtect() {
    this.state.isWriteProtected = !this.state.isWriteProtected;
    this.addLog(this.state.isWriteProtected ? 'warning' : 'success', `USB Read-Only Mode: ${this.state.isWriteProtected ? 'ACTIVE' : 'OFF'}`);
    this.notify();
  }

  toggleSoundFx() {
    this.state.soundFxEnabled = !this.state.soundFxEnabled;
    this.addLog('info', `N.E.X.U.S. Sound FX: ${this.state.soundFxEnabled ? 'ON' : 'OFF'}`);
    this.notify();
  }

  setActiveProfile(profile) {
    this.state.activeProfile = profile;
    this.addLog('success', `N.E.X.U.S. Profile Switched: ${profile.toUpperCase()} Mode`);
    this.notify();
  }

  setActiveDrive(driveId) {
    this.state.activeDriveId = driveId;
    const drive = this.getActiveDrive();
    this.addLog('info', `Active Drive Switched: ${drive.name} (${drive.letter})`);
    this.notify();
  }

  getActiveDrive() {
    return this.state.drives.find(d => d.id === this.state.activeDriveId) || this.state.drives[0];
  }

  addLog(level, msg) {
    const time = new Date().toLocaleTimeString('tr-TR', { hour12: false });
    this.state.terminalLogs.push({ time, level, msg });
    if (this.state.terminalLogs.length > 100) {
      this.state.terminalLogs.shift();
    }
    this.notify();
  }

  clearLogs() {
    this.state.terminalLogs = [];
    this.notify();
  }

  toggleToolInstall(toolId) {
    if (this.state.isWriteProtected) {
      alert('⚠️ N.E.X.U.S. Read-Only Mode is active!');
      return;
    }

    const tool = this.state.portableTools.find(t => t.id === toolId);
    if (!tool) return;

    tool.installed = !tool.installed;
    const drive = this.getActiveDrive();

    if (tool.installed) {
      this.addLog('success', `${tool.name} installed to N.E.X.U.S. Drive (${drive.letter}).`);
      drive.files.push({ name: tool.execPath, type: 'exe', size: tool.size });
    } else {
      this.addLog('warning', `${tool.name} removed from N.E.X.U.S. Drive.`);
      drive.files = drive.files.filter(f => !f.name.includes(tool.id));
    }
    this.notify();
  }

  installVentoy() {
    if (this.state.isWriteProtected) {
      alert('⚠️ N.E.X.U.S. Read-Only Mode is active!');
      return;
    }
    const drive = this.getActiveDrive();
    drive.isVentoyInstalled = true;
    drive.ventoyVersion = 'v1.0.99-nexus';
    drive.filesystem = 'exFAT / Ventoy Multi-Boot';
    this.addLog('success', `Ventoy Bootloader written to ${drive.letter} successfully.`);
    this.notify();
  }

  addIsoToDrive(isoName, isoSize) {
    if (this.state.isWriteProtected) {
      alert('⚠️ N.E.X.U.S. Read-Only Mode is active!');
      return;
    }
    const drive = this.getActiveDrive();
    const filename = `ISO/${isoName.toLowerCase().replace(/\s+/g, '-')}.iso`;
    drive.files.push({ name: filename, type: 'iso', size: isoSize });
    this.addLog('success', `ISO added to N.E.X.U.S. Drive: ${filename} (${isoSize})`);
    this.notify();
  }

  encryptProject(projectName) {
    if (this.state.isWriteProtected) {
      alert('⚠️ N.E.X.U.S. Read-Only Mode is active!');
      return;
    }
    const drive = this.getActiveDrive();
    const newVault = {
      id: 'v' + (this.state.vaultProjects.length + 1),
      name: projectName,
      path: `Vault/${projectName}.aes`,
      size: '1.2 GB',
      lastBackup: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Encrypted (AES-256)',
      encrypted: true
    };
    this.state.vaultProjects.push(newVault);
    drive.files.push({ name: newVault.path, type: 'vault', size: '1.2 GB' });
    this.addLog('success', `Project encrypted with AES-256: ${projectName}`);
    this.notify();
  }

  runBenchmark() {
    this.addLog('info', 'N.E.X.U.S. Drive Performance Test Started...');
    setTimeout(() => {
      this.state.benchmarkResult = {
        seqRead: '420.5 MB/s',
        seqWrite: '185.2 MB/s',
        rnd4kRead: '42.1 MB/s',
        rnd4kWrite: '18.4 MB/s',
        healthScore: '98%',
        wearLeveling: 'Normal (120 Days Usage)',
        temp: '34°C',
        status: 'Optimal (USB 3.2 Gen 2)'
      };
      this.addLog('success', 'N.E.X.U.S. Benchmark Complete: Read 420.5 MB/s, Write 185.2 MB/s [Health: 98%]');
      this.notify();
    }, 1000);
  }

  purgeHostTrace() {
    this.addLog('warning', '[N.E.X.U.S. Zero-Trace Cleaner] Purging temporary caches, registry keys, and shell history on target host...');
    setTimeout(() => {
      this.addLog('success', '[N.E.X.U.S. Zero-Trace Cleaner] 100% CLEAN! Zero traces left on host machine.');
      this.notify();
    }, 900);
  }

  toggleDockerCache(imageId) {
    if (this.state.isWriteProtected) {
      alert('⚠️ N.E.X.U.S. Read-Only Mode is active!');
      return;
    }
    const img = this.state.dockerImages.find(i => i.id === imageId);
    if (!img) return;

    img.cached = !img.cached;
    this.addLog(img.cached ? 'success' : 'warning', `Docker Image ${img.cached ? 'cached' : 'removed'}: ${img.name}`);
    this.notify();
  }

  runHostAudit() {
    this.addLog('info', 'N.E.X.U.S. Host Environment Audit Started...');
    setTimeout(() => {
      this.state.hostAuditResult = {
        scanTime: new Date().toLocaleTimeString('tr-TR'),
        os: 'Windows 11 Enterprise x64',
        tools: [
          { name: 'Git', installed: true, version: '2.44.0 (Installed)', source: 'Host System' },
          { name: 'Node.js', installed: true, version: 'v20.11.0 (Outdated)', source: 'Host System' },
          { name: 'Python', installed: false, version: 'Not Found', source: 'N.E.X.U.S. Portable Available' },
          { name: 'VS Code', installed: true, version: '1.91.0', source: 'Host System' },
          { name: 'Docker Desktop', installed: false, version: 'Not Found', source: 'N.E.X.U.S. Portable Available' },
          { name: 'Rust Cargo', installed: false, version: 'Not Found', source: 'Missing' }
        ],
        missingCount: 3,
        recommendation: "Target machine lacks Python & Docker. Activate N.E.X.U.S. Portable Environment to execute with Zero-Trace."
      };
      this.addLog('success', 'N.E.X.U.S. Host Audit Complete: 3 missing/outdated tools detected.');
      this.notify();
    }, 800);
  }
}

export const store = new Store();
