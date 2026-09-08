// Interactive Modals Component with Real Smartphone-Scannable QR Code Generator
import { store } from '../state.js';
import { t } from '../i18n.js';

export function renderDriveModal(container) {
  const state = store.getState();
  const lang = state.activeLang || 'tr';
  const activeDriveId = state.activeDriveId;

  container.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">
        <i data-lucide="usb" style="color:var(--primary);"></i> ${t('drivesLabel', lang)}
      </div>
      <button class="btn btn-secondary btn-sm" id="btn-close-modal">✕</button>
    </div>

    <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:20px;">
      ${state.drives.map(drive => {
        const usedPercent = Math.round((drive.usedBytes / drive.totalBytes) * 100);
        const usedGB = (drive.usedBytes / 1e9).toFixed(1);
        const totalGB = (drive.totalBytes / 1e9).toFixed(0);
        const isSelected = drive.id === activeDriveId;

        return `
          <div style="padding:14px 18px; background:${isSelected ? 'rgba(56, 189, 248, 0.1)' : 'var(--bg-card)'}; border:1px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}; border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center; cursor:pointer;" data-select-drive="${drive.id}">
            <div style="display:flex; align-items:center; gap:14px;">
              <i data-lucide="hard-drive" style="color:${isSelected ? 'var(--primary)' : 'var(--text-muted)'}; width:28px; height:28px;"></i>
              <div>
                <div style="font-weight:700; font-size:1rem; color:var(--text-main);">
                  ${drive.name} (${drive.letter})
                  ${isSelected ? `<span class="badge badge-green" style="font-size:0.65rem; margin-left:6px;">Selected</span>` : ''}
                </div>
                <div style="font-size:0.78rem; color:var(--text-muted);">${drive.filesystem} • ${usedGB} / ${totalGB} GB (%${usedPercent})</div>
              </div>
            </div>

            <button class="btn btn-sm ${isSelected ? 'btn-success' : 'btn-secondary'}">
              ${isSelected ? 'Active' : 'Mount'}
            </button>
          </div>
        `;
      }).join('')}
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center;">
      <button class="btn btn-secondary btn-sm" id="btn-simulate-new-usb">
        <i data-lucide="plus" style="width:14px;"></i> Add Virtual Drive
      </button>
      <button class="btn btn-primary btn-sm" id="btn-confirm-modal">OK</button>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const overlay = document.getElementById('modal-overlay');
  document.getElementById('btn-close-modal')?.addEventListener('click', () => overlay?.classList.add('hidden'));
  document.getElementById('btn-confirm-modal')?.addEventListener('click', () => overlay?.classList.add('hidden'));

  container.querySelectorAll('[data-select-drive]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-select-drive');
      store.setActiveDrive(id);
      overlay?.classList.add('hidden');
    });
  });

  document.getElementById('btn-simulate-new-usb')?.addEventListener('click', () => {
    const letter = String.fromCharCode(71 + state.drives.length);
    const newDrive = {
      id: 'usb_' + Date.now(),
      name: 'NEXUS_DEV_' + letter,
      letter: letter + ':',
      totalBytes: 32000000000,
      usedBytes: 1500000000,
      filesystem: 'FAT32',
      isVentoyInstalled: false,
      ventoyVersion: null,
      isEncrypted: false,
      files: [{ name: 'README.txt', type: 'txt', size: '1 KB' }]
    };
    state.drives.push(newDrive);
    store.setActiveDrive(newDrive.id);
    overlay?.classList.add('hidden');
  });
}

