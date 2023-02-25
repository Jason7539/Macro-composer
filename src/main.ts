import { BrowserWindow, ipcMain, app } from "electron";
import path from "path";
import AutomationControlHandler from "./automationControlHandler";
import WindowControlHandler from "./windowControlHandler";
import lepikjs from "lepikjs";
import fs from "fs";
import FsHandler from "./fsHandler";

// module augmentation for opening dev tools
declare module "electron" {
  interface BrowserWindow {
    openDevTools: any;
  }
}

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // when node option is true in webpack.config.cjs __dirname /src
      preload: path.resolve(__dirname, "..", "dist", "mainPreload.cjs"),
      nodeIntegration: false,
      // contextIsolation: false,
    },
  });

  // Listening to events inside the main process
  // // load in a separate files for concerns
  let appBasePath = path.join(app.getPath("appData"), "Macro-Composer");

  new WindowControlHandler(ipcMain, win.id).listen();
  new AutomationControlHandler(ipcMain, appBasePath).listen();
  new FsHandler(ipcMain, appBasePath).listen();

  win.loadFile("index.html");
  win.openDevTools();

  win.on("restore", () => {
    win.webContents.send("onWindowRestore");
    console.log("restored");
  });
}

function openGithub() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL("https://github.com");
}

app.whenReady().then(() => {
  createWindow();
});
