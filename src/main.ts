import WindowControlHandler from "./windowControl";

// import { app, BrowserWindow, ipcMain } from "electron";
import { BrowserWindow, ipcMain, app } from "electron";
import path from "path";

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: true,
      // contextIsolation: false,
    },
  });

  // Listening to events inside the main process
  // // load in a separate files for concerns
  new WindowControlHandler(ipcMain).listen();

  // ipcMain.handle("minimizeWindow", () => {
  //   setTimeout(() => {
  //     BrowserWindow?.getFocusedWindow()?.minimize();
  //   }, 1000);
  // });

  win.loadFile("index.html");
  // win.openDevTools();
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

export { BrowserWindow };
