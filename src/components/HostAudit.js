// Host Audit Component with i18n
import { store } from '../state.js';
import { t } from '../i18n.js';

export function renderHostAudit(container) {
  const state = store.getState();
  const lang = state.activeLang;
  const audit = state.hostAuditResult;
  const drive = store.getActiveDrive();

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <div style="display:flex; align-items:center; gap:8px;">
            <h1 class="view-title">
              <i data-lucide="scan-search" style="color:var(--accent-purple);"></i> ${t('auditTitle', lang)}
            </h1>
            <span class="badge badge-purple" style="font-size:0.75rem;">N.E.X.U.S. Engine</span>
          </div>
          <p class="view-subtitle">${t('auditSub', lang)}</p>
        </div>
        <div>
          <button class="btn btn-primary" id="btn-start-audit">
            <i data-lucide="scan-search" style="width:16px;"></i> ${t('auditScanBtn', lang)}
          </button>
        </div>
      </div>

      ${!audit ? `
        <div class="card" style="text-align:center; padding:60px 20px;">
          <div style="width:64px; height:64px; border-radius:50%; background:rgba(168, 85, 247, 0.1); border:1px solid rgba(168, 85, 247, 0.3); display:flex; align-items:center; justify-content:center; margin:0 auto 16px; color:var(--accent-purple);">
            <i data-lucide="radar" style="width:32px; height:32px;"></i>
          </div>
          <h3 style="font-weight:700; font-size:1.2rem; margin-bottom:8px;">Host Machine Not Audited Yet</h3>
          <p style="color:var(--text-muted); max-width:500px; margin:0 auto 20px; font-size:0.9rem;">
            Click <strong>"${t('auditScanBtn', lang)}"</strong> above to audit Git, Node, Python, VS Code and Docker runtimes.
          </p>
          <button class="btn btn-primary" id="btn-start-audit-inner">
            <i data-lucide="scan-line" style="width:16px;"></i> ${t('auditScanBtn', lang)}
          </button>
        </div>
      ` : `
        <div class="card mb-24" style="background:linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(168, 85, 247, 0.08)); border-color:rgba(56, 189, 248, 0.3);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
            <div>
              <div style="font-size:0.8rem; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.05em; font-weight:600;">AUDIT REPORT (${audit.scanTime})</div>
              <h2 style="font-size:1.25rem; font-weight:700; color:var(--text-main); margin:4px 0;">Host OS: ${audit.os}</h2>
              <p style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">${audit.recommendation}</p>
            </div>
            <div style="display:flex; gap:12px; align-items:center;">
              <span class="badge badge-amber" style="font-size:0.85rem; padding:8px 12px;">
                <i data-lucide="alert-triangle" style="width:14px;"></i> ${audit.missingCount} Missing Tools
              </span>
              <button class="btn btn-success" id="btn-inject-env">
                <i data-lucide="play" style="width:16px;"></i> ${t('auditInjectBtn', lang)}
              </button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-title mb-16">
            <i data-lucide="list-checks" style="color:var(--accent-green);"></i> Environment Runtimes Analysis
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            ${audit.tools.map(tool => `
              <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:rgba(0,0,0,0.25); border:1px solid var(--border-color); border-radius:var(--radius-md);">
                <div style="display:flex; align-items:center; gap:14px;">
                  <div style="width:32px; height:32px; border-radius:var(--radius-sm); background:${tool.installed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)'}; display:flex; align-items:center; justify-content:center; color:${tool.installed ? 'var(--accent-green)' : 'var(--accent-rose)'};">
                    <i data-lucide="${tool.installed ? 'check' : 'x'}"></i>
                  </div>
                  <div>
                    <div style="font-weight:700; font-size:0.95rem; color:var(--text-main);">${tool.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-dim);">${tool.source}</div>
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:16px;">
                  <span class="font-mono" style="font-size:0.85rem; color:${tool.installed ? 'var(--accent-green)' : 'var(--text-muted)'};">${tool.version}</span>
                  ${!tool.installed ? `
                    <button class="btn btn-secondary btn-sm" data-use-portable="${tool.name}">
                      <i data-lucide="box" style="width:12px;"></i> Launch Portable
                    </button>
                  ` : `
                    <span class="badge badge-cyan" style="font-size:0.7rem;">System Ready</span>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `}
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const startAudit = () => {
    store.runHostAudit();
    setTimeout(() => renderHostAudit(container), 850);
  };

  document.getElementById('btn-start-audit')?.addEventListener('click', startAudit);
  document.getElementById('btn-start-audit-inner')?.addEventListener('click', startAudit);

  document.getElementById('btn-inject-env')?.addEventListener('click', () => {
    store.addLog('success', `Environment Injection Successful: ${drive.letter}\\Portable added to PATH temporarily.`);
    alert(`N.E.X.U.S. Portable Environment Activated! Zero traces left on host.`);
  });

  container.querySelectorAll('[data-use-portable]').forEach(btn => {
    btn.addEventListener('click', () => {
      const toolName = btn.getAttribute('data-use-portable');
      store.addLog('info', `Launching N.E.X.U.S. Portable: ${toolName}`);
      alert(`${toolName} launched from N.E.X.U.S. drive.`);
    });
  });
}
