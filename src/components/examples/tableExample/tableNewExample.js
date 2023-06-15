import GenerateTable from "../../../utilities/generateTable/generateTable";
import GenerateRow from "../../../utilities/generateTable/generateRow";
import CollapseExample from "./tableNewCollapseExample";
import React from "react";
import axios from "axios";
import TableCell from "@mui/material/TableCell";
import "./tableFullExample.scss"
function TableNewExample(props) {
  const [srdMonsters, setSrdMonsters] = React.useState([]);
  const [loadData, setLoadData] = React.useState(true);
  React.useEffect(() => {
    if (loadData) {
      axios.get("http://localhost:4000/api/srd/monsters").then((res) => {
        setSrdMonsters(res.data);
        setLoadData(false);
      });
    }
  }, [loadData]);

  const config = {
    tableContainerID: "table-container",
    tableID: "table",
    header: "Monsters",
  };
  const titleNames = ["Name", "Info"];
  return (
    <GenerateTable isCollapsible={true} config={config} headerNames={titleNames}>
      {srdMonsters.map((row, index) => (
        <GenerateRow headerNames={titleNames}
        CollapseComponent={()=><CollapseExample row={row} index={index}/>} >
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.meta}</TableCell>
        </GenerateRow>
      ))}
    </GenerateTable>
  );
}
export default TableNewExample;
