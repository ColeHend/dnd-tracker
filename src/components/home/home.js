import React from "react";
import "./home.scss";
import GeneratedTable from "../tableService/tableService";
import { exampleOptions } from "../../tables/exampleTable";
function Home(props) {
  exampleOptions.data.value = [
    { name: "test1", age: 201 },
    { name: "test2", age: 202 },
    { name: "test3", age: 203 },
    { name: "test4", age: 204 },
  ];
  exampleOptions.data.keys = ["name", "age"];
  exampleOptions.header.cell.values = ["Name", "Age"];

  return (
    <div>
      <h1>Home</h1>
      <div>
        <p>Generated Table Test</p>
        <div>
          <GeneratedTable config={exampleOptions} />
        </div>
      </div>
    </div>
  );
}
export default Home;
