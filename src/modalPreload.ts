console.log("inside preload");
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("automationControl", {
  test: () => process.versions.node,
});
