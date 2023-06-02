import React from "react";
import "./home.scss";
import GeneratedTable from "../tableService/tableService";
// default table options to personlize for each generated table
import { exampleOptions } from "../../tables/exampleTable";
function Home(props) {
  const [exampleData] = React.useState([ // array of table data
    { name: "test1", age: 201 },
    { name: "test2", age: 202 },
    { name: "test3", age: 203 },
    { name: "test4", age: 204 },
  ]);
  // setting the table data to pass to table generator
  exampleOptions.data.value = exampleData; 
  // setting which key to display in which column
  exampleOptions.data.keys = ["name", "age"];
  // setting the title of colums
  exampleOptions.header.cell.values = ["Name", "bullshit"];
  // set the below if want collapsible
  exampleOptions.options.collapsible = {
    // style id
    styleClass: "collapsible-table",
    //collapse component
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
