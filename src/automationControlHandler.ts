import { app } from "electron";
import path from "path";
import fs from "fs";
import lepikjs from "lepikjs";
import { v4 as uuidv4 } from "uuid";

export default class AutomationControlHandler {
  ipcMain: Electron.IpcMain;
  macroBaseDir: string;
  recordDir: string;
  composeDir: string;
  keyboardMouseListener: KeyboardMouseListener;

  constructor(IpcMain: Electron.IpcMain, macroBaseDir: string) {
    this.ipcMain = IpcMain;
    this.macroBaseDir = macroBaseDir;
    this.keyboardMouseListener = new KeyboardMouseListener();

    this.recordDir = path.join(this.macroBaseDir, "record");
    this.composeDir = path.join(this.macroBaseDir, "compose");

    // Creating app directory and record compse directories
    if (!fs.existsSync(this.recordDir)) {
      fs.mkdirSync(this.recordDir, {
        recursive: true,
      });
      console.log("creating record directory...,", this.recordDir);
    }
    if (!fs.existsSync(this.composeDir)) {
      fs.mkdirSync(this.composeDir, { recursive: true });
      console.log("creating compose directory...,", this.composeDir);
    }
  }
  listen() {
    this.beginMacroRecording();
    this.pauseMacroRecording();
  }

  beginMacroRecording() {
    this.ipcMain.handle("beginMacroRecording", () => {
      console.log("macro recording starting ...");
      this.keyboardMouseListener.listen();
    });
  }

  pauseMacroRecording() {
    this.ipcMain.handle("pauseMacroRecording", () => {
      console.log("pausing macro recording");

      this.keyboardMouseListener.stopListen();
      console.log(
        "actions recorded: ",
        JSON.stringify(this.keyboardMouseListener.currentRecording)
      );

      // writing recording to json file
      let id = uuidv4();

      this.keyboardMouseListener.currentRecording.name = id;
      fs.writeFileSync(
        path.join(this.recordDir, id),
        JSON.stringify(this.keyboardMouseListener.currentRecording)
      );
    });
  }

  cancelMacroRecording() {}
  saveMacroRecording() {}
}

// On begin macro recording. instatiate lepik class . make sure it's singleton.
// only once instance at a time
interface action {
  event: string;
  time: number;
  nextEventDelay: number;
  x: number | null;
  y: number | null;
  button: number | null;
  key: string | null;
}

class KeyboardMouseListener {
  isListening: boolean;

  currentRecording: {
    name: string;
    steps: action[];
  };

  constructor() {
    this.isListening = false;
    this.currentRecording = {
      name: "recording",
      steps: [],
    };
  }

  listen() {
    this.isListening = true;
    this.captureMouse();
    this.captureKeyboard();
  }

  stopListen() {
    this.isListening = false;
  }

  captureMouse() {
    lepikjs.on("mouseMove", (data: { x: number; y: number }) => {
      if (this.isListening) {
        this.addAction({
          event: "mouseMove",
          time: Date.now(),
          nextEventDelay: 0,
          x: data.x,
          y: data.y,
          button: null,
          key: null,
        });
      }
    });

    lepikjs.on(
      "mouseClick",
      (data: { x: number; y: number; button: number }) => {
        if (this.isListening) {
          this.addAction({
            event: "mouseClick",
            time: Date.now(),
            nextEventDelay: 0,
            x: data.x,
            y: data.y,
            button: data.button,
            key: null,
          });
        }
      }
    );
  }
  captureKeyboard() {
    lepikjs.on("keyPress", (key: string) => {
      if (this.isListening) {
        this.addAction({
          event: "keyPress",
          time: Date.now(),
          nextEventDelay: 0,
          x: null,
          y: null,
          button: null,
          key: key,
        });
      }
    });

    lepikjs.on("keyRelease", (key: string) => {
      if (this.isListening) {
        this.addAction({
          event: "keyRelease",
          time: Date.now(),
          nextEventDelay: 0,
          x: null,
          y: null,
          button: null,
          key: key,
        });
      }
    });
  }

  addAction(currentAction: action) {
    if (this.currentRecording.steps.length !== 0) {
      let pastAction =
        this.currentRecording.steps[this.currentRecording.steps.length - 1];
      pastAction.nextEventDelay =
        currentAction.time - pastAction.time < 0
          ? 0
          : currentAction.time - pastAction.time;
    }

    this.currentRecording.steps.push(currentAction);
  }
}
