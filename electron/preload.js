const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  getNativeDrives: () => ipcRenderer.invoke('get-native-drives'),
  execSystemCmd: (cmd) => ipcRenderer.invoke('exec-system-cmd', cmd),
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  readUsbDirectory: (dirPath) => ipcRenderer.invoke('read-usb-directory', dirPath)
});
