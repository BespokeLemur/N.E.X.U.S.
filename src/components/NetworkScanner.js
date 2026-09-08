// NetworkScanner.js — N.E.X.U.S. LAN Peer Discovery Module
import { store } from '../state.js';
import { t } from '../i18n.js';

const mockPeers = [
  { ip: '192.168.1.100', name: 'NEXUS-USB-01', status: 'online', latency: 4,   os: 'Windows 11',  modules: 16, badge: 'badge-cyan'   },
  { ip: '192.168.1.102', name: 'NEXUS-USB-02', status: 'online', latency: 12,  os: 'Ubuntu 24.04', modules: 14, badge: 'badge-green'  },
  { ip: '192.168.1.105', name: 'NEXUS-USB-03', status: 'idle',   latency: 28,  os: 'macOS 15',    modules: 18, badge: 'badge-amber'  },
  { ip: '192.168.1.110', name: 'NEXUS-USB-04', status: 'offline',latency: null, os: 'Unknown',    modules: 0,  badge: 'badge-rose'   },
];

const statusColors = { online: '#10b981', idle: '#f59e0b', offline: '#f43f5e' };

export function renderNetworkScanner(container) {
  const { activeLang: lang } = store.getState();
  let scanning = false;
  let scanProgress = 0;
  let foundCount = 3;

  function render() {
    container.innerHTML = `
      <div class="view-container">
        <!-- Header -->
        <div class="view-header">
          <div>
            <div class="view-title">
              <i data-lucide="wifi" style="color:#38bdf8;"></i>
              LAN Network Scanner
            </div>
            <div class="view-subtitle">Discover N.E.X.U.S. peers on your local network</div>
          </div>
          <div style="display:flex;gap:8px;">
            <span class="badge badge-cyan">
              <i data-lucide="users" style="width:10px;height:10px;"></i>
              ${foundCount} peers found
            </span>
            <button class="btn btn-primary btn-sm" id="scan-start-btn">
              <i data-lucide="${scanning ? 'loader' : 'search'}" style="width:13px;height:13px;${scanning ? 'animation:spin 1s linear infinite;' : ''}"></i>
              ${scanning ? 'Scanning…' : 'Scan Network'}
            </button>
          </div>
        </div>

        <!-- Scan Progress -->
        <div id="scan-progress-wrap" style="display:${scanning ? 'block' : 'none'};margin-bottom:16px;">
          <div style="font-family:var(--font-mono);font-size:0.8rem;color:var(--text-muted);margin-bottom:6px;">
            Scanning 192.168.1.0/24 — ${scanProgress}%
          </div>
          <div class="progress-container">
            <div class="progress-bar" id="scan-progress-bar" style="width:${scanProgress}%;transition:width 0.4s ease;"></div>
          </div>
        </div>

        <!-- Network Map & Host Info -->
        <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:20px;">
          <!-- Subnet Card -->
          <div class="card" style="padding:18px;">
            <div class="card-title" style="font-size:0.85rem;margin-bottom:14px;">
              <i data-lucide="network" style="width:14px;height:14px;color:#38bdf8;"></i>
              Network Overview
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
              ${[
                ['Subnet',    '192.168.1.0/24', '#38bdf8'],
                ['Gateway',   '192.168.1.1',    '#10b981'],
                ['Host IP',   window.location.hostname || '127.0.0.1', '#a855f7'],
                ['Protocol',  'IPv4',            '#06b6d4'],
                ['Range',     '254 hosts',       '#f59e0b'],
                ['Open Port', '8080',            '#10b981'],
              ].map(([k,v,c]) => `
                <div style="background:rgba(0,0,0,0.25);border-radius:8px;padding:10px 12px;border:1px solid var(--border-color);">
                  <div style="font-size:0.68rem;color:var(--text-dim);margin-bottom:3px;text-transform:uppercase;letter-spacing:0.05em;">${k}</div>
                  <div style="font-family:var(--font-mono);font-size:0.82rem;color:${c};font-weight:600;">${v}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- This Device -->
          <div class="card" style="padding:18px;border-color:rgba(56,189,248,0.25);">
            <div class="card-title" style="font-size:0.85rem;margin-bottom:14px;">
              <i data-lucide="monitor" style="width:14px;height:14px;color:#38bdf8;"></i>
              This Device
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;font-family:var(--font-mono);font-size:0.78rem;">
              <div style="background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.2);border-radius:8px;padding:8px 10px;text-align:center;">
                <div style="font-size:1.1rem;font-weight:700;color:#38bdf8;">${window.location.hostname || '127.0.0.1'}</div>
                <div style="color:var(--text-dim);font-size:0.68rem;margin-top:2px;">HOST · PORT ${window.location.port || '8080'}</div>
              </div>
              <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border-color);">
                <span style="color:var(--text-dim);">Status</span>
                <span style="color:#10b981;font-weight:600;">● RUNNING</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border-color);">
                <span style="color:var(--text-dim);">Modules</span>
                <span style="color:#38bdf8;font-weight:600;">18 / 18</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding:4px 0;">
                <span style="color:var(--text-dim);">Uptime</span>
                <span style="color:#a855f7;font-weight:600;" id="net-uptime">0:00</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm btn-block" style="margin-top:10px;" id="share-peer-btn">
              <i data-lucide="share-2" style="width:12px;height:12px;"></i> Share My URL
            </button>
          </div>
        </div>

        <!-- Peer List -->
        <div class="card" style="padding:18px;">
          <div class="card-title" style="font-size:0.85rem;margin-bottom:14px;">
            <i data-lucide="users" style="width:14px;height:14px;color:#a855f7;"></i>
            Discovered Peers
            <span class="badge badge-purple" style="margin-left:auto;font-size:0.65rem;">${mockPeers.length} devices</span>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;">
            <!-- Table Header -->
            <div style="display:grid;grid-template-columns:1fr 140px 80px 80px 100px auto;gap:12px;padding:4px 10px;font-size:0.68rem;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.07em;">
              <span>Device</span><span>IP Address</span><span>Status</span><span>Latency</span><span>OS</span><span>Actions</span>
            </div>
            <!-- Separator -->
            <div style="height:1px;background:var(--border-color);"></div>

            ${mockPeers.map(p => `
              <div class="peer-row" style="
                display:grid;grid-template-columns:1fr 140px 80px 80px 100px auto;
                gap:12px;align-items:center;padding:10px;
                border-radius:8px;transition:background 0.15s;
                border:1px solid transparent;
              ">
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:32px;height:32px;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.2);border-radius:8px;display:flex;align-items:center;justify-content:center;">
                    <i data-lucide="hard-drive" style="width:14px;height:14px;color:#38bdf8;"></i>
                  </div>
                  <div>
                    <div style="font-size:0.82rem;font-weight:600;font-family:var(--font-mono);">${p.name}</div>
                    <div style="font-size:0.68rem;color:var(--text-dim);">${p.modules} modules</div>
                  </div>
                </div>
                <span style="font-family:var(--font-mono);font-size:0.8rem;color:var(--text-muted);">${p.ip}</span>
                <div style="display:flex;align-items:center;gap:5px;">
                  <span style="width:7px;height:7px;border-radius:50%;background:${statusColors[p.status]};${p.status==='online'?'box-shadow:0 0 6px '+statusColors[p.status]+';':''}"></span>
                  <span style="font-size:0.75rem;font-weight:600;color:${statusColors[p.status]};">${p.status.toUpperCase()}</span>
                </div>
                <span style="font-family:var(--font-mono);font-size:0.78rem;color:${p.latency ? (p.latency<10?'#10b981':p.latency<30?'#f59e0b':'#f43f5e') : 'var(--text-dim)'};">
                  ${p.latency ? p.latency+'ms' : '—'}
                </span>
                <span style="font-size:0.75rem;color:var(--text-muted);">${p.os}</span>
                <div style="display:flex;gap:6px;">
                  ${p.status !== 'offline' ? `
                    <button class="btn btn-secondary btn-sm peer-connect-btn" data-ip="${p.ip}" data-name="${p.name}" style="padding:4px 8px;font-size:0.72rem;" title="Connect">
                      <i data-lucide="external-link" style="width:11px;height:11px;"></i>
                    </button>
                    <button class="btn btn-secondary btn-sm peer-ping-btn" data-ip="${p.ip}" style="padding:4px 8px;font-size:0.72rem;" title="Ping">
                      <i data-lucide="zap" style="width:11px;height:11px;"></i>
                    </button>
                  ` : `<span style="font-size:0.7rem;color:var(--text-dim);">Unreachable</span>`}
                </div>
              </div>
            `).join('')}
          </div>

          <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border-color);display:flex;gap:8px;align-items:center;">
            <i data-lucide="info" style="width:12px;height:12px;color:var(--text-dim);flex-shrink:0;"></i>
            <span style="font-size:0.73rem;color:var(--text-dim);">
              Peers must run N.E.X.U.S. on port 8080 on the same WiFi network for detection.
            </span>
          </div>
        </div>
      </div>

      <style>
        @keyframes spin { to { transform: rotate(360deg); } }
        .peer-row:hover { background: rgba(255,255,255,0.03); border-color: var(--border-color) !important; }
      </style>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Uptime counter
    const start = Date.now();
    const uptimeEl = document.getElementById('net-uptime');
    if (uptimeEl) {
      const tick = setInterval(() => {
        if (!document.getElementById('net-uptime')) { clearInterval(tick); return; }
        const s = Math.floor((Date.now() - start) / 1000);
        const m = Math.floor(s / 60), sec = s % 60;
        document.getElementById('net-uptime').textContent = `${m}:${String(sec).padStart(2,'0')}`;
      }, 1000);
    }

    // Scan button
    document.getElementById('scan-start-btn')?.addEventListener('click', () => {
      if (scanning) return;
      scanning = true; scanProgress = 0;
      render();
      const interval = setInterval(() => {
        scanProgress = Math.min(scanProgress + Math.random() * 18, 100);
        const bar = document.getElementById('scan-progress-bar');
        if (bar) bar.style.width = scanProgress + '%';
        if (scanProgress >= 100) {
          clearInterval(interval);
          scanning = false;
          foundCount = mockPeers.filter(p => p.status !== 'offline').length;
          render();
        }
      }, 250);
    });

    // Peer connect
    container.querySelectorAll('.peer-connect-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ip = btn.dataset.ip;
        window.open(`http://${ip}:8080`, '_blank');
      });
    });

    // Peer ping (visual feedback)
    container.querySelectorAll('.peer-ping-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.innerHTML = '<i data-lucide="check" style="width:11px;height:11px;color:#10b981;"></i>';
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          btn.innerHTML = '<i data-lucide="zap" style="width:11px;height:11px;"></i>';
          if (window.lucide) window.lucide.createIcons();
        }, 1500);
      });
    });

    // Share button
    document.getElementById('share-peer-btn')?.addEventListener('click', () => {
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          const btn = document.getElementById('share-peer-btn');
          if (btn) { btn.textContent = '✓ Copied!'; setTimeout(() => { if(document.getElementById('share-peer-btn')) render(); }, 1500); }
        });
      }
    });
  }

  render();
}
