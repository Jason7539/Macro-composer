import React from "react";
import ReactDOM from "react-dom/client";

const Modal = () => {
  return (
    <>
      <button onClick={automationControl.beginMacroRecording}>
        play/finish
      </button>
      <button onClick={automationControl.pauseMacroRecording}>pause</button>
      <button>cancel</button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <Modal />
);
