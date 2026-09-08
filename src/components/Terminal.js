// Terminal Drawer Component for Real-time Execution Logs
import { store } from '../state.js';

export function renderTerminal(container) {
  const state = store.getState();
  const logs = state.terminalLogs;

  container.innerHTML = `
    <div class="terminal-header">
      <div class="terminal-title">
        <i data-lucide="terminal" style="width:14px; color:var(--primary);"></i>
        <span>DEVFLASH TERMINAL / CLI CONSOLE LOGS</span>
        <span class="badge badge-cyan" style="font-size:0.65rem; padding:1px 5px;">LIVE</span>
      </div>
      <div class="terminal-controls">
        <button class="terminal-btn" id="btn-clear-logs" title="Temizle">
          <i data-lucide="trash-2" style="width:14px;"></i>
        </button>
        <button class="terminal-btn" id="btn-toggle-terminal" title="Terminali Küçült/Büyüt">
          <i data-lucide="chevron-down" style="width:14px;"></i>
        </button>
      </div>
    </div>

    <div class="terminal-body" id="terminal-logs-body">
      ${logs.length === 0 ? `
        <div style="color:var(--text-dim);">[TERMINAL READY] Bekleyen aktif işlem yok.</div>
      ` : logs.map(log => `
        <div class="log-entry">
          <span class="log-time">[${log.time}]</span>
          <span class="log-msg ${log.level}">${log.msg}</span>
        </div>
      `).join('')}
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Auto-scroll terminal to bottom
  const logsBody = document.getElementById('terminal-logs-body');
  if (logsBody) {
    logsBody.scrollTop = logsBody.scrollHeight;
  }

  document.getElementById('btn-clear-logs')?.addEventListener('click', () => {
    store.clearLogs();
  });

  const drawer = document.getElementById('terminal-drawer');
  document.getElementById('btn-toggle-terminal')?.addEventListener('click', () => {
    if (drawer) {
      if (drawer.style.height === '36px') {
        drawer.style.height = '180px';
      } else {
        drawer.style.height = '36px';
      }
    }
  });
}
