import React from "react";
import ReactDOM from "react-dom/client";

const Modal = () => {
  return (
    <>
      <button>play/finish{automationControl.test()}</button>
      <button>pause</button>
      <button>cancel</button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <Modal />
);
