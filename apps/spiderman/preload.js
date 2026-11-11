
const { contextBridge, ipcRenderer } = require('electron');

// Existing Spider-Man bridge retained for future use
contextBridge.exposeInMainWorld('desktopBuddy', {
  onCursor: callback =>
    ipcRenderer.on('cursor', (_event, pos) => callback(pos)),

  onSize: callback =>
    ipcRenderer.on('size', (_event, size) => callback(size)),

  getSize: () => ipcRenderer.invoke('get-size'),

  setSize: value =>
    ipcRenderer.send('set-size', value),

  openSettings: () =>
    ipcRenderer.send('open-settings')
});

// Itachi study buddy
contextBridge.exposeInMainWorld('itachiBuddy', {
  action: action =>
    ipcRenderer.send('itachi-action', action),

  onMode: callback =>
    ipcRenderer.on('itachi-mode', (_event, data) => callback(data)),

  onHide: callback =>
    ipcRenderer.on('itachi-hide', () => callback()),

  getState: () =>
    ipcRenderer.invoke('itachi-state')
});
