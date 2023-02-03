import * as React from "react";

const TableHeader = (prop: { name: string }) => {
  return (
    <thead>
      <tr>
        <th>{prop.name}</th>
        <th>Job</th>
      </tr>
    </thead>
  );
};

const Tablebody = (): JSX.Element => {
  return <tbody />;
};

const Table = (prop: { name: string }) => {
  return (
    <table>
      <TableHeader name="hello" />
      <Tablebody />
    </table>
  );
};

export default Table;
