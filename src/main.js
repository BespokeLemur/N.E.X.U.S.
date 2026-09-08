// Main Entry Point for N.E.X.U.S. Platform v3.2 — Production Build
import { store } from './state.js';
import { renderNavbar } from './components/Navbar.js';
import { renderSidebar } from './components/Sidebar.js';
import { renderVentoyManager } from './components/VentoyManager.js';
import { renderPortablePack } from './components/PortablePack.js';
import { renderCodeVault } from './components/CodeVault.js';
import { renderIsoHub } from './components/IsoHub.js';
import { renderHostAudit } from './components/HostAudit.js';
import { renderMarketplace } from './components/Marketplace.js';
import { renderTerminal } from './components/Terminal.js';
import { renderAiNode } from './components/AiNode.js';
import { renderDockerCache } from './components/DockerCache.js';
import { renderSshVault } from './components/SshVault.js';
import { renderUsbBenchmark } from './components/UsbBenchmark.js';
import { renderCloudBackup } from './components/CloudBackup.js';
import { renderP2pShare } from './components/P2pShare.js';
import { renderDotfilesManager } from './components/DotfilesManager.js';
import { renderSecurityScan } from './components/SecurityScan.js';
import { renderSbomAuditor } from './components/SbomAuditor.js';
import { renderRetroGames } from './components/RetroGames.js';
import { renderMobileCompanion } from './components/MobileCompanion.js';
import { renderDashboard } from './components/Dashboard.js';
import { renderNetworkScanner } from './components/NetworkScanner.js';
import { renderDriveModal, renderExplorerModal, renderQrModal } from './components/Modals.js';
import { renderOnboardingModal } from './components/OnboardingModal.js';
import { runFullSystemTest } from './test_runner.js';
import { syncNativeDrives, isDesktopMode } from './native-bridge.js';

function initApp() {
  // Sync native physical drives if running in Electron
  syncNativeDrives();

  const headerEl = document.getElementById('app-header');
  const sidebarEl = document.getElementById('app-sidebar');
  const contentEl = document.getElementById('app-content');
  const terminalEl = document.getElementById('terminal-drawer');
  const modalContainer = document.getElementById('modal-container');
  const modalOverlay = document.getElementById('modal-overlay');

  function renderView() {
    const state = store.getState();
    
    if (headerEl) renderNavbar(headerEl);
    if (sidebarEl) renderSidebar(sidebarEl);
    if (terminalEl) renderTerminal(terminalEl);

    if (contentEl) {
      contentEl.innerHTML = '';
      switch (state.activeTab) {
        case 'dashboard': renderDashboard(contentEl); break;
        case 'ventoy': renderVentoyManager(contentEl); break;
        case 'portable': renderPortablePack(contentEl); break;
        case 'ai_node': renderAiNode(contentEl); break;
        case 'docker_cache': renderDockerCache(contentEl); break;
        case 'vault': renderCodeVault(contentEl); break;
        case 'ssh_vault': renderSshVault(contentEl); break;
        case 'security_scan': renderSecurityScan(contentEl); break;
        case 'sbom_audit': renderSbomAuditor(contentEl); break;
        case 'p2p_share': renderP2pShare(contentEl); break;
        case 'dotfiles': renderDotfilesManager(contentEl); break;
        case 'cloud_backup': renderCloudBackup(contentEl); break;
        case 'mobile_companion': renderMobileCompanion(contentEl); break;
        case 'network_scanner': renderNetworkScanner(contentEl); break;
        case 'isohub': renderIsoHub(contentEl); break;
        case 'hostaudit': renderHostAudit(contentEl); break;
        case 'usb_benchmark': renderUsbBenchmark(contentEl); break;
        case 'retro_games': renderRetroGames(contentEl); break;
        case 'marketplace': renderMarketplace(contentEl); break;
        default: renderDashboard(contentEl);
      }
    }
  }

  store.subscribe(() => {
    renderView();
  });

  // Modal Listeners
  window.addEventListener('open-drive-modal', () => {
    if (modalContainer && modalOverlay) {
      renderDriveModal(modalContainer);
      modalOverlay.classList.remove('hidden');
    }
  });

  window.addEventListener('open-explorer-modal', () => {
    if (modalContainer && modalOverlay) {
      renderExplorerModal(modalContainer);
      modalOverlay.classList.remove('hidden');
    }
  });

  window.addEventListener('open-qr-modal', () => {
    store.setActiveTab('mobile_companion');
    if (modalContainer && modalOverlay) {
      renderQrModal(modalContainer);
      modalOverlay.classList.remove('hidden');
    }
  });

  window.addEventListener('open-guide-modal', () => {
    if (modalContainer && modalOverlay) {
      renderOnboardingModal(modalContainer);
      modalOverlay.classList.remove('hidden');
    }
  });

  renderView();

  // First-time onboarding
  const hasSeenGuide = localStorage.getItem('nexus_guide_seen');
  if (!hasSeenGuide) {
    setTimeout(() => {
      if (modalContainer && modalOverlay) {
        renderOnboardingModal(modalContainer);
        modalOverlay.classList.remove('hidden');
        localStorage.setItem('nexus_guide_seen', '1');
      }
    }, 800);
  }

  console.log('⚡ N.E.X.U.S. v3.2.0 Production — BespokeLemur/N.E.X.U.S.');
}

// Export for manual testing (not auto-run in production)
export { runFullSystemTest };

document.addEventListener('DOMContentLoaded', initApp);
