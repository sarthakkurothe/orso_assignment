const { contextBridge, ipcRenderer } = require('electron');
const keyboard = require('keyboardjs');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(event, ...args)),
  },
  keyboard: {
    bind: (keys, callback) => keyboard.bind(keys, callback),
  }
});
