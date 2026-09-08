// DevFlash Direct Share (P2P Local Wi-Fi Sharing Component)
import { store } from '../state.js';

export function renderP2pShare(container) {
  const state = store.getState();
  const peers = state.p2pPeers;
  const drive = store.getActiveDrive();

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="radio" style="color:var(--accent-cyan);"></i> DevFlash Direct Share (P2P Wi-Fi Share)
          </h1>
          <p class="view-subtitle">İnternet olmadan, aynı yerel ağdaki (LAN/Wi-Fi) diğer yazılımcılarla doğrudan P2P kablosuz dosya ve ISO paylaşın.</p>
        </div>
        <div>
          <span class="badge badge-cyan" style="font-size:0.8rem; padding:6px 12px;">
            <i data-lucide="wifi" style="width:14px;"></i> WebRTC P2P Active
          </span>
        </div>
      </div>

      <div class="grid-2 mb-24">
        <!-- Local Peer Discovery -->
        <div class="card">
          <div class="card-title">
            <i data-lucide="users" style="color:var(--primary);"></i> Ağdaki Aktif DevFlash Kullanıcıları (${peers.length})
          </div>
          <p class="card-desc">Yerel ağ otomatik tarandı. Kablosuz dosya göndermek veya almak istediğiniz cihazı seçin.</p>

          <div style="display:flex; flex-direction:column; gap:10px;">
            ${peers.map(p => `
              <div style="padding:12px 16px; background:rgba(0,0,0,0.25); border:1px solid var(--border-color); border-radius:var(--radius-md);" class="flex-between">
                <div style="display:flex; align-items:center; gap:12px;">
                  <i data-lucide="laptop" style="color:var(--accent-green); width:20px;"></i>
                  <div>
                    <strong style="color:var(--text-main); font-size:0.95rem;">${p.name}</strong>
                    <div style="font-size:0.75rem; color:var(--text-dim);">Paylaşılan Veri: ${p.bytesShared}</div>
                  </div>
                </div>
                <button class="btn btn-primary btn-sm" data-send-p2p="${p.name}">
                  <i data-lucide="send" style="width:14px;"></i> Dosya Gönder
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- P2P Dropzone -->
        <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="card-title">
              <i data-lucide="share-2" style="color:var(--accent-purple);"></i> Hızlı P2P Dosya Transferi
            </div>
            <p class="card-desc">USB içindeki herhangi bir ISO, proje veya portable aracı seçip doğrudan ağa yayınlayın.</p>

            <div class="form-group">
              <label class="form-label">Gönderilecek USB Dosyası</label>
              <select class="form-select" id="p2p-file-select">
                ${drive.files.map(f => `<option value="${f.name}">${f.name} (${f.size})</option>`).join('')}
              </select>
            </div>
          </div>

          <button class="btn btn-success btn-block" id="btn-start-p2p-stream">
            <i data-lucide="radio-receiver" style="width:16px;"></i> P2P Kablosuz Yayını Başlat
          </button>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // P2P send simulation
  container.querySelectorAll('[data-send-p2p]').forEach(btn => {
    btn.addEventListener('click', () => {
      const peer = btn.getAttribute('data-send-p2p');
      store.addLog('info', `[WebRTC P2P] "${peer}" cihazına doğrudan bağlantı kuruluyor...`);
      setTimeout(() => {
        store.addLog('success', `[WebRTC P2P] Dosya aktarımı tamamlandı! Alıcı: ${peer}`);
        alert(`Dosya kablosuz P2P hattı üzerinden "${peer}" cihazına aktarıldı!`);
      }, 700);
    });
  });

  document.getElementById('btn-start-p2p-stream')?.addEventListener('click', () => {
    const selectedFile = document.getElementById('p2p-file-select')?.value;
    store.addLog('success', `P2P Yerel Ağ Yayın Odası Açıldı: http://192.168.1.42:8080/share/${selectedFile}`);
    alert(`P2P İndirme Bağlantısı Oluşturuldu!\nİndirme Adresi: http://192.168.1.42:8080/share/${selectedFile}`);
  });
}
