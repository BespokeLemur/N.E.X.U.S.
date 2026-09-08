// Portable Developer Pack Component with i18n
import { store } from '../state.js';
import { t } from '../i18n.js';

export function renderPortablePack(container) {
  const state = store.getState();
  const lang = state.activeLang;
  const tools = state.portableTools;
  const drive = store.getActiveDrive();

  const installedCount = tools.filter(t => t.installed).length;

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="box" style="color:var(--accent-purple);"></i> ${t('portableTitle', lang)}
          </h1>
          <p class="view-subtitle">${t('portableSub', lang)}</p>
        </div>
        <div style="display:flex; gap:10px;">
          <button class="btn btn-primary btn-sm" id="btn-generate-launcher">
            <i data-lucide="terminal-square" style="width:14px;"></i> ${t('downloadLauncherBtn', lang)}
          </button>
        </div>
      </div>

      <div class="card mb-16" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(56, 189, 248, 0.05)); border-color: rgba(168, 85, 247, 0.2);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <div style="font-weight:700; font-size:1.05rem;">
              ${t('portableInstalledCount', lang)}: <span style="color:var(--primary);">${installedCount} / ${tools.length}</span>
            </div>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:2px;">
              Path: <code style="color:var(--accent-cyan);">${drive.letter}\\Portable\\</code>
            </div>
          </div>
          <div style="display:flex; gap:8px;">
            <span class="badge badge-purple">Zero-Admin Mode</span>
            <span class="badge badge-green">Portable Active</span>
          </div>
        </div>
      </div>

      <div class="grid-3">
        ${tools.map(tool => `
          <div class="card" style="display:flex; flex-direction:column; justify-content:space-between; border-color:${tool.installed ? 'rgba(56, 189, 248, 0.3)' : 'var(--border-color)'};">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <div style="width:36px; height:36px; border-radius:var(--radius-md); background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; color:var(--primary);">
                    <i data-lucide="${tool.icon}"></i>
                  </div>
                  <div>
                    <div style="font-weight:700; font-size:0.98rem; color:var(--text-main);">${tool.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-dim);">${tool.category} • ${tool.version}</div>
                  </div>
                </div>
                <span class="badge badge-cyan">${tool.badge}</span>
              </div>

              <p class="card-desc" style="font-size:0.82rem; min-height:42px;">${tool.description}</p>
            </div>

            <div style="margin-top:16px; border-top:1px solid var(--border-color); padding-top:12px; display:flex; justify-content:space-between; align-items:center;">
              <span class="font-mono" style="font-size:0.78rem; color:var(--text-dim);">${tool.size}</span>
              <button class="btn btn-sm ${tool.installed ? 'btn-danger' : 'btn-primary'}" data-install-id="${tool.id}">
                <i data-lucide="${tool.installed ? 'trash-2' : 'download'}" style="width:14px;"></i>
                ${tool.installed ? t('uninstall', lang) : t('installToUsb', lang)}
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

  container.querySelectorAll('[data-install-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-install-id');
      store.toggleToolInstall(id);
      renderPortablePack(container);
    });
  });

  document.getElementById('btn-generate-launcher')?.addEventListener('click', () => {
    const driveLetter = drive.letter;
    const batContent = `@echo off
:: N.E.X.U.S. Portable Environment Launcher
title N.E.X.U.S. Portable Environment - ${driveLetter}
echo [N.E.X.U.S.] Starting Portable Environment...

set NEXUS_DRIVE=%~dp0
set PATH=%NEXUS_DRIVE%Portable\\Git-Portable\\cmd;%NEXUS_DRIVE%Portable\\NodeJS-Portable;%NEXUS_DRIVE%Portable\\Python-Portable;%PATH%

start "" "%NEXUS_DRIVE%Portable\\VSCode-Portable\\Code.exe" --user-data-dir "%NEXUS_DRIVE%Portable\\VSCode-Portable\\data"
echo [SUCCESS] N.E.X.U.S. Environment Active!
pause
`;
    const blob = new Blob([batContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'launch_nexus_env.bat';
    a.click();
    URL.revokeObjectURL(url);

    store.addLog('success', 'N.E.X.U.S. launcher script downloaded.');
  });
}
