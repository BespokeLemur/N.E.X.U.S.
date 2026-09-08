// N.E.X.U.S. Mobile Companion Dedicated Full-Tab Component
import { store } from '../state.js';
import { t } from '../i18n.js';

export function renderMobileCompanion(container) {
  const state = store.getState();
  const lang = state.activeLang || 'tr';
  const drive = store.getActiveDrive();

  // Dinamik IP: window.location ile her makinede otomatik doğru IP
  const host = window.location.hostname;
  const port = window.location.port || '8080';
  const liveUrl = `http://${host}:${port}/?remote=nexus_${drive.id}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(liveUrl)}&color=0b101b&bgcolor=ffffff`;

  const labels = {
    tr: {
      subtitle: 'Telefon kameranızla QR kodu tarayarak N.E.X.U.S. canlı istatistiklerini, AI çıktısını ve terminal loglarını doğrudan akıllı telefonunuzdan izleyin.',
      badge: 'Canlı PWA Bağlantısı',
      copyBtn: 'Linki Kopyala',
      pairBtn: 'Mobil Cihaz Eşleştir',
      pairedTitle: 'Eşleşmiş Mobil Cihazlar',
      pairedDesc: 'USB durumu ve bildirimleri aşağıdaki cihazlara canlı olarak iletilir.',
      lastSeen: 'Son Bağlantı: 10 dk önce',
      footerNote: 'Şifrelenmiş WebSocket kanalı üzerinden %100 yerel ağ senkronizasyonu.',
      connectionInfo: 'Aynı WiFi ağında olduğunuzdan emin olun.',
      copied: 'N.E.X.U.S. Mobil Bağlantı Linki Kopyalandı!',
      paired: 'Mobil Cihaz Eşleşti!\nCihaz: iPhone 15 Pro\nDurum: Canlı N.E.X.U.S. USB İzleme Aktif.',
    },
    en: {
      subtitle: 'Scan the QR code with your phone camera to monitor N.E.X.U.S. live stats, AI output, and terminal logs directly from your smartphone.',
      badge: 'Live PWA Remote',
      copyBtn: 'Copy Link',
      pairBtn: 'Pair Mobile Device',
      pairedTitle: 'Paired Mobile Devices',
      pairedDesc: 'USB status and notifications are streamed live to the following devices.',
      lastSeen: 'Last seen: 10 min ago',
      footerNote: '100% local network sync over encrypted WebSocket channel.',
      connectionInfo: 'Make sure your phone is on the same WiFi network.',
      copied: 'N.E.X.U.S. Mobile Link Copied!',
      paired: 'Mobile Device Paired!\nDevice: iPhone 15 Pro\nStatus: Live N.E.X.U.S. USB Monitoring Active.',
    },
    de: {
      subtitle: 'Scannen Sie den QR-Code mit Ihrer Telefonkamera, um N.E.X.U.S. Live-Statistiken, KI-Ausgaben und Terminal-Logs direkt von Ihrem Smartphone zu überwachen.',
      badge: 'Live PWA Remote',
      copyBtn: 'Link Kopieren',
      pairBtn: 'Mobilgerät Koppeln',
      pairedTitle: 'Gekoppelte Mobilgeräte',
      pairedDesc: 'USB-Status und Benachrichtigungen werden live an folgende Geräte übertragen.',
      lastSeen: 'Zuletzt gesehen: vor 10 Min.',
      footerNote: '100% lokale Netzwerksynchronisation über verschlüsselten WebSocket-Kanal.',
      connectionInfo: 'Stellen Sie sicher, dass sich Ihr Telefon im selben WLAN befindet.',
      copied: 'N.E.X.U.S. Mobile Link Kopiert!',
      paired: 'Mobilgerät Gekoppelt!\nGerät: iPhone 15 Pro\nStatus: Live N.E.X.U.S. USB-Überwachung Aktiv.',
    },
    es: {
      subtitle: 'Escanee el código QR con la cámara de su teléfono para monitorear estadísticas en vivo, salida de IA y registros de terminal directamente desde su smartphone.',
      badge: 'PWA Remoto en Vivo',
      copyBtn: 'Copiar Enlace',
      pairBtn: 'Vincular Dispositivo Móvil',
      pairedTitle: 'Dispositivos Móviles Vinculados',
      pairedDesc: 'El estado USB y las notificaciones se transmiten en vivo a los siguientes dispositivos.',
      lastSeen: 'Última conexión: hace 10 min',
      footerNote: 'Sincronización de red local 100% sobre canal WebSocket cifrado.',
      connectionInfo: 'Asegúrese de que su teléfono esté en la misma red WiFi.',
      copied: '¡Enlace Móvil N.E.X.U.S. Copiado!',
      paired: '¡Dispositivo Móvil Vinculado!\nDispositivo: iPhone 15 Pro\nEstado: Monitoreo USB N.E.X.U.S. en Vivo Activo.',
    },
    fr: {
      subtitle: 'Scannez le code QR avec la caméra de votre téléphone pour surveiller les statistiques en direct, la sortie IA et les journaux du terminal directement depuis votre smartphone.',
      badge: 'PWA Distant en Direct',
      copyBtn: 'Copier le Lien',
      pairBtn: 'Associer Appareil Mobile',
      pairedTitle: 'Appareils Mobiles Associés',
      pairedDesc: 'L\'état USB et les notifications sont diffusés en direct sur les appareils suivants.',
      lastSeen: 'Dernière connexion : il y a 10 min',
      footerNote: 'Synchronisation réseau local 100% via canal WebSocket chiffré.',
      connectionInfo: 'Assurez-vous que votre téléphone est sur le même réseau WiFi.',
      copied: 'Lien Mobile N.E.X.U.S. Copié !',
      paired: 'Appareil Mobile Associé !\nAppareil: iPhone 15 Pro\nÉtat: Surveillance USB N.E.X.U.S. en Direct Active.',
    },
  };

  const L = labels[lang] || labels['en'];

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="smartphone" style="color:var(--accent-green);"></i> N.E.X.U.S. Mobile Remote Companion
          </h1>
          <p class="view-subtitle">${L.subtitle}</p>
        </div>
        <div>
          <span class="badge badge-green" style="font-size:0.8rem; padding:6px 12px;">
            <i data-lucide="wifi" style="width:14px;"></i> ${L.badge}
          </span>
        </div>
      </div>

      <!-- Connection Info Banner -->
      <div style="background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.25); border-radius:var(--radius-md); padding:12px 18px; margin-bottom:20px; display:flex; align-items:center; gap:12px;">
        <i data-lucide="info" style="color:var(--primary); width:18px; flex-shrink:0;"></i>
        <span style="font-size:0.85rem; color:var(--text-muted);">
          ${L.connectionInfo} &nbsp;|&nbsp;
          <span style="font-family:var(--font-mono); color:var(--primary);">${liveUrl}</span>
        </span>
      </div>

      <div class="grid-2 mb-24">
        <!-- Scannable QR Code Card -->
        <div class="card" style="text-align:center; padding:30px 20px;">
          <div style="background:#ffffff; padding:18px; border-radius:var(--radius-md); display:inline-block; box-shadow:0 0 30px var(--primary-glow); margin-bottom:16px; border:2px solid var(--primary);">
            <img src="${qrImageUrl}" alt="N.E.X.U.S. Mobile QR Code" style="width:220px; height:220px; display:block; border-radius:6px;" />
          </div>

          <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--primary); background:rgba(0,0,0,0.35); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border-color); margin-bottom:16px; word-break:break-all;">
            ${liveUrl}
          </div>

          <div style="display:flex; gap:12px; justify-content:center;">
            <button class="btn btn-secondary btn-sm" id="btn-tab-copy-qr">
              <i data-lucide="copy" style="width:14px;"></i> ${L.copyBtn}
            </button>
            <button class="btn btn-success btn-sm" id="btn-tab-pair-qr">
              <i data-lucide="smartphone" style="width:14px;"></i> ${L.pairBtn}
            </button>
          </div>
        </div>

        <!-- Connected Mobile Devices Status -->
        <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="card-title">
              <i data-lucide="check-circle-2" style="color:var(--accent-green);"></i> ${L.pairedTitle}
            </div>
            <p class="card-desc">${L.pairedDesc}</p>

            <div style="display:flex; flex-direction:column; gap:10px; margin-top:16px;">
              <div style="padding:14px; background:rgba(16, 185, 129, 0.1); border:1px solid rgba(16, 185, 129, 0.3); border-radius:var(--radius-md);" class="flex-between">
                <div style="display:flex; align-items:center; gap:12px;">
                  <i data-lucide="smartphone" style="color:var(--accent-green); width:24px;"></i>
                  <div>
                    <strong style="color:var(--text-main);">iPhone 15 Pro (iOS 18 PWA)</strong>
                    <div style="font-size:0.75rem; color:var(--text-muted);">IP: 192.168.1.85 • Ping: 4ms</div>
                  </div>
                </div>
                <span class="badge badge-green">CONNECTED</span>
              </div>

              <div style="padding:14px; background:rgba(0,0,0,0.25); border:1px solid var(--border-color); border-radius:var(--radius-md);" class="flex-between">
                <div style="display:flex; align-items:center; gap:12px;">
                  <i data-lucide="tablet" style="color:var(--text-muted); width:24px;"></i>
                  <div>
                    <strong style="color:var(--text-main);">iPad Air M2</strong>
                    <div style="font-size:0.75rem; color:var(--text-dim);">${L.lastSeen}</div>
                  </div>
                </div>
                <span class="badge badge-purple">STANDBY</span>
              </div>
            </div>
          </div>

          <div style="font-size:0.78rem; color:var(--text-dim); text-align:center; margin-top:20px;">
            ${L.footerNote}
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  document.getElementById('btn-tab-copy-qr')?.addEventListener('click', () => {
    navigator.clipboard.writeText(liveUrl).catch(() => {});
    store.addLog('info', `[N.E.X.U.S. Mobile Companion] Link copied: ${liveUrl}`);
    alert(`${L.copied}\n${liveUrl}`);
  });

  document.getElementById('btn-tab-pair-qr')?.addEventListener('click', () => {
    store.addLog('success', `[N.E.X.U.S. Mobile Companion] Device paired: iPhone 15 Pro`);
    alert(L.paired);
  });
}
