// Ventoy Manager Component with i18n
import { store } from '../state.js';
import { t } from '../i18n.js';

export function renderVentoyManager(container) {
  const state = store.getState();
  const lang = state.activeLang;
  const drive = store.getActiveDrive();

  const isoFiles = drive.files.filter(f => f.type === 'iso');

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="disc" style="color:var(--primary);"></i> ${t('ventoyTitle', lang)}
          </h1>
          <p class="view-subtitle">${t('ventoySub', lang)}</p>
        </div>
        <div>
          <span class="badge ${drive.isVentoyInstalled ? 'badge-cyan' : 'badge-amber'}" style="font-size:0.8rem; padding:6px 12px;">
            <i data-lucide="${drive.isVentoyInstalled ? 'check-circle' : 'alert-circle'}" style="width:14px;"></i>
            ${drive.isVentoyInstalled ? 'Ventoy Ready' : 'Bootloader Missing'}
          </span>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <i data-lucide="settings-2" style="color:var(--primary);"></i> ${t('ventoyCard1Title', lang)}
          </div>
          <p class="card-desc">${t('ventoyCard1Desc', lang)}</p>

          <div style="background:rgba(0,0,0,0.25); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px; margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
              <span style="color:var(--text-muted);">Drive:</span>
              <strong style="color:var(--text-main);">${drive.name} (${drive.letter})</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
              <span style="color:var(--text-muted);">Filesystem:</span>
              <strong style="color:var(--accent-cyan);">${drive.filesystem}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
              <span style="color:var(--text-muted);">Partition Scheme:</span>
              <strong style="color:var(--text-main);">GPT / UEFI + SecureBoot</strong>
            </div>
          </div>

          <div style="display:flex; gap:12px; margin-top:20px;">
            <button class="btn btn-primary btn-block" id="btn-install-ventoy" ${drive.isVentoyInstalled ? 'disabled' : ''}>
              <i data-lucide="zap" style="width:16px;"></i> ${drive.isVentoyInstalled ? 'Ventoy v1.0.99 Ready' : t('installVentoy', lang)}
            </button>
          </div>
        </div>

        <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="card-title">
              <i data-lucide="file-up" style="color:var(--accent-purple);"></i> ${t('ventoyCard2Title', lang)}
            </div>
            <p class="card-desc">${t('ventoyCard2Desc', lang)}</p>
          </div>

          <div id="iso-dropzone" style="border: 2px dashed rgba(56, 189, 248, 0.35); border-radius:var(--radius-md); padding:32px 16px; text-align:center; background:rgba(56, 189, 248, 0.02); cursor:pointer; transition:all 0.2s ease;">
            <i data-lucide="upload-cloud" style="width:42px; height:42px; color:var(--primary); margin-bottom:10px;"></i>
            <div style="font-weight:600; font-size:0.95rem; margin-bottom:4px;">Drop ISO File Here</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">or click to select from PC (.iso, .img)</div>
            <input type="file" id="iso-file-input" accept=".iso,.img" style="display:none;" />
          </div>

          <div style="font-size:0.78rem; color:var(--text-dim); margin-top:12px; text-align:center;">
            Supported formats: Ubuntu, Arch, Fedora, Kali, Windows PE, Rescuezilla
          </div>
        </div>
      </div>

      <div class="card mt-24">
        <div class="flex-between mb-16">
          <div class="card-title" style="margin:0;">
            <i data-lucide="hard-drive-download" style="color:var(--accent-green);"></i> ${t('ventoyLoadedIsos', lang)} (${isoFiles.length})
          </div>
        </div>

        ${isoFiles.length === 0 ? `
          <div style="text-align:center; padding:30px; color:var(--text-dim);">
            <i data-lucide="disc" style="width:36px; height:36px; margin-bottom:8px; opacity:0.5;"></i>
            <div>No ISO files loaded in USB yet.</div>
          </div>
        ` : `
          <div class="file-tree">
            ${isoFiles.map(file => `
              <div class="file-item">
                <div class="file-name">
                  <i data-lucide="disc" style="color:var(--primary); width:16px;"></i>
                  <span>${file.name}</span>
                </div>
                <div style="display:flex; align-items:center; gap:16px;">
                  <span class="badge badge-cyan">Ventoy Auto-Detect</span>
                  <span class="file-size">${file.size}</span>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  document.getElementById('btn-install-ventoy')?.addEventListener('click', () => {
    store.installVentoy();
    renderVentoyManager(container);
  });

  const dropzone = document.getElementById('iso-dropzone');
  const fileInput = document.getElementById('iso-file-input');
  dropzone?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      store.addIsoToDrive(file.name, sizeMB);
      renderVentoyManager(container);
    }
  });
}
