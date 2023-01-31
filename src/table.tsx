import * as React from "react";

const TableHeader = (prop) => {
  return (
    <thead>
      <tr>
        <th>{prop.name}</th>
        <th>Job</th>
      </tr>
    </thead>
  );
};

const Tablebody = () => {
  return <tbody />;
};

class Table extends React.Component {
  render() {
    return (
      <table>
        <TableHeader name="hello" />
        <Tablebody />
      </table>
    );
  }
}

export default Table;
