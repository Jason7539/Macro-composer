declare const windowControl: {
  node: () => string;
  minmizeMainWindow: () => Promise<void>;
  openRecordWidget: () => Promise<void>;
};

declare const automationControl: {
  test: () => string;
};
