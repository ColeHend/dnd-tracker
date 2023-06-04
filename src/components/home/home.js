import React from "react";
import "./home.scss";
import { UserContext } from "../../App";
import axios from "axios";
import Button from "@mui/material/Button";
import TableNewExample from "../examples/tableExample/tableNewExample";

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

          {tableType ? <TableNewExample /> : null}
        </div>
      </div>
    </div>
  );
}
export default Home;
