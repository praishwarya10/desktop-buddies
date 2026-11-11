
const {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  globalShortcut
} = require('electron');

const path = require('path');
const fs = require('fs');

let win = null;
let settings = null;
let tick = null;

const BASE_W = 330;
const BASE_H = 620;

let size = 0.4;

// =====================================
// SETTINGS
// =====================================

function settingsPath() {
  return path.join(
    app.getPath('userData'),
    'preferences.json'
  );
}

function save() {
  fs.writeFileSync(
    settingsPath(),
    JSON.stringify({ size })
  );
}

function dimensions() {
  return {
    width: Math.ceil(BASE_W * size),
    height: Math.ceil(BASE_H * size)
  };
}

function place() {
  if (!win || win.isDestroyed()) return;

  const display = screen.getDisplayNearestPoint(
    screen.getCursorScreenPoint()
  );

  const { x, y, width } = display.workArea;
  const d = dimensions();

  win.setBounds({
    x: x + width - d.width - 8,
    y,
    width: d.width,
    height: d.height
  });
}

function keepOnTop() {
  if (!win || win.isDestroyed()) return;

  win.setAlwaysOnTop(true, 'screen-saver');
}

function applySize(value) {
  size = Math.min(
    1.2,
    Math.max(0.2, Number(value) || 0.4)
  );

  save();

  if (win && !win.isDestroyed()) {
    place();
    win.webContents.send('size', size);
    keepOnTop();
  }

  if (settings && !settings.isDestroyed()) {
    settings.webContents.send('size', size);
  }
}

function openSettings() {
  if (settings && !settings.isDestroyed()) {
    settings.show();
    settings.focus();
    return;
  }

  settings = new BrowserWindow({
    width: 410,
    height: 340,
    resizable: false,
    title: 'Spider-Man Desktop Buddy Settings',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  settings.loadFile('settings.html');

  settings.on('closed', () => {
    settings = null;
  });
}

// =====================================
// SPIDER-MAN WINDOW
// =====================================

function createSpiderMan() {
  const d = dimensions();

  win = new BrowserWindow({
    ...d,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: false,
    focusable: false,
    show: false,
    backgroundColor: '#00000000',

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  keepOnTop();

  if (process.platform !== 'win32') {
    win.setVisibleOnAllWorkspaces(true);
  }

  win.setIgnoreMouseEvents(true, {
    forward: true
  });

  win.loadFile('index.html');

  win.once('ready-to-show', () => {
    place();
    win.showInactive();
    keepOnTop();
    win.webContents.send('size', size);
  });

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('size', size);
  });

  win.on('closed', () => {
    win = null;

    clearInterval(tick);
    tick = null;
  });

  place();

  // Track the mouse cursor.
  tick = setInterval(() => {
    if (!win || win.isDestroyed()) return;

    const p = screen.getCursorScreenPoint();
    const b = win.getBounds();

    win.webContents.send('cursor', {
      x: (p.x - b.x) / size,
      y: (p.y - b.y) / size
    });
  }, 40);
}

// =====================================
// IPC COMMUNICATION
// =====================================

ipcMain.handle('get-size', () => size);

ipcMain.on('set-size', (_event, value) => {
  applySize(value);
});

ipcMain.on('open-settings', openSettings);

// =====================================
// APP STARTUP
// =====================================

app.whenReady().then(() => {

  // Load previously saved settings.
  try {
    const saved = JSON.parse(
      fs.readFileSync(settingsPath(), 'utf8')
    );

    if (Number.isFinite(saved.size)) {
      size = Math.min(
        1.2,
        Math.max(0.2, saved.size)
      );
    }
  } catch {}

  // Launch ONLY Spider-Man.
  createSpiderMan();

  screen.on('display-metrics-changed', place);

  // Show / hide Spider-Man.
  globalShortcut.register(
    'CommandOrControl+Shift+H',
    () => {
      if (!win || win.isDestroyed()) return;

      if (win.isVisible()) {
        win.hide();
      } else {
        win.showInactive();
        keepOnTop();
      }
    }
  );

  // Open Spider-Man settings.
  globalShortcut.register(
    'CommandOrControl+Shift+S',
    openSettings
  );

  // Quit Spider-Man.
  globalShortcut.register(
    'CommandOrControl+Shift+Q',
    () => app.quit()
  );
});

// =====================================
// CLEANUP
// =====================================

app.on('before-quit', () => {
  clearInterval(tick);
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  app.quit();
});
