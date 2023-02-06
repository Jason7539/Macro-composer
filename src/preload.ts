import { contextBridge, ipcRenderer } from "electron";

console.log("inside preload");

contextBridge.exposeInMainWorld("windowControl", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  minimizeWindow: () => {
    ipcRenderer.invoke("minimizeWindow");
  },
  openRecordWidget: () => {},
  // we can also expose variables, not just functions
});
