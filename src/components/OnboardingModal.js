// N.E.X.U.S. Interactive Onboarding & User Guide Modal System (Full 5-Language i18n)
import { store } from '../state.js';
import { t } from '../i18n.js';

const guideSteps = {
  tr: [
    {
      title: '🚀 1. N.E.X.U.S. Sistemine Hoş Geldiniz!',
      desc: 'N.E.X.U.S. (Native Environment for Xero-trace Usb Systems), USB belleğinizi iz bırakmayan taşınabilir bir geliştirme istasyonuna dönüştürür. Hedef bilgisayara 1 tane bile program yüklemeden kendi VS Code, Git, Python ve AI ortamınızı çalıştırırsınız.',
      badge: 'GİRİŞ'
    },
    {
      title: '⚡ 2. USB Boot & Canlı Linux (Ventoy)',
      desc: 'Sol menüdeki "USB Setup & Boot" modülünü kullanarak USB belleğinize 1-tıkla Ventoy Bootloader yükleyebilirsiniz. İndirdiğiniz Ubuntu, Arch veya Kali Linux ISO imajlarını sürükleyip bırakarak bilgisayar açılışında canlı işletim sistemi başlatabilirsiniz.',
      badge: 'BOOT'
    },
    {
      title: '🧰 3. Taşınabilir IDE & Başlatıcı Script',
      desc: '"Portable Dev Pack" sekmesinden VS Code, Git, Node.js ve Python paketlerini USB belleğinize ekleyebilirsiniz. "Başlatıcı Script İndir (.bat)" butonuna basarak bilgisayarınızda yönetici izni olmadan iz bırakmayan taşınabilir ortamı aktif edersiniz.',
      badge: 'PORTABLE'
    },
    {
      title: '🤖 4. Çevrimdışı Yapay Zeka (Offline AI Node)',
      desc: '"Offline AI Node" modülü sayesinde internet erişimi olmayan ortamlarda bile USB içindeki Ollama ve Qwen2.5-Coder GGUF modelleriyle %100 gizli ve çevrimdışı kod yardımı alabilirsiniz.',
      badge: 'AI ENGINE'
    },
    {
      title: '🔒 5. Kod Kasası & Acil Güvenlik',
      desc: 'Hassas projelerinizi "Kod Kasası" modülünde AES-256-GCM ile şifreleyin. Güvenmediğiniz bilgisayarlara USB takmadan önce "Acil Güvenlik" modülüyle ClamAV virüs ve rootkit taraması yapın.',
      badge: 'SECURITY'
    },
    {
      title: '⚡ 6. Sıfır-İz Temizliği & Güvenli Çıkarma',
      desc: 'Çalışmanız bittiğinde sağ üstteki "İz Temizle" butonuna tıklayarak hedef bilgisayarda oluşan tüm geçici çerezleri, kayıt defteri izlerini ve kabuk geçmişini 100% temizleyip USB belleğinizi güvenle çıkarabilirsiniz.',
      badge: 'ZERO-TRACE'
    }
  ],
  en: [
    {
      title: '🚀 1. Welcome to N.E.X.U.S.!',
      desc: 'N.E.X.U.S. (Native Environment for Xero-trace Usb Systems) turns your USB flash drive into a zero-trace portable development workspace. Run your VS Code, Git, Python & AI tools on any PC without installing anything.',
      badge: 'INTRO'
    },
    {
      title: '⚡ 2. USB Boot & Live Linux (Ventoy)',
      desc: 'Use "USB Setup & Boot" module to write Ventoy Bootloader in 1 click. Drag & drop Ubuntu, Arch or Kali Linux ISOs to boot live OS environments on machine startup.',
      badge: 'BOOT'
    },
    {
      title: '🧰 3. Portable IDEs & Launcher Scripts',
      desc: 'Install VS Code, Git, Node.js & Python to USB in "Portable Dev Pack". Download the Launcher Script (.bat/.sh) to activate zero-admin portable environment on host PC.',
      badge: 'PORTABLE'
    },
    {
      title: '🤖 4. Offline AI Coding Assistant',
      desc: 'With "Offline AI Node", run Ollama & Qwen2.5-Coder GGUF models off USB for 100% offline & private AI code assistance without internet.',
      badge: 'AI ENGINE'
    },
    {
      title: '🔒 5. Encrypted Code Vault & Security',
      desc: 'Secure sensitive repositories in "Code Vault" with AES-256-GCM encryption. Run ClamAV malware & process audit in "Emergency Security" before coding on unknown PCs.',
      badge: 'SECURITY'
    },
    {
      title: '⚡ 6. Zero-Trace Purge & Safe Eject',
      desc: 'When finished, click "Purge Traces" in the header to clean 100% of temporary caches, registry keys & shell history on the host machine before safely ejecting USB.',
      badge: 'ZERO-TRACE'
    }
  ],
  de: [
    {
      title: '🚀 1. Willkommen bei N.E.X.U.S.!',
      desc: 'N.E.X.U.S. verwandelt Ihren USB-Stick in eine spurlose tragbare Entwicklerumgebung. Führen Sie Ihre Entwickler-Tools auf jedem PC ohne Installation aus.',
      badge: 'INTRO'
    },
    {
      title: '⚡ 2. USB Boot & Live Linux (Ventoy)',
      desc: 'Installieren Sie den Ventoy Bootloader mit 1 Klick. Ziehen Sie Ubuntu- oder Arch-ISOs auf den USB-Stick, um Live-Betriebssysteme zu starten.',
      badge: 'BOOT'
    },
    {
      title: '🧰 3. Tragbares Entwickler-Paket',
      desc: 'Fügen Sie VS Code, Git, Node.js und Python zum USB-Stick hinzu. Laden Sie das Starter-Skript (.bat) herunter, um die tragbare Umgebung ohne Admin-Rechte zu aktivieren.',
      badge: 'PORTABLE'
    },
    {
      title: '🤖 4. Lokale Offline-KI',
      desc: 'Nutzen Sie den lokalen KI-Knoten (Ollama / Qwen2.5-Coder), um 100% offline und privat KI-Code-Unterstützung zu erhalten.',
      badge: 'AI ENGINE'
    },
    {
      title: '🔒 5. Code-Tresor & Notfall-Sicherheit',
      desc: 'Verschlüsseln Sie Ihre Projekte mit AES-256-GCM im Code-Tresor. Führen Sie vor dem Arbeiten einen ClamAV-Virenscan durch.',
      badge: 'SECURITY'
    },
    {
      title: '⚡ 6. Spurenlose Reinigung',
      desc: 'Klicken Sie nach der Arbeit auf "Spuren löschen", um 100% der temporären Dateien und des Verlaufs auf dem Ziel-PC zu bereinigen.',
      badge: 'ZERO-TRACE'
    }
  ],
  es: [
    {
      title: '🚀 1. ¡Bienvenido a N.E.X.U.S.!',
      desc: 'N.E.X.U.S. convierte su memoria USB en un entorno de desarrollo portátil sin rastro. Ejecute sus herramientas en cualquier PC sin instalar nada.',
      badge: 'INTRO'
    },
    {
      title: '⚡ 2. Arranque USB y Live Linux (Ventoy)',
      desc: 'Instale el cargador de arranque Ventoy con un solo clic. Arrastre y suelte archivos ISO para arrancar sistemas operativos en vivo.',
      badge: 'BOOT'
    },
    {
      title: '🧰 3. Herramientas portátiles y script de inicio',
      desc: 'Agregue VS Code, Git, Node.js y Python a su memoria USB. Descargue el script de inicio (.bat) para activar el entorno sin permisos de administrador.',
      badge: 'PORTABLE'
    },
    {
      title: '🤖 4. Asistente de IA fuera de línea',
      desc: 'Utilice el nodo IA local (Ollama / Qwen2.5-Coder) para obtener asistencia de código 100% privada y fuera de línea.',
      badge: 'AI ENGINE'
    },
    {
      title: '🔒 5. Bóveda cifrada y seguridad',
      desc: 'Proteja sus proyectos en la Bóveda cifrada con AES-256-GCM. Realice un análisis antivirus con ClamAV antes de codificar.',
      badge: 'SECURITY'
    },
    {
      title: '⚡ 6. Limpieza sin rastro',
      desc: 'Al finalizar, haga clic en "Limpiar rastros" para borrar el 100% de los archivos temporales en el equipo de destino.',
      badge: 'ZERO-TRACE'
    }
  ],
  fr: [
    {
      title: '🚀 1. Bienvenue sur N.E.X.U.S. !',
      desc: 'N.E.X.U.S. transforme votre clé USB en un espace de travail de développement portable sans trace. Exécutez vos outils sur n\'importe quel PC sans rien installer.',
      badge: 'INTRO'
    },
    {
      title: '⚡ 2. Démarrage USB & Live Linux (Ventoy)',
      desc: 'Installez le chargeur d\'amorçage Ventoy en 1 clic. Glissez-déposez des fichiers ISO pour démarrer des systèmes d\'exploitation live.',
      badge: 'BOOT'
    },
    {
      title: '🧰 3. Outils portables & script de lancement',
      desc: 'Ajoutez VS Code, Git, Node.js et Python sur votre clé USB. Téléchargez le script de lancement (.bat) pour activer l\'environnement portable.',
      badge: 'PORTABLE'
    },
    {
      title: '🤖 4. Assistant IA hors ligne',
      desc: 'Utilisez le nœud IA local (Ollama / Qwen2.5-Coder) pour bénéficier d\'une assistance de code 100% privée et hors ligne.',
      badge: 'AI ENGINE'
    },
    {
      title: '🔒 5. Coffre-fort chiffré & Sécurité',
      desc: 'Sécurisez vos projets dans le coffre-fort chiffré AES-256-GCM. Effectuez un scan antivirus avec ClamAV avant de coder.',
      badge: 'SECURITY'
    },
    {
      title: '⚡ 6. Nettoyage sans trace',
      desc: 'Une fois terminé, cliquez sur "Effacer les traces" pour nettoyer 100% des fichiers temporaires sur l\'ordinateur hôte.',
      badge: 'ZERO-TRACE'
    }
  ]
};

