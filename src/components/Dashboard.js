// Dashboard.js — N.E.X.U.S. Main Overview Dashboard
import { store } from '../state.js';
import { t } from '../i18n.js';

const moduleCards = [
  { id: 'ventoy',         icon: 'disc',           color: '#38bdf8', label: 'Ventoy Boot',      badge: 'CORE' },
  { id: 'portable',       icon: 'box',            color: '#a855f7', label: 'Portable Pack',    badge: 'CORE' },
  { id: 'ai_node',        icon: 'bot',            color: '#f59e0b', label: 'Offline AI',       badge: 'AI' },
  { id: 'docker_cache',   icon: 'container',      color: '#06b6d4', label: 'Docker Cache',     badge: 'DEV' },
  { id: 'vault',          icon: 'shield-lock',    color: '#10b981', label: 'Code Vault',       badge: 'SEC' },
  { id: 'ssh_vault',      icon: 'key-round',      color: '#10b981', label: 'SSH Vault',        badge: 'SEC' },
  { id: 'security_scan',  icon: 'shield-alert',   color: '#f43f5e', label: 'Security Scan',    badge: 'SEC' },
  { id: 'sbom_audit',     icon: 'file-check-2',   color: '#f43f5e', label: 'SBOM Auditor',     badge: 'SEC' },
  { id: 'p2p_share',      icon: 'radio',          color: '#a855f7', label: 'P2P Share',        badge: 'NET' },
  { id: 'cloud_backup',   icon: 'cloud-lightning',color: '#38bdf8', label: 'Cloud Backup',     badge: 'NET' },
  { id: 'mobile_companion',icon:'smartphone',     color: '#06b6d4', label: 'Mobile QR',        badge: 'NET' },
  { id: 'network_scanner',icon: 'wifi',           color: '#38bdf8', label: 'LAN Scanner',      badge: 'NET' },
  { id: 'isohub',         icon: 'download-cloud', color: '#a855f7', label: 'ISO Hub',          badge: 'TOOL' },
  { id: 'hostaudit',      icon: 'scan-search',    color: '#f59e0b', label: 'Host Auditor',     badge: 'TOOL' },
  { id: 'usb_benchmark',  icon: 'activity',       color: '#10b981', label: 'USB Benchmark',    badge: 'TOOL' },
  { id: 'retro_games',    icon: 'gamepad-2',      color: '#a855f7', label: 'Dev Break',        badge: 'FUN' },
];

const recentActivity = [];

function getStatCards(lang) {
  const state = store.getState();
  const vaultCount = state.vaultProjects.length;
  const installedToolsCount = state.portableTools.filter(t => t.installed).length;
  const activeDrivesCount = state.drives.length;

  return [
    { label: 'Modül Durumu',    value: '18',                      unit: 'Aktif',  icon: 'layers',      color: '#38bdf8', pct: 100 },
    { label: 'Kasa Dosyaları',  value: String(vaultCount),        unit: 'dosya',  icon: 'shield-lock', color: '#10b981', pct: Math.min(vaultCount * 10, 100) },
    { label: 'Takılı Sürücüler',value: String(activeDrivesCount), unit: 'sürücü', icon: 'hard-drive',  color: '#a855f7', pct: activeDrivesCount > 0 ? 100 : 0 },
    { label: 'Yüklü Araçlar',   value: String(installedToolsCount), unit: 'paket',  icon: 'box',         color: '#f59e0b', pct: Math.min(installedToolsCount * 12, 100) },
  ];
}

