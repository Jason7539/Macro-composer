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
};
