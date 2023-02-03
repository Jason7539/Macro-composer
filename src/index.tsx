import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./app";
// ReactDOM.render(<App />, document.getElementById("app"));

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <App />
);
