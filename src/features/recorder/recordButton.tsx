import * as React from "react";

const RecordButton = (): JSX.Element => {
  return (
    <button
      onClick={() => {
        windowControl.minmizeMainWindow();
        windowControl.openRecordWidget();
      }}
    >
      Record{windowControl.node()}
    </button>
  );
};

export default RecordButton;
