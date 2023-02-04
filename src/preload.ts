const { contextBridge, remote } = require("electron");

console.log("inside preload");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  minimize: () => {
    remote.getCurrentWindow().minimize();
  },
  // we can also expose variables, not just functions
});
