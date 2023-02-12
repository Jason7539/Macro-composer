import { app } from "electron";
import path from "path";
import fs from "fs";

export default class AutomationControlHandler {
  ipcMain: Electron.IpcMain;
  recordDir: string;

  constructor(IpcMain: Electron.IpcMain) {
    this.ipcMain = IpcMain;
    this.recordDir = path.join(app.getPath("appData"), "Macro-Composer");

    if (!fs.existsSync(this.recordDir)) {
      console.log("creating directory");
      let dirReturn = fs.mkdirSync(this.recordDir, { recursive: true });
      console.log(dirReturn);
    }
  }
  listen() {
    this.beginMacroRecording();
  }

  beginMacroRecording() {
    this.ipcMain.handle("beginMacroRecording", () => {
      console.log("macro recording starting ...");
      console.log("app.getpath()", app.getPath("appData"));
      console.log("getAppPath()", app.getAppPath());
    });
  }

  pauseMacroRecording() {}
  cancelMacroRecording() {}
  saveMacroRecording() {}
}
