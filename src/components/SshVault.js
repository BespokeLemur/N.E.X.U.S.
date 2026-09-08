// SSH & API Key Vault Manager Component
import { store } from '../state.js';

export function renderSshVault(container) {
  const state = store.getState();
  const keys = state.sshKeys;
  const drive = store.getActiveDrive();

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="key-round" style="color:var(--accent-cyan);"></i> SSH & Token Vault Manager
          </h1>
          <p class="view-subtitle">SSH anahtarlarınızı (ED25519) ve Cloud API Token'larınızı USB belleğinizde AES-256 korumasıyla saklayın.</p>
        </div>
        <div>
          <button class="btn btn-primary btn-sm" id="btn-gen-ssh-key">
            <i data-lucide="key" style="width:14px;"></i> Yeni SSH Anahtarı Üret (ED25519)
          </button>
        </div>
      </div>

      <div class="grid-2 mb-24">
        <!-- SSH Agent Controls -->
        <div class="card">
          <div class="card-title">
            <i data-lucide="shield" style="color:var(--accent-green);"></i> Portable SSH Agent Durumu
          </div>
          <p class="card-desc">USB takıldığında arka planda çalışan ve kimlik doğrulama sağlayan geçici SSH Agent servisi.</p>

          <div style="background:rgba(0,0,0,0.25); border:1px solid var(--border-color); padding:14px; border-radius:var(--radius-md); margin-bottom:14px;">
            <div class="flex-between">
              <div>
                <strong style="color:var(--text-main); font-size:0.9rem;">SSH Agent Status</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">Soket: <code style="color:var(--accent-cyan);">${drive.letter}\\SSH_Keys\\agent.sock</code></div>
              </div>
              <span class="badge badge-green">Aktif & Korumalı</span>
            </div>
          </div>

          <button class="btn btn-secondary btn-block" id="btn-inject-ssh-agent">
            <i data-lucide="zap" style="width:14px;"></i> Host Oturumuna SSH Keys Enjekte Et
          </button>
        </div>

        <!-- API Token Manager -->
        <div class="card">
          <div class="card-title">
            <i data-lucide="lock" style="color:var(--accent-amber);"></i> Cloud API Token Kasası
          </div>
          <p class="card-desc">GitHub Personal Access Token, AWS Secret Keys ve Cloudflare API key'lerini güvenle saklayın.</p>

          <div class="form-group">
            <label class="form-label">Servis Adı & Token</label>
            <input type="text" id="token-label-input" class="form-input mb-16" placeholder="ör. GITHUB_PAT_TOKEN" />
            <input type="password" id="token-val-input" class="form-input" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" />
          </div>

          <button class="btn btn-success btn-block" id="btn-save-token">
            <i data-lucide="save" style="width:14px;"></i> Token'ı Şifrele & Sakla
          </button>
        </div>
      </div>

      <!-- Saved SSH Keys List -->
      <div class="card">
        <div class="card-title mb-16">
          <i data-lucide="folder-key" style="color:var(--primary);"></i> USB İçindeki Kayıtlı SSH Anahtarları (${keys.length})
        </div>

        <div class="file-tree">
          ${keys.map(k => `
            <div class="file-item">
              <div class="file-name">
                <i data-lucide="key" style="color:var(--accent-cyan); width:16px;"></i>
                <div>
                  <div style="font-weight:600; color:var(--text-main);">${k.label}</div>
                  <div style="font-size:0.72rem; color:var(--text-dim);">${k.type} • ${k.fingerPrint}</div>
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:10px;">
                <span class="badge badge-green">${k.status}</span>
                <button class="btn btn-secondary btn-sm" data-copy-pubkey="${k.label}">
                  <i data-lucide="copy" style="width:12px;"></i> Public Key Kopyala
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Generate SSH Key
  document.getElementById('btn-gen-ssh-key')?.addEventListener('click', () => {
    const label = prompt('Yeni SSH Anahtarı için etiket adı girin:', 'devflash_ed25519_key');
    if (label) {
      const newKey = {
        id: 'k' + (state.sshKeys.length + 1),
        label: label,
        type: 'ED25519',
        fingerPrint: 'SHA256:' + Math.random().toString(36).substring(2, 12),
        status: 'Encrypted'
      };
      state.sshKeys.push(newKey);
      store.addLog('success', `Yeni SSH ED25519 Anahtarı Üretildi: ${label}`);
      renderSshVault(container);
    }
  });

  // Inject SSH Agent
  document.getElementById('btn-inject-ssh-agent')?.addEventListener('click', () => {
    store.addLog('success', `[ssh-agent] SSH Anahtarları host bilgisayarın ssh-agent servisine eklendi: E:\\SSH_Keys\\id_ed25519`);
    alert('SSH Anahtarlarınız geçici olarak bu bilgisayarın SSH Agent servisine tanımlandı!');
  });

  // Copy public key
  container.querySelectorAll('[data-copy-pubkey]').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.getAttribute('data-copy-pubkey');
      const fakePubKey = `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI${Math.random().toString(36).substring(2, 20)} devflash@usb`;
      navigator.clipboard.writeText(fakePubKey);
      store.addLog('info', `Public Key panoya kopyalandı: ${label}`);
      alert(`"${label}" Public Key panoya kopyalandı!\n\n${fakePubKey}`);
    });
  });

  // Save API token
  document.getElementById('btn-save-token')?.addEventListener('click', () => {
    const l = document.getElementById('token-label-input')?.value;
    const v = document.getElementById('token-val-input')?.value;

    if (!l || !v) {
      alert('Lütfen etiket ve token değerini girin.');
      return;
    }

    store.addLog('success', `API Token AES-256 ile Şifrelendi & Saklandı: ${l}`);
    document.getElementById('token-label-input').value = '';
    document.getElementById('token-val-input').value = '';
    alert(`"${l}" API Token'ı USB içindeki şifreli kasaya eklendi.`);
  });
}
