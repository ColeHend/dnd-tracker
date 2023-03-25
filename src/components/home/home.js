import React from "react";
import "./home.scss";
import { UserContext } from "../../App";
function Home(props) {
  const {  tableService } = React.useContext(UserContext);
  const columnKeys = [['name',"Name"],['age',"Age"]];
  const [exampleData] = React.useState([
    { name: "test1", age: 201, test: "test1" },
    { name: "test2", age: 202, test: "test2" },
    { name: "test3", age: 203, test: "test3" },
    { name: "test4", age: 204, test: "test4" },
  ]);
  const headStyle = {
    cell: {
      style: {
        class: "table-header-cell",
        sx: {}
      }
    },
    row: {
      style: {
        class: "table-header-row",
        sx: {}
      }
    }
  }
  const bodyStyle = {
    cell: {
      style: {
        class: "table-body-cell",
        sx: {}
      }
    },
    row: {
      style: {
        class: "table-body-row",
        sx: {}
      }
    }
  }
  const tableStyle = {
    containerClass: "table-container",
    tableClass: "table",
    containStyle: { width: "auto" },
    // header: headStyle,
    // body: bodyStyle
  };
  
  const collapseInfo = {
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
        {tableService.generateTable(columnKeys,exampleData,collapseInfo,tableStyle)}
        </div>
        <div>
        {tableService.generateTable(columnKeys,exampleData)}
        </div>
      </div>
    </div>
  );
}
export default Home;
