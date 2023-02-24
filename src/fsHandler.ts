import { BrowserWindow, ipcMain } from "electron";
import path from "path";
import { readdir } from "node:fs/promises";

export default class FsHandler {
  ipcMain: Electron.IpcMain;
  MacroBaseDir: string;
  recordDir: string;
  composeDir: string;

  constructor(IpcMain: Electron.IpcMain, MacroBaseDir: string) {
    this.ipcMain = IpcMain;
    this.MacroBaseDir = MacroBaseDir;
    this.recordDir = path.join(this.MacroBaseDir, "record");
    this.composeDir = path.join(this.MacroBaseDir, "compose");
  }
  listen() {
    this.getRecordings();
  }

  async getRecordings() {
    this.ipcMain.handle("getRecordings", async () => readdir(this.recordDir));
  }

  getCompose() {}

  readSingleFile() {}
}
