import * as React from "react";
import * as ReactDOM from "react-dom";
import PlayButton from "./features/recorder/playButton";
import Table from "./table";

// const Index = () => {
//   return <div>Hello React!</div>;
// };

// ReactDOM.render(<Index />, document.getElementById("app"));
class App extends React.Component {
  render() {
    const characters = [
      {
        name: "charlie",
        job: "janitor",
      },
    ];

    return (
      <div className="app">
        <h1>Hello,updated React!</h1>
        <PlayButton></PlayButton>
        <Table />
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById("app"));
export default App;
