console.log("inside preload");
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("automationControl", {
  beginMacroRecording: () => ipcRenderer.invoke("beginMacroRecording"),
  pauseMacroRecording: () => ipcRenderer.invoke("pauseMacroRecording"),
  cancelMacroRecording: () => ipcRenderer.invoke("cancelMacroRecording"),
  saveMacroRecording: () => ipcRenderer.invoke("saveMacroRecording"),
});
