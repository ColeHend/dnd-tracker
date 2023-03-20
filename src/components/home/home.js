import React from "react";
import "./home.scss";
import GeneratedTable from "../tableService/tableService";
import { exampleOptions } from "../../tables/exampleTable";
function Home(props) {
  const [exampleData] = React.useState([
    { name: "test1", age: 201 },
    { name: "test2", age: 202 },
    { name: "test3", age: 203 },
    { name: "test4", age: 204 },
  ]);
  exampleOptions.data.value = exampleData;
  exampleOptions.data.keys = ["name", "age"];
  exampleOptions.header.cell.values = ["Name", "Age"];
  exampleOptions.options.collapsible = {
    styleClass: "collapsible-table",
    collapseValue: (row, index) => (
      <div id="exampleCollapsible" >
        {JSON.stringify(row)} {`index is ${index}`}
      </div>
    ),
  };

  return (
    <div className="homeComponent">
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
