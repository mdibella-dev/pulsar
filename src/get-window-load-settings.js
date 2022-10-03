const { ipcRenderer } = require('electron');

let windowLoadSettings = null;

module.exports = () => {
  if (!windowLoadSettings) {
    windowLoadSettings = JSON.parse(ipcRenderer.sendSync('window-load-settings'));
  }
  return windowLoadSettings;
};
