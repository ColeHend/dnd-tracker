import React from "react";
import { UserContext } from "../../App";
import axios from "axios";

function SimpleTableExample(props) {
  const { tableService } = React.useContext(UserContext);
  const columnKeys = [
    ["name", "Name"],
    ["level", "Level"],
  ];
  const [loadData, setLoadData] = React.useState(true);
  const [srdSpells, setSrdSpells] = React.useState([]);

  React.useEffect(() => {
    if (loadData) {
      axios.get("http://localhost:4000/api/srd/spells").then((res) => {
        setSrdSpells(res.data);
        setLoadData(false);
      });
    }
  }, [loadData]);
  const config = {
    key_name: columnKeys,
    state: {
      tableData: srdSpells,
      setTableData: setSrdSpells,
    },
  };
  return <>{tableService.generateTable(config)}</>;
}

export default SimpleTableExample;
