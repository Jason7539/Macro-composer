import * as React from "react";

const RecordButton = (): JSX.Element => {
  return (
    <button onClick={() => windowControl.minimizeWindow()}>
      Record{windowControl.node()}
    </button>
  );
};

export default RecordButton;
