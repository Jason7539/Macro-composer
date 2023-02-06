import * as React from "react";

// declare global {
//   interface Window {
//     versions: { node: string };
//   }
// }
declare const windowControl: {
  node: () => string;
  minimizeWindow: () => void;
  test: Function;
};

const RecordButton = (): JSX.Element => {
  return (
    <button onClick={() => windowControl.minimizeWindow()}>
      Record{windowControl.node()}
    </button>
  );
};

export default RecordButton;
