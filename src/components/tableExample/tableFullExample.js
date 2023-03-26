import React from "react";
import "./tableFullExample.scss";
import { UserContext } from "../../App";
import axios from "axios";
import Button from "@mui/material/Button";

function FullTableExample(props) {
  const { tableService, searchService } = React.useContext(UserContext);
  const [srdMonsters, setSrdMonsters] = React.useState([]);
  const columnKeys = [
    ["name", "Name"],
    ["meta", "Info"],
  ];

  const [loadData, setLoadData] = React.useState(true);
  React.useEffect(() => {
    if (loadData) {
      axios.get("http://localhost:4000/api/srd/monsters").then((res) => {
        setSrdMonsters(res.data);
        setLoadData(false);
      });
    }
  }, [loadData]);

  const headStyle = {
    cell: {
      style: {
        class: "table-header-cell",
        sx: {},
      },
    },
    row: {
      style: {
        class: "table-header-row",
        sx: {},
      },
    },
  };
  const bodyStyle = {
    cell: {
      style: {
        class: "table-body-cell",
        sx: {},
      },
    },
    row: {
      style: {
        class: "table-body-row",
        sx: {},
      },
    },
  };
  const tableStyle = {
    containerClass: "table-container",
    tableClass: "table",
    containStyle: { width: "auto" },
    header: headStyle,
    body: bodyStyle,
  };
  const collapseInfo = {
    styleClass: "collapsible-table",
    collapseValue: (row, index) => (
      <div style={{ minWidth: "45vw", wordWrap: "normal" }}>
        <img id="monstIMG" src={row.img_url} alt={row.name} />
      </div>
    ),
  };
  const monsterSearch = (searchTerm) =>
    searchService.monsterSearch(searchTerm, "name");
  
  const config = {
    key_name: columnKeys,
    state: { tableData: srdMonsters, setTableData: setSrdMonsters },
    collapsible: collapseInfo,
    table: tableStyle,
    search: { filterFunc: monsterSearch },
    header: "Monsters",
    newColumn:{
      name:"delete",
      value:(row)=><Button onClick={()=>setSrdMonsters(srdMonsters.filter((r)=>r.name!==row.name))}>X</Button>
    }
  };
  return <>{tableService.generateTable(config)}</>;
}
export default FullTableExample;
