// Automated SBOM & License Auditor Component
import { store } from '../state.js';

export function renderSbomAuditor(container) {
  const state = store.getState();
  const sbom = state.sbomAudits;

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="file-check-2" style="color:var(--accent-purple);"></i> Automated SBOM & Lisans Analizcisi
          </h1>
          <p class="view-subtitle">USB projelerinizin bağımlılıklarını tarar, open-source lisans uyumluluğunu doğrular ve SBOM raporu üretir.</p>
        </div>
        <div>
          <button class="btn btn-primary btn-sm" id="btn-export-sbom-json">
            <i data-lucide="download" style="width:14px;"></i> CycloneDX SBOM Export (.json)
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-title mb-16">
          <i data-lucide="shield-check" style="color:var(--accent-green);"></i> Proje Bağımlılık Lisans Tablosu (${sbom.length} Paket)
        </div>

        <div class="file-tree">
          ${sbom.map(item => `
            <div class="file-item">
              <div class="file-name">
                <i data-lucide="package" style="color:var(--primary); width:16px;"></i>
                <div>
                  <strong style="color:var(--text-main);">${item.pkg}</strong> <span style="font-size:0.75rem; color:var(--text-dim);">v${item.version}</span>
                </div>
              </div>
              <div style="display:flex; align-items:center; gap:14px;">
                <span class="badge badge-purple">Lisans: ${item.license}</span>
                <span class="badge badge-green">${item.status}</span>
                <span style="font-size:0.75rem; color:var(--text-dim);">${item.vuln}</span>
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

  document.getElementById('btn-export-sbom-json')?.addEventListener('click', () => {
    const sbomData = {
      bomFormat: "CycloneDX",
      specVersion: "1.5",
      version: 1,
      metadata: {
        timestamp: new Date().toISOString(),
        component: { name: "devflash-vault-project", type: "application" }
      },
      components: sbom.map(s => ({ name: s.pkg, version: s.version, licenses: [{ license: { id: s.license } }] }))
    };

    const blob = new Blob([JSON.stringify(sbomData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bom.json';
    a.click();
    URL.revokeObjectURL(url);

    store.addLog('success', 'CycloneDX SBOM Standartlarında bom.json Raporu İndirildi.');
  });
}
