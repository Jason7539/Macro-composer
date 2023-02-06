import * as React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import ComposerContainer from "./features/composer/composerContainer";
import RecorderContainer from "./features/recorder/recorderContainer";
// import PlayButton from "./features/recorder/PlayButton";

const Header = (prop: {
  name: string;
  setContainer: React.Dispatch<React.SetStateAction<Containers>>;
  container: Containers;
}): JSX.Element => {
  return (
    <button
      onClick={() => {
        prop.setContainer(prop.container);
      }}
    >
      {prop.name}
    </button>
  );
};

enum Containers {
  recorder = "recorder",
  composer = "composer",
}

const Container = (prop: { container: Containers }): JSX.Element => {
  if (prop.container === Containers.recorder) {
    return <RecorderContainer></RecorderContainer>;
  } else {
    return <ComposerContainer></ComposerContainer>;
  }
};

const App = (): JSX.Element => {
  const [container, setContainer] = useState<Containers>(Containers.recorder);

  return (
    <div className="app">
      <h1>Macro-composer</h1>
      <div>
        <Header
          name="recorder"
          setContainer={setContainer}
          container={Containers.recorder}
        />
        <Header
          name="composer"
          setContainer={setContainer}
          container={Containers.composer}
        />
      </div>
      {/* conditional recording depending on choice of Header clicked */}
      <Container container={container} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <App />
);
// export default App;
