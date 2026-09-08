// Dotfiles & Shell Theme Auto-Injector Component
import { store } from '../state.js';

export function renderDotfilesManager(container) {
  const state = store.getState();
  const dotfiles = state.dotfiles;
  const drive = store.getActiveDrive();

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="sliders" style="color:var(--primary);"></i> Dotfiles & Kabuk Tema Enjektörü
          </h1>
          <p class="view-subtitle">USB takıldığında terminal takma adlarınızı (alias), Git kimliklerinizi ve kabuk temalarınızı hedef bilgisayara enjekte edin.</p>
        </div>
        <div>
          <button class="btn btn-primary btn-sm" id="btn-inject-all-dotfiles">
            <i data-lucide="zap" style="width:14px;"></i> Tüm Dotfile'ları Aktif Et
          </button>
        </div>
      </div>

      <div class="grid-2 mb-24">
        ${dotfiles.map(df => `
          <div class="card">
            <div class="flex-between mb-12">
              <div style="display:flex; align-items:center; gap:8px;">
                <i data-lucide="file-code" style="color:var(--accent-purple);"></i>
                <strong style="color:var(--text-main); font-size:1rem;">${df.name}</strong>
              </div>
              <span class="badge badge-green">${df.synced ? 'Enjekte Edildi' : 'Bekliyor'}</span>
            </div>

            <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:8px;">
              Hedef Konum: <code style="color:var(--accent-cyan);">${df.target}</code>
            </div>

            <pre style="font-family:var(--font-mono); font-size:0.75rem; background:rgba(0,0,0,0.3); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border-color); color:var(--text-muted); margin-bottom:12px; max-height:100px; overflow:hidden;">${df.content}</pre>

            <button class="btn btn-secondary btn-sm btn-block" data-inject-single="${df.name}">
              <i data-lucide="corner-down-right" style="width:14px;"></i> Tekli Enjekte Et
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  document.getElementById('btn-inject-all-dotfiles')?.addEventListener('click', () => {
    dotfiles.forEach(df => {
      store.addLog('success', `Dotfile Enjekte Edildi: USB\\Dotfiles\\${df.name} -> ${df.target}`);
    });
    alert('Tüm Dotfile ayarlarınız (Zsh, Git, Starship) bu bilgisayarın oturumuna tanımlandı!');
  });

  container.querySelectorAll('[data-inject-single]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-inject-single');
      store.addLog('success', `Dotfile Enjekte Edildi: ${name}`);
      alert(`"${name}" konfigürasyonu bilgisayara başarıyla uygulandı.`);
    });
  });
}
