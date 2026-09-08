// N.E.X.U.S. Comprehensive i18n Translation Dictionary for All 16 Modules

export const translations = {
  tr: {
    langName: 'Türkçe',
    flag: '🇹🇷',
    subtitle: 'NATIVE ENVIRONMENT FOR XERO-TRACE USB SYSTEMS',
    fullTestBtn: '⚡ Tam Sistem Testi',
    readOnly: 'Salt Okunur',
    writeable: 'Yazılabilir',
    mobile: 'Mobil',
    purge: 'İz Temizle',
    profileLabel: 'ÇALIŞMA PROFİLİ',
    modulesLabel: 'N.E.X.U.S. MODÜLLERİ',
    drivesLabel: 'TAKILI SÜRÜCÜLER',

    // Nav Titles
    ventoy: 'USB Setup & Boot',
    portable: 'Portable Dev Pack',
    ai_node: 'Offline AI Node',
    docker_cache: 'Docker Önbellek',
    vault: 'Kod Kasası (AES)',
    ssh_vault: 'SSH & Token Kasası',
    security_scan: 'Acil Güvenlik',
    sbom_audit: 'SBOM & Lisans Denetimi',
    p2p_share: 'P2P Direct Share',
    dotfiles: 'Dotfiles & Kabuk Teması',
    cloud_backup: 'Bulut Senkronizasyonu',
    isohub: 'ISO / Distro Merkezi',
    hostaudit: 'Sistem Tarayıcısı',
    usb_benchmark: 'USB Hız & Sağlık',
    retro_games: 'Dev Break Lounge',
    marketplace: 'Dev Marketplace',

    // View Titles & Subtitles
    ventoyTitle: 'USB Hazırlayıcı & Multi-Boot',
    ventoySub: 'Ventoy mimarisi ile USB belleğinizi sürükle-bırak canlı boot diski yapın.',
    ventoyCard1Title: 'Sürücü Yapılandırması & Boot Kurulumu',
    ventoyCard1Desc: 'Ventoy Bootloader dosya sisteminizi sıfırlamadan ISO dosyalarını çalıştırmanızı sağlar.',
    ventoyCard2Title: 'ISO İmajı Sürükle-Bırak',
    ventoyCard2Desc: 'İndirdiğiniz Linux / Windows ISO dosyalarını buraya bırakarak USB\'ye ekleyin.',
    ventoyLoadedIsos: 'USB İçindeki Boot Edilebilir ISO İmajları',
    installVentoy: 'Ventoy Bootloader Kur',

    portableTitle: 'Portable Developer Pack',
    portableSub: 'Herhangi bir bilgisayarda kurulum gerektirmeden çalışan taşınabilir yazılım paketleri.',
    portableInstalledCount: 'USB Sürücüsünde Yüklü Paketler',
    downloadLauncherBtn: 'Başlatıcı Script İndir (.bat/.sh)',
    installed: 'Yüklendi',
    uninstall: 'USB\'den Kaldır',
    installToUsb: 'USB\'ye Yükle',

    aiTitle: 'Portable AI Coding Node (Çevrimdışı Yapay Zeka)',
    aiSub: 'İnternet erişimi olmadan USB bellek üzerinden çalışan yerel LLM kod asistanı (Ollama / Llama.cpp).',
    aiModelsTitle: 'USB İçindeki GGUF Modelleri',
    aiPlaygroundTitle: 'Çevrimdışı Kod Asistanı Playground',
    aiPromptLabel: 'İstediğiniz Kod veya Hata Açıklaması',
    aiPromptPlaceholder: 'Örnek: Rust dilinde AES-256 dosya şifreleme fonksiyonu yaz...',
    generateAiBtn: 'Yanıt Üret (Offline AI)',

    dockerTitle: 'Docker & Container Offline Cache',
    dockerSub: 'Veritabanı ve servislerin imaj dosyalarını USB içinde saklayarak internet olmadan mikroservis çalıştırın.',
    dockerCachedCount: 'USB Depodaki Hazır Container İmajları',
    loadAllDockerBtn: 'Tüm İmajları Docker\'a Yükle (docker load)',
    exportComposeBtn: 'docker-compose.yml İndir',

    vaultTitle: 'Kod Kasası (AES-256 Encrypted Storage)',
    vaultSub: 'Projelerinizi USB üzerinde şifreli kasada saklayın, kaybolma veya çalınmaya karşı koruyun.',
    vaultCreateTitle: 'Yeni Proje Kasası Oluştur',
    vaultProjNameLabel: 'Proje Klasör Adı',
    vaultPassLabel: 'Kasa Parolası (Master Passphrase)',
    vaultLockBtn: 'Kasaya Kilitle',
    vaultProjectsTitle: 'USB İçindeki Kasa Projeleri',
    generateReadmeBtn: 'Otomatik README.md Üret',

    sshTitle: 'SSH & Token Vault Manager',
    sshSub: 'SSH anahtarlarınızı (ED25519) ve Cloud API Token\'larınızı USB belleğinizde AES-256 korumasıyla saklayın.',
    sshGenBtn: 'Yeni SSH Anahtarı Üret (ED25519)',
    sshInjectBtn: 'Host Oturumuna SSH Keys Enjekte Et',
    tokenSaveBtn: 'Token\'ı Şifrele & Sakla',

    secTitle: 'Portable Emergency Security Scanner',
    secSub: 'Hedef bilgisayardaki zararlı yazılımları ve şüpheli süreçleri kod yazmadan önce temizleyin.',
    secScanBtn: 'Güvenlik Taramasını Başlat',

    sbomTitle: 'Automated SBOM & Lisans Analizcisi',
    sbomSub: 'USB projelerinizin bağımlılıklarını tarar, open-source lisans uyumluluğunu doğrular.',

    p2pTitle: 'DevFlash Direct Share (P2P Wi-Fi Share)',
    p2pSub: 'İnternet olmadan, aynı yerel ağdaki (LAN/Wi-Fi) diğer yazılımcılarla kablosuz dosya paylaşın.',

    dotfilesTitle: 'Dotfiles & Kabuk Tema Enjektörü',
    dotfilesSub: 'USB takıldığında terminal takma adlarınızı (alias) ve kabuk temalarınızı enjekte edin.',

    cloudTitle: 'Şifreli Bulut Senkronizasyonu (Zero-Knowledge Sync)',
    cloudSub: 'USB içerisindeki AES-256 Kod Kasasını GitHub Gist, Cloudflare R2 veya AWS S3\'e yedekleyin.',

    isoTitle: 'ISO & Distro Merkezi',
    isoSub: 'Geliştiriciler ve sistem yöneticileri için canlı Linux dağıtımları ve kurtarma imajları.',

    auditTitle: 'Sistem & Ortam Tarayıcısı (Host Audit)',
    auditSub: 'USB takıldığında hedef bilgisayarı tarar, eksik yazılım ve sürümleri tespit edip portable çözümler sunar.',
    auditScanBtn: 'Bilgisayarı Tara',
    auditInjectBtn: 'USB Portable Ortamını Aktif Et',

    benchTitle: 'USB Hız & Sağlık Testi (Drive Diagnostics)',
    benchSub: 'Flash belleğinizin gerçek okuma/yazma performansını ölçün ve donanımsal sağlık durumunu analiz edin.',
    benchStartBtn: 'Performans Testini Başlat',

    gamesTitle: 'Dev Terminal Break Lounge',
    gamesSub: 'Devasa ISO indirmeleri veya derlemeler yapılırken oynanabilecek retro terminal oyunları.',

    marketTitle: 'Dev Marketplace & Community Hub',
    marketSub: 'Topluluk tarafından hazırlanan hazır geliştirici paketleri, özel scriptler ve temalar.'
  },

  en: {
    langName: 'English',
    flag: '🇺🇸',
    subtitle: 'NATIVE ENVIRONMENT FOR XERO-TRACE USB SYSTEMS',
    fullTestBtn: '⚡ Full System Test',
    readOnly: 'Read-Only',
    writeable: 'Writeable',
    mobile: 'Mobile',
    purge: 'Purge Traces',
    profileLabel: 'WORK PROFILE',
    modulesLabel: 'N.E.X.U.S. MODULES',
    drivesLabel: 'MOUNTED DRIVES',

    // Nav Titles
    ventoy: 'USB Setup & Boot',
    portable: 'Portable Dev Pack',
    ai_node: 'Offline AI Node',
    docker_cache: 'Docker Cache',
    vault: 'Code Vault (AES)',
    ssh_vault: 'SSH & Token Vault',
    security_scan: 'Emergency Security',
    sbom_audit: 'SBOM & License Audit',
    p2p_share: 'P2P Direct Share',
    dotfiles: 'Dotfiles & Shell Theme',
    cloud_backup: 'Cloud Sync',
    isohub: 'ISO / Distro Center',
    hostaudit: 'Host System Audit',
    usb_benchmark: 'USB Speed & Health',
    retro_games: 'Dev Break Lounge',
    marketplace: 'Dev Marketplace',

    // View Titles & Subtitles
    ventoyTitle: 'USB Creator & Multi-Boot',
    ventoySub: 'Turn your USB flash drive into a drag-and-drop live boot disk using Ventoy architecture.',
    ventoyCard1Title: 'Drive Configuration & Boot Setup',
    ventoyCard1Desc: 'Ventoy Bootloader lets you execute ISO files directly without reformatting your drive.',
    ventoyCard2Title: 'Drag & Drop ISO Image',
    ventoyCard2Desc: 'Drop your downloaded Linux / Windows ISO files here to add them to your USB drive.',
    ventoyLoadedIsos: 'Bootable ISO Images Inside USB Drive',
    installVentoy: 'Install Ventoy Bootloader',

    portableTitle: 'Portable Developer Pack',
    portableSub: 'Stand-alone portable developer software packages running on any PC without installation.',
    portableInstalledCount: 'Packages Installed on USB Drive',
    downloadLauncherBtn: 'Download Launcher Script (.bat/.sh)',
    installed: 'Installed',
    uninstall: 'Remove from USB',
    installToUsb: 'Install to USB',

    aiTitle: 'Portable AI Coding Node (Offline LLM)',
    aiSub: 'Local LLM code assistant running directly off your USB drive without internet (Ollama / Llama.cpp).',
    aiModelsTitle: 'GGUF Models Stored on USB',
    aiPlaygroundTitle: 'Offline Code Assistant Playground',
    aiPromptLabel: 'Describe your code or bug error',
    aiPromptPlaceholder: 'Example: Write a Rust AES-256 file encryption function...',
    generateAiBtn: 'Generate Response (Offline AI)',

    dockerTitle: 'Docker & Container Offline Cache',
    dockerSub: 'Store database and service tarballs inside USB to run microservices offline.',
    dockerCachedCount: 'Cached Container Images in USB Storage',
    loadAllDockerBtn: 'Load All Images to Docker (docker load)',
    exportComposeBtn: 'Download docker-compose.yml',

    vaultTitle: 'Code Vault (AES-256 Encrypted Storage)',
    vaultSub: 'Keep your projects secured inside an encrypted AES-256 vault on USB.',
    vaultCreateTitle: 'Create New Project Vault',
    vaultProjNameLabel: 'Project Folder Name',
    vaultPassLabel: 'Vault Master Passphrase',
    vaultLockBtn: 'Lock to Vault',
    vaultProjectsTitle: 'Vault Projects Inside USB',
    generateReadmeBtn: 'Auto-Generate README.md',

    sshTitle: 'SSH & Token Vault Manager',
    sshSub: 'Secure your SSH ED25519 keys and Cloud API tokens on USB with AES-256 protection.',
    sshGenBtn: 'Generate New SSH Key (ED25519)',
    sshInjectBtn: 'Inject SSH Keys to Host Session',
    tokenSaveBtn: 'Encrypt & Save Token',

    secTitle: 'Portable Emergency Security Scanner',
    secSub: 'Clean malware, rootkits and suspicious background processes on target host before coding.',
    secScanBtn: 'Start Security Audit',

    sbomTitle: 'Automated SBOM & License Auditor',
    sbomSub: 'Audit USB project dependencies, verify open-source licenses and export SBOM reports.',

    p2pTitle: 'DevFlash Direct Share (P2P Wi-Fi Share)',
    p2pSub: 'Share files and ISOs wirelessly with other developers on local Wi-Fi without internet.',

    dotfilesTitle: 'Dotfiles & Shell Theme Auto-Injector',
    dotfilesSub: 'Inject your terminal aliases, git identities, and shell themes on host connection.',

    cloudTitle: 'Encrypted Cloud Sync (Zero-Knowledge)',
    cloudSub: 'Mirror your encrypted AES-256 Vault projects to GitHub Gist, Cloudflare R2, or AWS S3.',

    isoTitle: 'ISO & Distro Center',
    isoSub: 'Curated live Linux distributions and rescue recovery images for developers & IT admins.',

    auditTitle: 'Host Environment Audit',
    auditSub: 'Scans target host machine upon connection, detects missing runtime tools and injects USB environment.',
    auditScanBtn: 'Audit Host Machine',
    auditInjectBtn: 'Activate USB Portable Environment',

    benchTitle: 'USB Speed & Health Diagnostics',
    benchSub: 'Measure read/write IOPS performance and analyze hardware health status of your USB drive.',
    benchStartBtn: 'Start Performance Benchmark',

    gamesTitle: 'Dev Terminal Break Lounge',
    gamesSub: 'Retro terminal mini-games to play while waiting for large ISO downloads or builds.',

    marketTitle: 'Dev Marketplace & Community Hub',
    marketSub: 'Community-curated developer environment profiles, custom scripts, and themes.'
  },

  de: {
    langName: 'Deutsch',
    flag: '🇩🇪',
    subtitle: 'NATIVE UMGEBUNG FÜR SPURLOSE USB-SYSTEME',
    fullTestBtn: '⚡ Vollständiger Systemtest',
    readOnly: 'Schreibgeschützt',
    writeable: 'Beschreibbar',
    mobile: 'Mobil',
    purge: 'Spuren löschen',
    profileLabel: 'ARBEITSPROFIL',
    modulesLabel: 'N.E.X.U.S. MODULE',
    drivesLabel: 'MONTIERTE LAUFWERKE',

    ventoy: 'USB-Einrichtung & Boot',
    portable: 'Tragbares Entwickler-Paket',
    ai_node: 'Lokaler KI-Knoten',
    docker_cache: 'Docker-Speicher',
    vault: 'Code-Tresor (AES)',
    ssh_vault: 'SSH & Token Tresor',
    security_scan: 'Notfall-Sicherheit',
    sbom_audit: 'SBOM & Lizenz-Audit',
    p2p_share: 'P2P Direkte Freigabe',
    dotfiles: 'Dotfiles & Shell-Design',
    cloud_backup: 'Cloud-Synchronisierung',
    isohub: 'ISO / Distro-Zentrum',
    hostaudit: 'Host-System-Prüfung',
    usb_benchmark: 'USB-Geschwindigkeit & Gesundheit',
    retro_games: 'Entwickler-Pause',
    marketplace: 'Entwickler-Marktplatz',

    ventoyTitle: 'USB-Ersteller & Multi-Boot',
    ventoySub: 'Verwandeln Sie Ihren USB-Stick mit Ventoy in ein Live-Boot-Laufwerk.',
    installVentoy: 'Ventoy Bootloader installieren',

    portableTitle: 'Tragbares Entwickler-Paket',
    portableSub: 'Unabhängige Entwickler-Softwarepakete ohne Installation auf jedem PC.',
    downloadLauncherBtn: 'Starter-Skript herunterladen (.bat/.sh)',
    installed: 'Installiert',
    uninstall: 'Vom USB entfernen',
    installToUsb: 'Auf USB installieren',

    aiTitle: 'Lokaler KI-Knoten (Offline LLM)',
    aiSub: 'Lokaler KI-Code-Assistent ohne Internetverbindung (Ollama / Llama.cpp).',
    generateAiBtn: 'Antwort generieren (Offline-KI)',

    dockerTitle: 'Docker & Container-Offline-Speicher',
    dockerSub: 'Speichern Sie Datenbank-Tarballs auf dem USB-Stick für Offline-Mikrodienste.',

    vaultTitle: 'Code-Tresor (AES-256)',
    vaultSub: 'Sichern Sie Ihre Projekte in einem verschlüsselten AES-256-Tresor.',

    sshTitle: 'SSH & Token Tresor-Manager',
    sshSub: 'Schützen Sie Ihre SSH-Schlüssel und API-Tokens auf dem USB-Stick.',

    secTitle: 'Notfall-Sicherheits-Scanner',
    secSub: 'Reinigen Sie Malware und verdächtige Prozesse vor dem Programmieren.',

    auditTitle: 'Host-System-Prüfung',
    auditSub: 'Scant den Ziel-PC und aktiviert die tragbare USB-Umgebung.',

    benchTitle: 'USB-Geschwindigkeit & Diagnose',
    benchSub: 'Messen Sie Lese-/Schreibgeschwindigkeiten und analysieren Sie die USB-Gesundheit.'
  },

  es: {
    langName: 'Español',
    flag: '🇪🇸',
    subtitle: 'ENTORNO NATIVO PARA SISTEMAS USB SIN RASTRO',
    fullTestBtn: '⚡ Prueba completa',
    readOnly: 'Solo lectura',
    writeable: 'Escritura',
    mobile: 'Móvil',
    purge: 'Limpiar rastros',
    profileLabel: 'PERFIL DE TRABAJO',
    modulesLabel: 'MÓDULOS N.E.X.U.S.',
    drivesLabel: 'UNIDADES MONTADAS',

    ventoy: 'Configuración USB y Arranque',
    portable: 'Paquete portátil de desarrollo',
    ai_node: 'Nodo IA fuera de línea',
    docker_cache: 'Caché de Docker',
    vault: 'Bóveda de código (AES)',
    ssh_vault: 'Bóveda SSH y Token',
    security_scan: 'Seguridad de emergencia',
    sbom_audit: 'Auditoría SBOM y Licencias',
    p2p_share: 'Compartir P2P directo',
    dotfiles: 'Dotfiles y tema Shell',
    cloud_backup: 'Sincronización en la nube',
    isohub: 'Centro de ISO y Distribuciones',
    hostaudit: 'Auditoría del sistema anfitrión',
    usb_benchmark: 'Velocidad y salud USB',
    retro_games: 'Zona de descanso',
    marketplace: 'Mercado de desarrolladores',

    ventoyTitle: 'Creador USB y Multiarranque',
    ventoySub: 'Convierta su memoria USB en un disco de arranque en vivo con Ventoy.',
    installVentoy: 'Instalar Ventoy',

    portableTitle: 'Paquete de desarrollo portátil',
    portableSub: 'Paquetes de software portátiles para cualquier PC sin instalación.',
    downloadLauncherBtn: 'Descargar script de inicio (.bat/.sh)',
    installed: 'Instalado',
    uninstall: 'Eliminar de USB',
    installToUsb: 'Instalar en USB',

    aiTitle: 'Nodo de código IA portátil (Offline LLM)',
    aiSub: 'Asistente de código IA local sin conexión a Internet (Ollama / Llama.cpp).',
    generateAiBtn: 'Generar respuesta (IA Offline)',

    auditTitle: 'Auditoría del sistema anfitrión',
    auditSub: 'Escanea el equipo de destino y activa el entorno portátil USB.'
  },

  fr: {
    langName: 'Français',
    flag: '🇫🇷',
    subtitle: 'ENVIRONNEMENT NATIF POUR SYSTÈMES USB SANS TRACE',
    fullTestBtn: '⚡ Test système complet',
    readOnly: 'Lecture seule',
    writeable: 'Écriture',
    mobile: 'Mobile',
    purge: 'Effacer les traces',
    profileLabel: 'PROFIL DE TRAVAIL',
    modulesLabel: 'MODULES N.E.X.U.S.',
    drivesLabel: 'LECTEURS MONTÉS',

    ventoy: 'Configuration USB & Démarrage',
    portable: 'Pack de développement portable',
    ai_node: 'Nœud IA hors ligne',
    docker_cache: 'Cache Docker',
    vault: 'Coffre-fort de code (AES)',
    ssh_vault: 'Coffre SSH et jetons',
    security_scan: 'Sécurité d\'urgence',
    sbom_audit: 'Audit SBOM et licences',
    p2p_share: 'Partage direct P2P',
    dotfiles: 'Dotfiles et thème Shell',
    cloud_backup: 'Synchronisation Cloud',
    isohub: 'Centre ISO et Distributions',
    hostaudit: 'Audit du système hôte',
    usb_benchmark: 'Vitesse et santé USB',
    retro_games: 'Espace de pause',
    marketplace: 'Marché des développeurs',

    ventoyTitle: 'Créateur USB & Multi-Démarrage',
    ventoySub: 'Transformez votre clé USB en disque de démarrage live avec Ventoy.',
    installVentoy: 'Installer Ventoy',

    portableTitle: 'Pack de développement portable',
    portableSub: 'Logiciels de développement portables s\'exécutant sans installation.',
    downloadLauncherBtn: 'Télécharger le script de lancement (.bat/.sh)',
    installed: 'Installé',
    uninstall: 'Supprimer de l\'USB',
    installToUsb: 'Installer sur l\'USB',

    aiTitle: 'Nœud de code IA portable (Hors ligne)',
    aiSub: 'Assistant de code IA local s\'exécutant hors ligne (Ollama / Llama.cpp).',
    generateAiBtn: 'Générer une réponse (IA hors ligne)',

    auditTitle: 'Audit du système hôte',
    auditSub: 'Scanne l\'ordinateur cible et active l\'environnement portable USB.'
  }
};

export function t(key, lang = 'tr') {
  const dict = translations[lang] || translations.tr;
  return dict[key] || translations.en[key] || translations.tr[key] || key;
}
