// Marketplace Component for Community Packs & Scripts
import { store } from '../state.js';

export function renderMarketplace(container) {
  const presets = [
    {
      id: 'fullstack-web',
      name: 'Full-Stack Web Dev Suite',
      author: 'DevFlash Team',
      stars: 1240,
      description: 'Node.js LTS, VS Code Portable, SQLite Browser, Postman Lite ve React/Vue snippet eklentileri paketi.',
      tools: ['VS Code', 'Node.js', 'Git', 'SQLite', 'Bruno'],
      category: 'Web Dev'
    },
    {
      id: 'cyber-sec',
      name: 'CyberSec & Forensics Kit',
      author: 'SecurityLab',
      stars: 980,
      description: 'Kali Linux ISO, Wireshark Portable, Burp Suite Lite, Nmap CLI ve şifreleme kiti.',
      tools: ['Kali ISO', 'Wireshark', 'Nmap', 'AES Vault'],
      category: 'CyberSecurity'
    },
    {
      id: 'devops-cloud',
      name: 'DevOps & Cloud Native Pack',
      author: 'CloudOps',
      stars: 850,
      description: 'Docker CLI Portable, Kubectl, Helm, Terraform CLI ve Rescuezilla recovery imajı.',
      tools: ['Docker CLI', 'Kubectl', 'Terraform', 'Rescuezilla'],
      category: 'DevOps'
    },
    {
      id: 'embedded-rust',
      name: 'Embedded C & Rust Suite',
      author: 'Rustacean',
      stars: 620,
      description: 'Rustup, Cargo Portable, GCC ARM Toolchain ve Serial Terminal araçları.',
      tools: ['Rust', 'Cargo', 'GCC Toolchain', 'Putty'],
      category: 'Embedded'
    }
  ];

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="store" style="color:var(--accent-green);"></i> DevFlash Marketplace & Community Hub
          </h1>
          <p class="view-subtitle">Topluluk tarafından hazırlanan hazır geliştirici paketleri, özel scriptler ve temalar.</p>
        </div>
        <div>
          <button class="btn btn-secondary btn-sm" id="btn-share-pack">
            <i data-lucide="plus-circle" style="width:14px;"></i> Kendi Paketini Paylaş
          </button>
        </div>
      </div>

      <div class="grid-2">
        ${presets.map(pack => `
          <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                <div>
                  <span class="badge badge-cyan" style="margin-bottom:4px;">${pack.category}</span>
                  <h3 style="font-size:1.1rem; font-weight:700; color:var(--text-main); margin-top:2px;">${pack.name}</h3>
                </div>
                <div style="display:flex; align-items:center; gap:4px; color:var(--accent-amber); font-size:0.85rem; font-weight:600;">
                  <i data-lucide="star" style="width:14px; fill:var(--accent-amber);"></i> ${pack.stars}
                </div>
              </div>

              <div style="font-size:0.75rem; color:var(--text-dim); margin-bottom:8px;">Geliştirici: <strong>${pack.author}</strong></div>
              <p class="card-desc" style="font-size:0.85rem;">${pack.description}</p>

              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px;">
                ${pack.tools.map(t => `<span class="badge badge-purple" style="font-size:0.68rem;">${t}</span>`).join('')}
              </div>
            </div>

            <button class="btn btn-primary btn-block" data-install-preset="${pack.name}">
              <i data-lucide="download-cloud" style="width:16px;"></i> 1-Tıkla USB'ye Paket Olarak Yükle
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  container.querySelectorAll('[data-install-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const packName = btn.getAttribute('data-install-preset');
      store.addLog('success', `Marketplace Paketi İndiriliyor: "${packName}" -> USB sürücüsüne senkronize ediliyor.`);
      alert(`"${packName}" USB sürücünüze indirildi ve gerekli taşınabilir araçlar aktif edildi!`);
    });
  });

  document.getElementById('btn-share-pack')?.addEventListener('click', () => {
    alert('Kendi USB paketleşme scriptinizi DevFlash Marketplace GitHub reposuna Pull Request olarak gönderebilirsiniz!');
  });
}
