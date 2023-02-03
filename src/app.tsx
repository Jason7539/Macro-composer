import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom";
// import PlayButton from "./features/recorder/PlayButton";
import Table from "./table";

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

// class App extends React.Component {
//   render() {
//     const characters = [
//       {
//         name: "charlie",
//         job: "janitor",
//       },
//     ];

//     return (
//       <div className="app">
//         <div>
//           <Header name="recorder" />
//           <Header name="composer" />
//         </div>

//         <h1>Hello,updated React!</h1>
//         <PlayButton></PlayButton>
//         <Table />
//       </div>
//     );
//   }
// }
enum Containers {
  recorder = "recorder",
  composer = "composer",
}

const Container = (prop: { container: Containers }): JSX.Element => {
  if (prop.container === Containers.recorder) {
    return <h2>recorder</h2>;
  } else {
    return <h2>composer</h2>;
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

// ReactDOM.render(<App />, document.getElementById("app"));
export default App;
