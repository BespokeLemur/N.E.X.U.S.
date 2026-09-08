// Header Component with User Guide & i18n Selector for N.E.X.U.S.
import { store } from '../state.js';
import { t, translations } from '../i18n.js';
import { runFullSystemTest } from '../test_runner.js';

export function renderNavbar(container) {
  const state = store.getState();
  const lang = state.activeLang;
  const drive = store.getActiveDrive() || {};
  const total = drive.totalBytes || 64000000000;
  const used = drive.usedBytes || 0;

  const usedPercent = Math.round((used / total) * 100);
  const usedGB = (used / 1e9).toFixed(1);
  const totalGB = (total / 1e9).toFixed(0);

  container.innerHTML = `
    <!-- Hamburger Menu (mobile only) -->
    <button class="hamburger-btn" id="hamburger-toggle" aria-label="Toggle Menu">
      <i data-lucide="menu" style="width:20px;height:20px;"></i>
    </button>

    <!-- Icon-less Stark E.D.I.T.H Style Branding -->
    <div class="brand-container">
      <div class="nexus-edith-title">N.E.X.U.S.</div>
      <div class="nexus-edith-sub">
        <span>${t('subtitle', lang)}</span>
        ${state.isWriteProtected ? `<span class="badge badge-rose" style="font-size:0.55rem; padding:0 4px;">${t('readOnly', lang)}</span>` : ''}
      </div>
    </div>

    <!-- Active Drive Status Box -->
    <div class="drive-selector-box" id="btn-select-drive" title="${t('selectDrive', lang)}">
      <div style="color:var(--accent-green);">
        <i data-lucide="hard-drive"></i>
      </div>
      <div class="drive-info">
        <div class="drive-label">
          <span>${drive.name} (${drive.letter})</span>
          <span class="badge ${drive.isVentoyInstalled ? 'badge-cyan' : 'badge-amber'}" style="font-size:0.62rem;">
            ${drive.isVentoyInstalled ? 'Ventoy Ready' : 'Standard USB'}
          </span>
        </div>
        <div class="drive-capacity">
          <span>${usedGB} GB / ${totalGB} GB (%${usedPercent})</span>
          <div class="capacity-bar-mini">
            <div class="capacity-fill-mini" style="width: ${usedPercent}%;"></div>
          </div>
        </div>
      </div>
      <i data-lucide="chevron-down" style="color:var(--text-dim); width:16px;"></i>
    </div>

    <!-- Header Actions & Controls -->
    <div class="header-actions">
      <!-- Onboarding User Guide Button -->
      <button class="btn btn-secondary btn-sm" id="btn-open-guide-modal" title="N.E.X.U.S. Kullanım Kılavuzu">
        <i data-lucide="book-open" style="width:14px; color:var(--primary);"></i>
        <span class="hide-xs">Kılavuz</span>
      </button>

      <!-- i18n Language Selector Dropdown -->
      <select id="lang-switcher-select" class="form-select" style="padding:4px 8px; font-size:0.8rem; width:auto; background:rgba(0,0,0,0.3); border-color:var(--border-highlight);">
        ${Object.keys(translations).map(k => `
          <option value="${k}" ${lang === k ? 'selected' : ''}>${translations[k].flag} ${translations[k].langName}</option>
        `).join('')}
      </select>

      <!-- Write Protect Toggle Switch -->
      <button class="btn btn-sm ${state.isWriteProtected ? 'btn-danger' : 'btn-secondary'}" id="btn-toggle-write-protect">
        <i data-lucide="${state.isWriteProtected ? 'lock' : 'unlock'}" style="width:14px;"></i>
        <span class="hide-xs">${state.isWriteProtected ? t('readOnly', lang) : t('writeable', lang)}</span>
      </button>

      <!-- QR Mobile Companion Button -->
      <button class="btn btn-secondary btn-sm" id="btn-open-qr-modal">
        <i data-lucide="qr-code" style="width:14px;"></i>
        <span class="hide-xs">${t('mobile', lang)}</span>
      </button>

      <!-- Zero Trace Purge Button -->
      <button class="btn btn-danger btn-sm" id="btn-purge-trace">
        <i data-lucide="sparkles" style="width:14px;"></i>
        <span class="hide-xs">${t('purge', lang)}</span>
      </button>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Event Listeners
  document.getElementById('btn-open-guide-modal')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-guide-modal'));
  });

  document.getElementById('lang-switcher-select')?.addEventListener('change', (e) => {
    store.setLanguage(e.target.value);
  });

  document.getElementById('btn-run-full-test')?.addEventListener('click', () => {
    runFullSystemTest();
  });

  // Hamburger: toggle sidebar open/close on mobile
  document.getElementById('hamburger-toggle')?.addEventListener('click', () => {
    const sidebar = document.getElementById('app-sidebar');
    const overlay = document.getElementById('mobile-sidebar-overlay');
    if (!sidebar) return;
    const isOpen = sidebar.classList.toggle('sidebar-open');
    if (overlay) overlay.style.display = isOpen ? 'block' : 'none';
    // Close sidebar on tab navigation (mobile)
    sidebar.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        sidebar.classList.remove('sidebar-open');
        if (overlay) overlay.style.display = 'none';
      }, { once: true });
    });
  });

  document.getElementById('btn-select-drive')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-drive-modal'));
  });

  document.getElementById('btn-toggle-write-protect')?.addEventListener('click', () => {
    store.toggleWriteProtect();
  });

  document.getElementById('btn-open-qr-modal')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-qr-modal'));
  });

  document.getElementById('btn-purge-trace')?.addEventListener('click', () => {
    if (confirm('N.E.X.U.S. Zero-Trace Cleaner: Purge host session traces?')) {
      store.purgeHostTrace();
      alert('100% Clean! N.E.X.U.S. Drive safe to eject.');
    }
  });
}
