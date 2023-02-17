import { app } from "electron";
import path from "path";
import fs from "fs";
import lepikjs from "lepikjs";

export default class AutomationControlHandler {
  ipcMain: Electron.IpcMain;
  recordDir: string;

  constructor(IpcMain: Electron.IpcMain) {
    this.ipcMain = IpcMain;
    this.recordDir = path.join(app.getPath("appData"), "Macro-Composer");

    if (!fs.existsSync(this.recordDir)) {
      console.log("creating directory");
      let dirReturn = fs.mkdirSync(this.recordDir, { recursive: true });
      console.log("directory created at: ", dirReturn);
    }
  }
  listen() {
    this.beginMacroRecording();
  }

  beginMacroRecording() {
    this.ipcMain.handle("beginMacroRecording", () => {
      console.log("macro recording starting ...");
      // let listener = new KeyboardMouseListener();
      // listener.listen();
    });
  }

  pauseMacroRecording() {}
  cancelMacroRecording() {}
  saveMacroRecording() {}
}

// On begin macro recording. instatiate lepik class . make sure it's singleton.
// only once instance at a time
// interface action {
//   event: string;
//   time: number;
//   x: number | undefined;
//   y: number | undefined;
//   button: number | undefined;
//   key: string;
// }

// class KeyboardMouseListener {
//   isListening: boolean;

//   currentRecording: {
//     name: string;
//     steps: action[];
//   };

//   constructor() {
//     this.isListening = false;
//     this.currentRecording = {
//       name: "recording",
//       steps: [],
//     };
//   }

//   listen() {
//     this.isListening = true;
//     this.captureMouse();
//   }

//   stopListen() {
//     this.isListening = false;
//   }

//   captureMouse() {}

//   captureKeyboard() {}
// }
