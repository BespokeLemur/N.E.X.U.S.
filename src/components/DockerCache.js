// Docker & Container Offline Cache Component with i18n
import { store } from '../state.js';
import { t } from '../i18n.js';

export function renderDockerCache(container) {
  const state = store.getState();
  const lang = state.activeLang;
  const images = state.dockerImages;
  const drive = store.getActiveDrive();

  const cachedCount = images.filter(i => i.cached).length;

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="container" style="color:var(--primary);"></i> ${t('dockerTitle', lang)}
          </h1>
          <p class="view-subtitle">${t('dockerSub', lang)}</p>
        </div>
        <div>
          <button class="btn btn-primary btn-sm" id="btn-export-compose">
            <i data-lucide="file-code" style="width:14px;"></i> ${t('exportComposeBtn', lang)}
          </button>
        </div>
      </div>

      <div class="card mb-16" style="background:linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(16, 185, 129, 0.05));">
        <div class="flex-between">
          <div>
            <div style="font-weight:700; font-size:1.05rem; color:var(--text-main);">
              ${t('dockerCachedCount', lang)}: <span style="color:var(--accent-green);">${cachedCount} / ${images.length}</span>
            </div>
            <div style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">
              Path: <code style="color:var(--accent-cyan);">${drive.letter}\\Docker_Cache\\</code>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-load-all-images">
            <i data-lucide="download" style="width:14px;"></i> ${t('loadAllDockerBtn', lang)}
          </button>
        </div>
      </div>

      <div class="grid-3">
        ${images.map(img => `
          <div class="card" style="display:flex; flex-direction:column; justify-content:space-between; border-color:${img.cached ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-color)'};">
            <div>
              <div class="flex-between mb-16">
                <div>
                  <span class="badge badge-cyan">${img.category}</span>
                  <div style="font-size:1rem; font-weight:700; color:var(--text-main); margin-top:4px;">${img.name}</div>
                </div>
                <span class="font-mono" style="font-size:0.8rem; color:var(--text-dim);">${img.size}</span>
              </div>

              <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-color); padding:6px 10px; border-radius:var(--radius-sm); font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted); margin-bottom:12px;">
                docker load -i ${drive.letter}\\Docker_Cache\\${img.id}.tar
              </div>
            </div>

            <div class="flex-between">
              <span class="badge ${img.cached ? 'badge-green' : 'badge-amber'}">${img.cached ? 'Cached' : 'Not Cached'}</span>
              <button class="btn btn-sm ${img.cached ? 'btn-danger' : 'btn-primary'}" data-toggle-img="${img.id}">
                <i data-lucide="${img.cached ? 'trash-2' : 'hard-drive'}" style="width:14px;"></i>
                ${img.cached ? 'Remove' : 'Cache Tar'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  container.querySelectorAll('[data-toggle-img]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-toggle-img');
      store.toggleDockerCache(id);
      renderDockerCache(container);
    });
  });

  document.getElementById('btn-load-all-images')?.addEventListener('click', () => {
    const cached = store.getState().dockerImages.filter(i => i.cached);
    cached.forEach(img => {
      store.addLog('info', `[docker load] docker load -i ${drive.letter}\\Docker_Cache\\${img.id}.tar`);
    });
    store.addLog('success', `All ${cached.length} Docker images loaded!`);
    alert(`${cached.length} Docker images loaded from USB to local Docker Daemon.`);
  });

  document.getElementById('btn-export-compose')?.addEventListener('click', () => {
    const composeContent = `version: '3.8'\nservices:\n  postgres-db:\n    image: postgres:16-alpine\n    ports:\n      - "5432:5432"\n`;
    const blob = new Blob([composeContent], { type: 'text/yaml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'docker-compose.yml';
    a.click();
    URL.revokeObjectURL(url);

    store.addLog('success', 'docker-compose.yml downloaded.');
  });
}