export function renderDashboard(container) {
  const { activeLang: lang, activeProfile: profile } = store.getState();
  const stats = getStatCards(lang);

  container.innerHTML = `
    <div class="view-container">
      <!-- Header -->
      <div class="view-header" style="margin-bottom:20px;">
        <div>
          <div class="view-title">
            <i data-lucide="layout-dashboard" style="color:#38bdf8;"></i>
            Dashboard
          </div>
          <div class="view-subtitle">N.E.X.U.S. v3.2.0 · Profile: <strong style="color:#38bdf8;">${profile.toUpperCase()}</strong></div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <span class="badge badge-green" style="animation:pulse-glow 2s infinite;">
            <i data-lucide="circle" style="width:8px;height:8px;fill:#10b981;"></i>
            ONLINE
          </span>
          <button class="btn btn-secondary btn-sm" id="dash-refresh-btn">
            <i data-lucide="refresh-cw" style="width:13px;height:13px;"></i> Refresh
          </button>
        </div>
      </div>

      <!-- Stat Cards -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px;" class="dash-stat-grid">
        ${stats.map(s => `
          <div class="card" style="padding:18px;border-color:${s.color}22;position:relative;overflow:hidden;">
            <div style="position:absolute;top:-16px;right:-16px;width:70px;height:70px;border-radius:50%;background:${s.color}11;"></div>
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
              <div style="background:${s.color}18;border:1px solid ${s.color}33;border-radius:10px;padding:8px;">
                <i data-lucide="${s.icon}" style="width:18px;height:18px;color:${s.color};display:block;"></i>
              </div>
              <span style="font-size:0.68rem;color:var(--text-dim);font-family:var(--font-mono);">${s.unit}</span>
            </div>
            <div style="font-size:1.9rem;font-weight:800;font-family:var(--font-tech);color:${s.color};line-height:1;">${s.value}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0 10px;">${s.label}</div>
            <div class="progress-container" style="height:3px;margin:0;">
              <div class="progress-bar" style="width:${s.pct}%;background:linear-gradient(90deg,${s.color},${s.color}88);"></div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Module Quick-Access Grid -->
      <div style="margin-bottom:24px;">
        <div style="font-size:0.72rem;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
          <i data-lucide="grid-3x3" style="width:12px;height:12px;"></i>
          ALL MODULES
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;" class="dash-module-grid">
          ${moduleCards.map(m => `
            <div class="dash-module-card" data-tab="${m.id}" style="
              background:var(--bg-card);
              border:1px solid var(--border-color);
              border-radius:12px;
              padding:14px 12px;
              cursor:pointer;
              transition:all 0.2s ease;
              display:flex;flex-direction:column;gap:8px;
              position:relative;overflow:hidden;
            ">
              <div style="position:absolute;bottom:-10px;right:-10px;width:50px;height:50px;border-radius:50%;background:${m.color}0a;"></div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <div style="background:${m.color}18;border:1px solid ${m.color}30;border-radius:8px;padding:6px;">
                  <i data-lucide="${m.icon}" style="width:14px;height:14px;color:${m.color};display:block;"></i>
                </div>
                <span style="font-size:0.55rem;font-weight:700;color:${m.color};background:${m.color}18;padding:2px 5px;border-radius:4px;font-family:var(--font-mono);">${m.badge}</span>
              </div>
              <div style="font-size:0.78rem;font-weight:600;color:var(--text-main);line-height:1.2;">${m.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Bottom Row: Activity + System Info -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <!-- Recent Activity -->
        <div class="card" style="padding:18px;">
          <div class="card-title" style="font-size:0.85rem;margin-bottom:14px;">
            <i data-lucide="bell-ring" style="width:14px;height:14px;color:#38bdf8;"></i>
            Recent Activity
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${recentActivity.map(a => `
              <div style="display:flex;align-items:flex-start;gap:10px;">
                <div style="background:${a.color}18;border-radius:7px;padding:5px;flex-shrink:0;">
                  <i data-lucide="${a.icon}" style="width:12px;height:12px;color:${a.color};display:block;"></i>
                </div>
                <div style="flex:1;min-width:0;">
                  <div style="font-size:0.78rem;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${a.msg}</div>
                  <div style="font-size:0.68rem;color:var(--text-dim);margin-top:1px;">${a.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- System Info -->
        <div class="card" style="padding:18px;">
          <div class="card-title" style="font-size:0.85rem;margin-bottom:14px;">
            <i data-lucide="cpu" style="width:14px;height:14px;color:#a855f7;"></i>
            System Info
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;font-family:var(--font-mono);font-size:0.78rem;">
            ${[
              ['Version', 'N.E.X.U.S. v3.2.0', '#38bdf8'],
              ['License', 'MIT Open Source', '#10b981'],
              ['Language', lang.toUpperCase(), '#f59e0b'],
              ['Profile', profile.toUpperCase(), '#a855f7'],
              ['Platform', navigator.platform || 'Unknown', '#06b6d4'],
              ['Host', window.location.hostname + ':' + window.location.port, '#38bdf8'],
            ].map(([k,v,c]) => `
              <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border-color);">
                <span style="color:var(--text-dim);">${k}</span>
                <span style="color:${c};font-weight:600;">${v}</span>
              </div>
            `).join('')}
          </div>
          <div style="margin-top:14px;display:flex;gap:8px;">
            <button class="btn btn-secondary btn-sm" style="flex:1;" id="dash-guide-btn">
              <i data-lucide="book-open" style="width:12px;height:12px;"></i> User Guide
            </button>
            <button class="btn btn-secondary btn-sm" style="flex:1;" id="dash-qr-btn">
              <i data-lucide="smartphone" style="width:12px;height:12px;"></i> Mobile QR
            </button>
          </div>
        </div>
      </div>
    </div>

    <style>
      @keyframes pulse-glow {
        0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.3); }
        50%      { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
      }
      .dash-module-card:hover {
        border-color: rgba(255,255,255,0.18) !important;
        background: rgba(255,255,255,0.04) !important;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      }
      @media (max-width: 900px) {
        .dash-stat-grid { grid-template-columns: repeat(2,1fr) !important; }
        .dash-module-grid { grid-template-columns: repeat(3,1fr) !important; }
      }
      @media (max-width: 600px) {
        .dash-stat-grid { grid-template-columns: 1fr 1fr !important; }
        .dash-module-grid { grid-template-columns: repeat(2,1fr) !important; }
      }
    </style>
  `;

  if (window.lucide) window.lucide.createIcons();

  // Module card clicks → navigate
  container.querySelectorAll('.dash-module-card').forEach(el => {
    el.addEventListener('click', () => store.setActiveTab(el.dataset.tab));
  });

  document.getElementById('dash-refresh-btn')?.addEventListener('click', () => {
    renderDashboard(container);
  });

  document.getElementById('dash-guide-btn')?.addEventListener('click', () => {
    window.dispatchEvent(new Event('open-guide-modal'));
  });

  document.getElementById('dash-qr-btn')?.addEventListener('click', () => {
    window.dispatchEvent(new Event('open-qr-modal'));
  });
}
