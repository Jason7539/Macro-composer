declare const windowControl: {
  node: () => string;
  minmizeMainWindow: () => Promise<void>;
  openRecordWidget: () => Promise<void>;
};

declare const automationControl: {
  beginMacroRecording: () => Promise<void>;
  pauseMacroRecording: () => Promise<void>;
  cancelMacroRecording: () => Promise<void>;
  saveMacroRecording: () => Promise<void>;
  playRecordFile: (fileName: string) => Promise<void>;
};

declare const fsFetch: {
  getRecordings: () => Promise<string[]>;
  onWindowRestore: (callback: (event) => void) => Electron.IpcRenderer;
  offWindowRestore: () => void;
};
