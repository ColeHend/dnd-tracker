import GenerateTable from "../../../utilities/generateTable/generateTable";
import GenerateRow from "../../../utilities/generateTable/generateRow";
import React from "react";
import axios from "axios";
import TableCell from "@mui/material/TableCell";
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
  const CollapsibleComponent = (row, index) => (
    <div style={{ width: "min-width", wordWrap: "normal" }}>
      <img id="monstIMG" src={row.img_url} alt={row.name} />
    </div>
  );
  return (
    <GenerateTable isCollapsible={true} config={config} headerNames={titleNames}>
      {srdMonsters.map((row, index) => (
        <GenerateRow CollapseComponent={()=>CollapsibleComponent(row,index)} headerNames={titleNames}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.meta}</TableCell>
        </GenerateRow>
      ))}
    </GenerateTable>
  );
}
export default TableNewExample;
