const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      // contextIsolation: false,
    },
  });

  win.loadFile("index.html");
  win.openDevTools();
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
