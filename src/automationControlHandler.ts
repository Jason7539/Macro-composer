import { app } from "electron";
import path from "path";
import fs from "fs";
import lepikjs from "lepikjs";

export default class AutomationControlHandler {
  ipcMain: Electron.IpcMain;
  recordDir: string;
  keyboardMouseListener: KeyboardMouseListener;

  constructor(IpcMain: Electron.IpcMain) {
    this.ipcMain = IpcMain;
    this.recordDir = path.join(app.getPath("appData"), "Macro-Composer");
    this.keyboardMouseListener = new KeyboardMouseListener();

    if (!fs.existsSync(this.recordDir)) {
      console.log("creating directory");
      let dirReturn = fs.mkdirSync(this.recordDir, { recursive: true });
      console.log("directory created at: ", dirReturn);
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
      fs.writeFileSync(
        path.join(__dirname, "test.json"),
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
