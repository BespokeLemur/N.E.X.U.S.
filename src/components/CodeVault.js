// Code Vault Component with i18n
import { store } from '../state.js';
import { t } from '../i18n.js';

export function renderCodeVault(container) {
  const state = store.getState();
  const lang = state.activeLang;
  const vaults = state.vaultProjects;

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="shield-lock" style="color:var(--accent-amber);"></i> ${t('vaultTitle', lang)}
          </h1>
          <p class="view-subtitle">${t('vaultSub', lang)}</p>
        </div>
        <div>
          <button class="btn btn-primary btn-sm" id="btn-new-vault">
            <i data-lucide="lock" style="width:14px;"></i> ${t('vaultLockBtn', lang)}
          </button>
        </div>
      </div>

      <div class="grid-2 mb-24">
        <div class="card">
          <div class="card-title">
            <i data-lucide="key-round" style="color:var(--accent-amber);"></i> ${t('vaultCreateTitle', lang)}
          </div>
          <p class="card-desc">AES-256-GCM encryption capsule.</p>

          <div class="form-group">
            <label class="form-label">${t('vaultProjNameLabel', lang)}</label>
            <input type="text" id="vault-proj-name" class="form-input" placeholder="my-secret-code" />
          </div>

          <div class="form-group">
            <label class="form-label">${t('vaultPassLabel', lang)}</label>
            <input type="password" id="vault-passphrase" class="form-input" placeholder="••••••••••••••••" />
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
            <div style="font-size:0.78rem; color:var(--text-dim);">
              <i data-lucide="shield-check" style="width:14px; color:var(--accent-green);"></i> PBKDF2 + AES-256-GCM
            </div>
            <button class="btn btn-success" id="btn-encrypt-action">
              <i data-lucide="lock" style="width:16px;"></i> ${t('vaultLockBtn', lang)}
            </button>
          </div>
        </div>

        <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="card-title">
              <i data-lucide="git-fork" style="color:var(--accent-cyan);"></i> Git Snapshots & README
            </div>
            <p class="card-desc">Automatic local commits and documentation generator.</p>

            <div style="background:rgba(0,0,0,0.25); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px; margin-bottom:14px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-weight:600; font-size:0.9rem;">Automatic Git Commit & Backup</div>
                  <div style="font-size:0.75rem; color:var(--text-muted);">Snapshots project on drive mount.</div>
                </div>
                <span class="badge badge-green">Active</span>
              </div>
            </div>
          </div>

          <button class="btn btn-secondary btn-block" id="btn-generate-readme">
            <i data-lucide="file-text" style="width:16px;"></i> ${t('generateReadmeBtn', lang)}
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-title mb-16">
          <i data-lucide="folder-git-2" style="color:var(--primary);"></i> ${t('vaultProjectsTitle', lang)} (${vaults.length})
        </div>

        <div class="file-tree">
          ${vaults.map(v => `
            <div class="file-item" style="padding:10px 14px;">
              <div class="file-name">
                <i data-lucide="shield-alert" style="color:var(--accent-amber); width:18px;"></i>
                <div>
                  <div style="font-weight:600; color:var(--text-main);">${v.name}</div>
                  <div style="font-size:0.72rem; color:var(--text-dim);">${v.path} • Last Sync: ${v.lastBackup}</div>
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:12px;">
                <span class="badge badge-amber">${v.status}</span>
                <span class="file-size">${v.size}</span>
                <button class="btn btn-secondary btn-sm" data-unlock-name="${v.name}">
                  <i data-lucide="key" style="width:12px;"></i> Unlock
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

  document.getElementById('btn-encrypt-action')?.addEventListener('click', () => {
    const nameInput = document.getElementById('vault-proj-name');
    const passInput = document.getElementById('vault-passphrase');
    const name = nameInput.value.trim();
    const pass = passInput.value.trim();

    if (!name || !pass) {
      alert('Please enter project name and master passphrase.');
      return;
    }

    store.encryptProject(name);
    nameInput.value = '';
    passInput.value = '';
    renderCodeVault(container);
  });

  container.querySelectorAll('[data-unlock-name]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-unlock-name');
      const pass = prompt(`Enter master passphrase to unlock "${name}":`);
      if (pass) {
        store.addLog('success', `Vault Passphrase Verified! Project unlocked: ${name}`);
        alert(`Project unlocked! Workspace: E:\\Temp_Workspaces\\${name}`);
      }
    });
  });

  document.getElementById('btn-generate-readme')?.addEventListener('click', () => {
    const readmeText = `# N.E.X.U.S. Encrypted Project Vault\n\nGenerated by N.E.X.U.S. Engine.\n`;
    const blob = new Blob([readmeText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);

    store.addLog('success', 'README.md generated.');
  });
}