let currentStep = 0;

export function renderOnboardingModal(container) {
  const state = store.getState();
  const lang = state.activeLang || 'tr';
  const steps = guideSteps[lang] || guideSteps.tr;

  const step = steps[currentStep] || steps[0];

  const labels = {
    tr: { title: 'N.E.X.U.S. Kullanım Kılavuzu & Onboarding', prev: 'Önceki', next: 'Sonraki', finish: 'Tamamla & Başla', stepText: 'Adım' },
    en: { title: 'N.E.X.U.S. User Guide & Onboarding', prev: 'Previous', next: 'Next', finish: 'Finish & Start', stepText: 'Step' },
    de: { title: 'N.E.X.U.S. Benutzerhandbuch', prev: 'Zurück', next: 'Weiter', finish: 'Fertigstellen', stepText: 'Schritt' },
    es: { title: 'Guía de usuario de N.E.X.U.S.', prev: 'Anterior', next: 'Siguiente', finish: 'Finalizar', stepText: 'Paso' },
    fr: { title: 'Guide d\'utilisation N.E.X.U.S.', prev: 'Précédent', next: 'Suivant', finish: 'Terminer', stepText: 'Étape' }
  };

  const l = labels[lang] || labels.tr;

  container.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">
        <i data-lucide="book-open" style="color:var(--primary);"></i> ${l.title}
      </div>
      <button class="btn btn-secondary btn-sm" id="btn-close-guide">✕</button>
    </div>

    <!-- Progress Dots -->
    <div style="display:flex; justify-content:center; gap:8px; margin-bottom:20px;">
      ${steps.map((_, idx) => `
        <div style="width:${idx === currentStep ? '28px' : '10px'}; height:8px; border-radius:var(--radius-full); background:${idx === currentStep ? 'var(--primary)' : 'rgba(255,255,255,0.15)'}; transition:all 0.3s ease;"></div>
      `).join('')}
    </div>

    <!-- Active Step Card -->
    <div style="padding:24px; background:rgba(0,0,0,0.3); border:1px solid var(--border-highlight); border-radius:var(--radius-lg); margin-bottom:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-main);">${step.title}</h3>
        <span class="badge badge-purple">${step.badge}</span>
      </div>
      <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6;">${step.desc}</p>
    </div>

    <!-- Navigation Controls -->
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <button class="btn btn-secondary btn-sm" id="btn-guide-prev" ${currentStep === 0 ? 'disabled' : ''}>
        <i data-lucide="chevron-left" style="width:14px;"></i> ${l.prev}
      </button>

      <span style="font-size:0.8rem; color:var(--text-dim); font-family:var(--font-mono);">
        ${l.stepText} ${currentStep + 1} / ${steps.length}
      </span>

      ${currentStep === steps.length - 1 ? `
        <button class="btn btn-success btn-sm" id="btn-guide-finish">
          <i data-lucide="check-circle" style="width:14px;"></i> ${l.finish}
        </button>
      ` : `
        <button class="btn btn-primary btn-sm" id="btn-guide-next">
          ${l.next} <i data-lucide="chevron-right" style="width:14px;"></i>
        </button>
      `}
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const overlay = document.getElementById('modal-overlay');

  document.getElementById('btn-close-guide')?.addEventListener('click', () => overlay?.classList.add('hidden'));
  document.getElementById('btn-guide-finish')?.addEventListener('click', () => overlay?.classList.add('hidden'));

  document.getElementById('btn-guide-prev')?.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      renderOnboardingModal(container);
    }
  });

  document.getElementById('btn-guide-next')?.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      renderOnboardingModal(container);
    }
  });
}
