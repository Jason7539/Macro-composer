import { contextBridge, ipcRenderer } from "electron";
console.log("hello world");
console.log("hello world---------------------sdfsdfsdfsdfsdf");
contextBridge.exposeInMainWorld("windowControl", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  minmizeMainWindow: () => {
    ipcRenderer.invoke("minmizeMainWindow");
  },
  openRecordWidget: () => {
    ipcRenderer.invoke("openRecordWidget");
  },

  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("fsFetch", {
  getRecordings: () => ipcRenderer.invoke("getRecordings"),
});
