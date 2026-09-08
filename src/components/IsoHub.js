// ISO & Rescue Center Component
import { store } from '../state.js';

export function renderIsoHub(container) {
  const state = store.getState();
  const items = state.isoHubItems;

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="download-cloud" style="color:var(--accent-cyan);"></i> ISO & Distro Merkezi
          </h1>
          <p class="view-subtitle">Geliştiriciler ve sistem yöneticileri için popüler canlı Linux dağıtımları ve kurtarma imajları.</p>
        </div>
        <div>
          <span class="badge badge-cyan" style="font-size:0.8rem; padding:6px 12px;">
            <i data-lucide="shield-check" style="width:14px;"></i> SHA-256 Doğrulamalı
          </span>
        </div>
      </div>

      <div class="grid-2">
        ${items.map(item => `
          <div class="card" style="display:flex; flex-direction:column; justify-content:space-between; border-color:${item.downloaded ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-color)'};">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                <div>
                  <span class="badge badge-purple" style="margin-bottom:6px;">${item.category}</span>
                  <div style="font-size:1.1rem; font-weight:700; color:var(--text-main);">${item.name}</div>
                </div>
                <span class="font-mono" style="font-size:0.85rem; color:var(--text-muted);">${item.size}</span>
              </div>

              <p class="card-desc" style="font-size:0.85rem;">${item.description}</p>

              <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:8px 12px; font-family:var(--font-mono); font-size:0.7rem; color:var(--text-dim); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; margin-bottom:14px;">
                SHA256: ${item.sha256}
              </div>
            </div>

            <div>
              ${item.progress > 0 && item.progress < 100 ? `
                <div style="font-size:0.78rem; display:flex; justify-content:space-between; margin-bottom:4px; color:var(--primary);">
                  <span>İndiriliyor ve USB'ye Yazılıyor...</span>
                  <span>%${item.progress}</span>
                </div>
                <div class="progress-container">
                  <div class="progress-bar" style="width:${item.progress}%;"></div>
                </div>
              ` : ''}

              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                ${item.downloaded ? `
                  <span class="badge badge-green">
                    <i data-lucide="check" style="width:12px;"></i> USB'de Hazır (Ventoy /ISO)
                  </span>
                  <button class="btn btn-secondary btn-sm" disabled>
                    <i data-lucide="check-circle-2" style="width:14px;"></i> Yüklendi
                  </button>
                ` : `
                  <span style="font-size:0.78rem; color:var(--text-dim);">Otomatik Ventoy Dizinine Kaydedilir</span>
                  <button class="btn btn-primary btn-sm" data-download-iso="${item.id}">
                    <i data-lucide="download" style="width:14px;"></i> İndir & USB'ye Ekle
                  </button>
                `}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Download simulation
  container.querySelectorAll('[data-download-iso]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-download-iso');
      const item = store.getState().isoHubItems.find(i => i.id === id);
      if (!item) return;

      store.addLog('info', `ISO İndirme Başlatıldı: ${item.name} (${item.size})`);
      item.progress = 10;
      renderIsoHub(container);

      let p = 10;
      const interval = setInterval(() => {
        p += 25;
        item.progress = p;
        if (p >= 100) {
          clearInterval(interval);
          item.downloaded = true;
          item.progress = 100;
          store.addIsoToDrive(item.name, item.size);
          store.addLog('success', `ISO Doğrulandı ve Kaydedildi: E:\\ISO\\${item.name}.iso`);
          renderIsoHub(container);
        } else {
          renderIsoHub(container);
        }
      }, 500);
    });
  });
}
