import React from "react";
import "./home.scss";
import FullTableExample from "../tableExample/tableFullExample";
import SimpleTableExample from "../tableExample/tableSimpleExample";
import Button from "@mui/material/Button";

function Home(props) {
  const [tableType, setTableType] = React.useState(true);
  return (
    <div className="homeComponent">
      <div>
        <h1>Home</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <h2>Table Example</h2>
          <Button style={{color:"#000"}} onClick={() => setTableType(!tableType)}>
            {tableType ? "Be a Simple Table" : "Be a Full Table"}
          </Button>
          {tableType ? <FullTableExample /> : <SimpleTableExample />}
        </div>
      </div>
    </div>
  );
}
export default Home;
