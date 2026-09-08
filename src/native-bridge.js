// N.E.X.U.S. Native Bridge Interface for Desktop Electron Mode
import { store } from './state.js';

export function isDesktopMode() {
  return typeof window !== 'undefined' && Boolean(window.electronAPI?.isElectron);
}

export async function syncNativeDrives() {
  if (!isDesktopMode()) return;

  try {
    const nativeDrives = await window.electronAPI.getNativeDrives();
    if (!Array.isArray(nativeDrives) || nativeDrives.length === 0) return;

    const state = store.getState();
    
    // Merge or update state.drives with real Windows logical disks
    nativeDrives.forEach(nd => {
      const existingIdx = state.drives.findIndex(d => d.letter === nd.letter || d.id === nd.id);
      
      // Populate files for the native drive
      nd.name = `💻 ${nd.name} (${nd.letter})`;
      nd.filesystem = `${nd.filesystem} • Windows Native`;
      
      if (existingIdx >= 0) {
        state.drives[existingIdx] = { ...state.drives[existingIdx], ...nd };
      } else {
        state.drives.unshift(nd);
      }
    });

    // Auto select first removable USB or real drive if available
    const removable = state.drives.find(d => d.isRemovable || d.isNative);
    if (removable && (!state.activeDriveId || state.activeDriveId.startsWith('usb'))) {
      store.setActiveDrive(removable.id);
    }

    store.addLog('success', `⚡ Native Desktop Bridge: ${nativeDrives.length} gerçek Windows sürücüsü algılandı.`);
  } catch (err) {
    console.warn('Failed to sync native drives:', err);
  }
}

export async function executeNativeCmd(command) {
  if (!isDesktopMode()) return null;
  return await window.electronAPI.execSystemCmd(command);
}

export async function fetchNativeHostSpecs() {
  if (!isDesktopMode()) return null;
  return await window.electronAPI.getSystemInfo();
}

// Auto sync on start if running in Desktop Electron
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    if (isDesktopMode()) {
      syncNativeDrives();
      // Poll drive changes every 5 seconds
      setInterval(syncNativeDrives, 5000);
    }
  });
}
