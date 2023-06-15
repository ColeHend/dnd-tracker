import GenerateTable from "../../../utilities/generateTable/generateTable";
import GenerateRow from "../../../utilities/generateTable/generateRow";
import CollapseExample from "./tableNewCollapseExample";
import React from "react";
import axios from "axios";
import TableCell from "@mui/material/TableCell";
import { UserContext } from "../../../App";
import "./tableFullExample.scss"
function TableNewExample(props) {
  const { userInfo, apiService } = React.useContext(UserContext);
  const [srdMonsters, setSrdMonsters] = React.useState([]);
  const [loadData, setLoadData] = React.useState(true);
  React.useEffect(() => {
    if (loadData) {
      // axios.get("http://localhost:4000/api/srd/monsters")
      apiService.getProjectFeats(userInfo.user_id, 12)
      .then((res) => {
        console.log(res);
        setSrdMonsters(res);
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
      {srdMonsters.length > 0 ? srdMonsters.map((row, index) => (
        <GenerateRow key={index} headerNames={titleNames}
        CollapseComponent={()=><CollapseExample row={row} index={index}/>} >
          <TableCell>{row.feat_title}</TableCell>
          <TableCell>{row.feat_desc}</TableCell>
        </GenerateRow>
      )) : null}
    </GenerateTable>
  );
}
export default TableNewExample;
