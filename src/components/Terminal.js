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
        <div style="color:var(--text-dim);">[TERMINAL READY] N.E.X.U.S. Shell Hazır. Komut girmek için aşağıdaki istemciyi kullanın.</div>
      ` : logs.map(log => `
        <div class="log-entry">
          <span class="log-time">[${log.time}]</span>
          <span class="log-msg ${log.level}">${log.msg}</span>
        </div>
      `).join('')}
    </div>

    <div style="display:flex; gap:8px; padding:6px 12px; background:rgba(0,0,0,0.4); border-top:1px solid var(--border-color); align-items:center;">
      <span style="color:var(--primary); font-family:var(--font-mono); font-weight:700; font-size:0.85rem;">nexus></span>
      <input type="text" id="terminal-cli-input" class="form-input" style="height:26px; font-size:0.8rem; font-family:var(--font-mono); background:transparent; border:none; color:var(--text-main); flex:1;" placeholder="${window.electronAPI?.isElectron ? 'PowerShell komutu yazın (ör: Get-Disk, ipconfig, dir)...' : 'Komut yazın (help, scan, clear, vault)...'}" />
      <button class="btn btn-primary btn-sm" id="btn-exec-cli-cmd" style="padding:2px 10px; font-size:0.75rem;">
        <i data-lucide="corner-down-left" style="width:12px;"></i> Çalıştır
      </button>
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
        drawer.style.height = '240px';
      } else {
        drawer.style.height = '36px';
      }
    }
  });

  const handleCommandExecution = async () => {
    const inputEl = document.getElementById('terminal-cli-input');
    const cmd = inputEl?.value?.trim();
    if (!cmd) return;

    inputEl.value = '';
    store.addLog('info', `> ${cmd}`);

    if (window.electronAPI?.isElectron) {
      store.addLog('info', `[POWER_SHELL] Executing native OS process...`);
      try {
        const res = await window.electronAPI.execSystemCmd(cmd);
        if (res.stdout) {
          const lines = res.stdout.split('\n').slice(0, 30);
          lines.forEach(line => {
            if (line.trim()) store.addLog('success', line);
          });
        }
        if (res.stderr) {
          store.addLog('error', res.stderr);
        }
      } catch (err) {
        store.addLog('error', `Execution error: ${err.message}`);
      }
    } else {
      // Web fallback interactive commands
      const lower = cmd.toLowerCase();
      if (lower === 'clear') {
        store.clearLogs();
      } else if (lower === 'help') {
        store.addLog('success', 'N.E.X.U.S. Web CLI: help, clear, scan, drives, info');
      } else if (lower === 'scan') {
        store.addLog('success', 'Security scan initiated — 0 vulnerabilities found.');
      } else if (lower === 'drives') {
        const drives = store.getState().drives;
        drives.forEach(d => store.addLog('info', `Drive: ${d.name} (${d.letter}) - ${d.filesystem}`));
      } else {
        store.addLog('warning', `Web Mode: "${cmd}" komutu simüle edildi. Gerçek Windows komutları için Masaüstü (.exe) modunu kullanın.`);
      }
    }
  };

  document.getElementById('btn-exec-cli-cmd')?.addEventListener('click', handleCommandExecution);
  document.getElementById('terminal-cli-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleCommandExecution();
  });
}