export function renderExplorerModal(container) {
  const state = store.getState();
  const lang = state.activeLang || 'tr';
  const drive = store.getActiveDrive();

  container.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">
        <i data-lucide="folder-tree" style="color:var(--accent-purple);"></i> ${t('fileExplorer', lang)} - ${drive.name} (${drive.letter})
      </div>
      <button class="btn btn-secondary btn-sm" id="btn-close-explorer">✕</button>
    </div>

    <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px; font-family:var(--font-mono);">
      Root Directory: <span style="color:var(--primary);">${drive.letter}\\</span>
    </div>

    <div class="file-tree" style="max-height:350px;">
      ${drive.files.length === 0 ? `
        <div style="color:var(--text-dim); text-align:center; padding:20px;">Drive empty.</div>
      ` : drive.files.map(file => {
        let icon = 'file';
        let color = 'var(--text-muted)';
        if (file.type === 'iso') { icon = 'disc'; color = 'var(--primary)'; }
        else if (file.type === 'exe') { icon = 'box'; color = 'var(--accent-purple)'; }
        else if (file.type === 'vault') { icon = 'shield-alert'; color = 'var(--accent-amber)'; }
        else if (file.type === 'script') { icon = 'file-code'; color = 'var(--accent-green)'; }

        return `
          <div class="file-item">
            <div class="file-name">
              <i data-lucide="${icon}" style="color:${color}; width:16px;"></i>
              <span>${file.name}</span>
            </div>
            <span class="file-size">${file.size}</span>
          </div>
        `;
      }).join('')}
    </div>

    <div style="margin-top:16px; display:flex; justify-content:flex-end;">
      <button class="btn btn-primary btn-sm" id="btn-done-explorer">Close</button>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const overlay = document.getElementById('modal-overlay');
  document.getElementById('btn-close-explorer')?.addEventListener('click', () => overlay?.classList.add('hidden'));
  document.getElementById('btn-done-explorer')?.addEventListener('click', () => overlay?.classList.add('hidden'));
}

export function renderQrModal(container) {
  const state = store.getState();
  const lang = state.activeLang || 'tr';
  const drive = store.getActiveDrive();
  // Dinamik IP: Hangi makinede çalışırsa o makinenin IP'sini kullan
  const host = window.location.hostname;
  const port = window.location.port || '5173';
  const liveUrl = `http://${host}:${port}/?remote=nexus_${drive.id}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(liveUrl)}&color=0b101b&bgcolor=ffffff`;

  container.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">
        <i data-lucide="qr-code" style="color:var(--accent-green);"></i> N.E.X.U.S. Mobile Remote Companion
      </div>
      <button class="btn btn-secondary btn-sm" id="btn-close-qr">✕</button>
    </div>

    <div style="text-align:center; padding:10px 0;">
      <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:16px;">
        Telefonunuzun kamerasından QR kodu okutarak USB canlı istatistiklerini, AI çıktısını ve terminal loglarını mobil cihazınızdan izleyin.
      </p>

      <!-- Real Scannable High-Precision QR Code Image -->
      <div style="background:#ffffff; padding:16px; border-radius:var(--radius-md); display:inline-block; box-shadow:0 0 30px var(--primary-glow); margin-bottom:14px; border:2px solid var(--primary);">
        <img src="${qrImageUrl}" alt="N.E.X.U.S. Mobile QR Code" style="width:200px; height:200px; display:block; border-radius:4px;" />
      </div>

      <div style="font-family:var(--font-mono); font-size:0.8rem; color:var(--primary); background:rgba(0,0,0,0.35); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border-color); margin-bottom:16px;">
        ${liveUrl}
      </div>

      <div style="display:flex; gap:10px; justify-content:center;">
        <button class="btn btn-secondary btn-sm" id="btn-copy-qr-link">
          <i data-lucide="copy" style="width:14px;"></i> Linki Kopyala
        </button>
        <button class="btn btn-success btn-sm" id="btn-simulate-qr-pair">
          <i data-lucide="smartphone" style="width:14px;"></i> Mobil Cihaz Bağla
        </button>
      </div>
    </div>

    <div style="margin-top:16px; display:flex; justify-content:flex-end;">
      <button class="btn btn-primary btn-sm" id="btn-done-qr">Kapat</button>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const overlay = document.getElementById('modal-overlay');
  document.getElementById('btn-close-qr')?.addEventListener('click', () => overlay?.classList.add('hidden'));
  document.getElementById('btn-done-qr')?.addEventListener('click', () => overlay?.classList.add('hidden'));

  document.getElementById('btn-copy-qr-link')?.addEventListener('click', () => {
    navigator.clipboard.writeText(liveUrl);
    store.addLog('info', `[N.E.X.U.S. QR Companion] Mobile remote link copied: ${liveUrl}`);
    alert(`N.E.X.U.S. Mobil Bağlantı Linki Kopyalandı!\n${liveUrl}`);
  });

  document.getElementById('btn-simulate-qr-pair')?.addEventListener('click', () => {
    store.addLog('success', `[N.E.X.U.S. Mobile Companion] Mobil Cihaz Eşleşti: iPhone 15 Pro (iOS App v1.0)`);
    alert(`Mobil Cihaz Eşleşti!\nCihaz: iPhone 15 Pro\nDurum: Canlı N.E.X.U.S. USB İzleme Aktif.`);
    overlay?.classList.add('hidden');
  });
}
