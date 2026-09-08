// Sidebar Navigation Component — N.E.X.U.S. v3.2.0 Production
import { store } from '../state.js';
import { t } from '../i18n.js';

export function renderSidebar(container) {
  const state = store.getState();
  const active = state.activeTab;
  const profile = state.activeProfile;
  const lang = state.activeLang;

  const profiles = [
    { id: 'web', label: 'Web Full-Stack', icon: 'code' },
    { id: 'rust', label: 'Rust Systems', icon: 'cpu' },
    { id: 'cybersec', label: 'CyberSec', icon: 'shield' },
    { id: 'datascience', label: 'Data Science', icon: 'line-chart' }
  ];

  const categories = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', highlight: 'HOME' },
      ]
    },
    {
      title: 'CORE',
      items: [
        { id: 'ventoy', label: t('ventoy', lang), icon: 'disc' },
        { id: 'portable', label: t('portable', lang), icon: 'box' },
        { id: 'ai_node', label: t('ai_node', lang), icon: 'bot', highlight: 'AI' },
        { id: 'docker_cache', label: t('docker_cache', lang), icon: 'container' }
      ]
    },
    {
      title: 'SECURITY & VAULT',
      items: [
        { id: 'vault', label: t('vault', lang), icon: 'shield-lock' },
        { id: 'ssh_vault', label: t('ssh_vault', lang), icon: 'key-round' },
        { id: 'security_scan', label: t('security_scan', lang), icon: 'shield-alert', highlight: 'Virus' },
        { id: 'sbom_audit', label: t('sbom_audit', lang), icon: 'file-check-2' }
      ]
    },
    {
      title: 'NETWORK & SYNC',
      items: [
        { id: 'network_scanner', label: 'LAN Scanner', icon: 'wifi', highlight: 'LAN' },
        { id: 'mobile_companion', label: 'Mobile QR', icon: 'smartphone', highlight: 'QR' },
        { id: 'p2p_share', label: t('p2p_share', lang), icon: 'radio', highlight: 'AirDrop' },
        { id: 'dotfiles', label: t('dotfiles', lang), icon: 'sliders' },
        { id: 'cloud_backup', label: t('cloud_backup', lang), icon: 'cloud-lightning' },
        { id: 'isohub', label: t('isohub', lang), icon: 'download-cloud' }
      ]
    },
    {
      title: 'DIAGNOSTICS & TOOLS',
      items: [
        { id: 'hostaudit', label: t('hostaudit', lang), icon: 'scan-search', highlight: 'Power' },
        { id: 'usb_benchmark', label: t('usb_benchmark', lang), icon: 'activity' },
        { id: 'retro_games', label: t('retro_games', lang), icon: 'gamepad-2', highlight: 'Retro' },
        { id: 'marketplace', label: t('marketplace', lang), icon: 'store' }
      ]
    }
  ];

  container.innerHTML = `
    <!-- Profile Switcher Dropdown -->
    <div style="padding:0 4px 10px 4px; border-bottom:1px solid var(--border-color); margin-bottom:8px;">
      <div style="font-size:0.65rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">
        ${t('profileLabel', lang)}
      </div>
      <select id="profile-switcher-select" class="form-select" style="padding:5px 8px; font-size:0.78rem; background:rgba(0,0,0,0.3); border-color:var(--border-highlight);">
        ${profiles.map(p => `
          <option value="${p.id}" ${profile === p.id ? 'selected' : ''}>🎭 ${p.label}</option>
        `).join('')}
      </select>
    </div>

    <!-- Scrollable Navigation Categories -->
    <div style="display:flex; flex-direction:column; gap:12px; max-height:calc(100vh - 200px); overflow-y:auto; padding-right:4px;">
      ${categories.map(cat => `
        <div>
          <div style="font-size:0.62rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.08em; padding:2px 8px; margin-bottom:4px;">
            ${cat.title}
          </div>
          <div style="display:flex; flex-direction:column; gap:2px;">
            ${cat.items.map(item => `
              <div class="nav-item ${active === item.id ? 'active' : ''}" data-tab="${item.id}" style="padding:6px 10px; font-size:0.82rem;">
                <i data-lucide="${item.icon}" style="width:14px; height:14px;"></i>
                <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.label}</span>
                ${item.highlight ? `<span class="badge ${item.highlight === 'AI' ? 'badge-amber' : item.highlight === 'Virus' ? 'badge-rose' : 'badge-purple'}" style="font-size:0.55rem; padding:1px 3px;">${item.highlight}</span>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="sidebar-divider" style="margin:6px 0;"></div>

    <div class="sidebar-footer-box" style="padding:6px 8px; font-size:0.72rem;">
      <div style="display:flex; justify-content:space-between;">
        <span>Profile:</span>
        <span style="color:var(--primary); font-weight:600; text-transform:uppercase;">${profile}</span>
      </div>
      <div style="display:flex; justify-content:space-between; margin-top:2px;">
        <span>Language:</span>
        <span style="color:var(--accent-green); font-weight:600;">${lang.toUpperCase()}</span>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  document.getElementById('profile-switcher-select')?.addEventListener('change', (e) => {
    store.setActiveProfile(e.target.value);
  });

  container.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => {
      const tab = el.getAttribute('data-tab');
      store.setActiveTab(tab);
    });
  });
}
