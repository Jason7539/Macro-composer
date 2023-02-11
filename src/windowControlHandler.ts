import { BrowserWindow, ipcMain } from "electron";
import path from "path";

export default class WindowControlHandler {
  ipcMain: Electron.IpcMain;
  mainWindowId: number;
  modalWindowId: number | undefined;

  constructor(IpcMain: Electron.IpcMain, mainWindowId: number) {
    this.ipcMain = IpcMain;
    this.mainWindowId = mainWindowId;
  }
  listen() {
    this.minimizeMainWindow();
    this.openRecordWidget();
  }

  minimizeMainWindow() {
    this.ipcMain.handle("minmizeMainWindow", () => {
      BrowserWindow.fromId(this.mainWindowId)!.minimize();
    });
  }

  openRecordWidget() {
    this.ipcMain.handle("openRecordWidget", () => {
      const mainWindow = BrowserWindow.fromId(
        this.mainWindowId
      ) as BrowserWindow;

      const modalWindow = new BrowserWindow({
        parent: mainWindow,
        width: 400,
        height: 200,
        modal: true,
        webPreferences: {
          preload: path.join(__dirname, "modalPreload.cjs"),
        },
      });
      modalWindow.loadFile("modal.html");

      modalWindow.openDevTools();
    });
  }
}
