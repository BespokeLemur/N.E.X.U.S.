const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1380,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    title: 'N.E.X.U.S. Desktop Platform',
    icon: path.join(__dirname, '../public/favicon.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false
    }
  });

  const devUrl = 'http://localhost:8080';
  mainWindow.loadURL(devUrl).catch(() => {
    // Fallback to built dist/index.html if dev server not running
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC Handler: Fetch Real Windows Logical / Physical USB Drives via PowerShell
ipcMain.handle('get-native-drives', async () => {
  return new Promise((resolve) => {
    const psCmd = `Get-CimInstance Win32_LogicalDisk | Select-Object DeviceID, VolumeName, FileSystem, Size, FreeSpace, DriveType | ConvertTo-Json`;
    exec(`powershell -NoProfile -Command "${psCmd}"`, { windowsHide: true }, (error, stdout, stderr) => {
      if (error || !stdout.trim()) {
        resolve([]);
        return;
      }
      try {
        let parsed = JSON.parse(stdout);
        if (!Array.isArray(parsed)) parsed = [parsed];

        const drives = parsed.map(d => {
          const total = parseInt(d.Size || 0, 10);
          const free = parseInt(d.FreeSpace || 0, 10);
          const used = Math.max(0, total - free);
          const isRemovable = d.DriveType === 2;

          return {
            id: 'native_' + d.DeviceID.replace(':', '').toLowerCase(),
            name: d.VolumeName || (isRemovable ? 'FİZİKSEL USB' : 'YEREL SÜRÜCÜ'),
            letter: d.DeviceID,
            totalBytes: total,
            usedBytes: used,
            freeBytes: free,
            filesystem: d.FileSystem || (isRemovable ? 'exFAT/FAT32' : 'NTFS'),
            isRemovable: isRemovable,
            isNative: true,
            files: []
          };
        });

        resolve(drives);
      } catch (err) {
        resolve([]);
      }
    });
  });
});

// IPC Handler: Real PowerShell / CMD Terminal Execution
ipcMain.handle('exec-system-cmd', async (event, command) => {
  return new Promise((resolve) => {
    if (!command || typeof command !== 'string') {
      resolve({ stdout: '', stderr: 'Empty command', code: 1 });
      return;
    }

    exec(command, { shell: 'powershell.exe', maxBuffer: 1024 * 1024 * 5 }, (error, stdout, stderr) => {
      resolve({
        stdout: stdout || '',
        stderr: stderr || (error ? error.message : ''),
        code: error ? (error.code || 1) : 0
      });
    });
  });
});

// IPC Handler: Host Specs & Telemetry
ipcMain.handle('get-system-info', async () => {
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
    cpus: os.cpus(),
    totalmem: os.totalmem(),
    freemem: os.freemem(),
    uptime: os.uptime(),
    networkInterfaces: os.networkInterfaces()
  };
});

// IPC Handler: Read Physical USB Directory
ipcMain.handle('read-usb-directory', async (event, dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) return { files: [], error: 'Path does not exist' };
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    const files = entries.slice(0, 200).map(entry => {
      const fullPath = path.join(dirPath, entry.name);
      let size = '0 B';
      let rawSize = 0;
      try {
        const stat = fs.statSync(fullPath);
        rawSize = stat.size;
        if (rawSize > 1024 * 1024 * 1024) size = (rawSize / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
        else if (rawSize > 1024 * 1024) size = (rawSize / (1024 * 1024)).toFixed(1) + ' MB';
        else if (rawSize > 1024) size = (rawSize / 1024).toFixed(1) + ' KB';
        else size = rawSize + ' B';
      } catch (e) {}

      return {
        name: entry.name,
        isDir: entry.isDirectory(),
        type: entry.isDirectory() ? 'folder' : (entry.name.split('.').pop() || 'file'),
        size: size,
        rawSize: rawSize
      };
    });

    return { files, error: null };
  } catch (err) {
    return { files: [], error: err.message };
  }
});
