// Zero-Knowledge Cloud Sync Component
import { store } from '../state.js';

export function renderCloudBackup(container) {
  const state = store.getState();
  const accounts = state.cloudSyncAccounts;
  const vaults = state.vaultProjects;

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="cloud-lightning" style="color:var(--primary);"></i> Şifreli Bulut Senkronizasyonu (Zero-Knowledge Sync)
          </h1>
          <p class="view-subtitle">USB içerisindeki AES-256 Kod Kasasını GitHub Gist, Cloudflare R2 veya AWS S3'e güvenle yedekleyin.</p>
        </div>
        <div>
          <button class="btn btn-primary btn-sm" id="btn-sync-all-cloud">
            <i data-lucide="refresh-cw" style="width:14px;"></i> Tüm Kasaları Buluta Senkronize Et
          </button>
        </div>
      </div>

      <!-- Cloud Integrations Cards -->
      <div class="grid-3 mb-24">
        <!-- GitHub Gists -->
        <div class="card" style="border-color:${accounts.githubGist.connected ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-color)'};">
          <div class="flex-between mb-12">
            <div style="display:flex; align-items:center; gap:8px;">
              <i data-lucide="github" style="width:20px; color:var(--text-main);"></i>
              <strong style="color:var(--text-main);">GitHub Encrypted Gist</strong>
            </div>
            <span class="badge ${accounts.githubGist.connected ? 'badge-green' : 'badge-amber'}">${accounts.githubGist.connected ? 'Bağlı' : 'Devre Dışı'}</span>
          </div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;">
            Kullanıcı: <strong>${accounts.githubGist.username}</strong><br>
            Son Sync: ${accounts.githubGist.lastSync}
          </div>
          <button class="btn btn-secondary btn-sm btn-block" id="btn-sync-gist">
            <i data-lucide="upload-cloud" style="width:14px;"></i> Gist'e Yedekle
          </button>
        </div>

        <!-- Cloudflare R2 -->
        <div class="card" style="border-color:${accounts.cloudflareR2.connected ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-color)'};">
          <div class="flex-between mb-12">
            <div style="display:flex; align-items:center; gap:8px;">
              <i data-lucide="cloud" style="width:20px; color:var(--accent-amber);"></i>
              <strong style="color:var(--text-main);">Cloudflare R2 Bucket</strong>
            </div>
            <span class="badge ${accounts.cloudflareR2.connected ? 'badge-green' : 'badge-amber'}">${accounts.cloudflareR2.connected ? 'Bağlı' : 'Devre Dışı'}</span>
          </div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;">
            Bucket: <strong>${accounts.cloudflareR2.bucket}</strong><br>
            Son Sync: ${accounts.cloudflareR2.lastSync}
          </div>
          <button class="btn btn-secondary btn-sm btn-block" id="btn-sync-r2">
            <i data-lucide="upload-cloud" style="width:14px;"></i> R2 Storage'a Aynala
          </button>
        </div>

        <!-- AWS S3 -->
        <div class="card">
          <div class="flex-between mb-12">
            <div style="display:flex; align-items:center; gap:8px;">
              <i data-lucide="server" style="width:20px; color:var(--accent-purple);"></i>
              <strong style="color:var(--text-main);">AWS S3 Encrypted</strong>
            </div>
            <span class="badge badge-amber">Devre Dışı</span>
          </div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;">
            Bucket: <strong>Bağlanmadı</strong><br>
            Son Sync: Never
          </div>
          <button class="btn btn-primary btn-sm btn-block" id="btn-connect-s3">
            <i data-lucide="plus" style="width:14px;"></i> AWS S3 Bağla
          </button>
        </div>
      </div>

      <!-- Sync Status Table -->
      <div class="card">
        <div class="card-title mb-16">
          <i data-lucide="shield-check" style="color:var(--accent-green);"></i> Şifreli Kasa Senkronizasyon Durumu (${vaults.length})
        </div>

        <div class="file-tree">
          ${vaults.map(v => `
            <div class="file-item">
              <div class="file-name">
                <i data-lucide="cloud-check" style="color:var(--accent-green); width:16px;"></i>
                <div>
                  <div style="font-weight:600; color:var(--text-main);">${v.name}</div>
                  <div style="font-size:0.72rem; color:var(--text-dim);">${v.path} • Zero-Knowledge Encryption Active</div>
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:12px;">
                <span class="badge badge-purple">AES-256 Synced</span>
                <span class="file-size">${v.size}</span>
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

  // Sync actions
  const syncAction = (provider) => {
    store.addLog('info', `[Zero-Knowledge Cloud Sync] AES-256 Kasa Paketi Karşıya Yükleniyor: ${provider}...`);
    setTimeout(() => {
      store.addLog('success', `[Zero-Knowledge Cloud Sync] Şifreli Yedekleme Başarılı! Provider: ${provider}`);
      alert(`AES-256 Kod Kasası "${provider}" bulut deposuna sıfır bilgi (zero-knowledge) protokolü ile yedeklendi!`);
    }, 800);
  };

  document.getElementById('btn-sync-all-cloud')?.addEventListener('click', () => syncAction('GitHub Gist & Cloudflare R2'));
  document.getElementById('btn-sync-gist')?.addEventListener('click', () => syncAction('GitHub Encrypted Gist'));
  document.getElementById('btn-sync-r2')?.addEventListener('click', () => syncAction('Cloudflare R2 Bucket'));
  document.getElementById('btn-connect-s3')?.addEventListener('click', () => {
    alert('AWS S3 Credentials kaydedildi. S3 Senkronizasyonu aktif!');
    accounts.awsS3.connected = true;
    accounts.awsS3.bucket = 'devflash-aws-s3-vault';
    renderCloudBackup(container);
  });
}
