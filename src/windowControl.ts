import { BrowserWindow } from "electron";

export default class WindowControlHandler {
  IpcMain;

  constructor(IpcMain: Electron.IpcMain) {
    this.IpcMain = IpcMain;
  }
  listen() {
    this.minimizeWindow();
  }

  minimizeWindow() {
    this.IpcMain.handle("minimizeWindow", () => {
      setTimeout(() => {
        BrowserWindow?.getFocusedWindow()?.minimize();
      }, 1000);
    });
  }
}
