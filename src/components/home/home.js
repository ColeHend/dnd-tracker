import React from "react";
import "./home.scss";
import { UserContext } from "../../App";
import axios from "axios";
function Home(props) {
  const {  tableService, searchService } = React.useContext(UserContext);
  const columnKeys = (moreKeys)=> [['name',"Name"],...moreKeys];

  const [srdMonsters, setSrdMonsters] = React.useState([]);
  const [srdSpells, setSrdSpells] = React.useState([]);
  const [loadData, setLoadData] = React.useState(true);
  React.useEffect(() => {
    if (loadData) {
      axios.get("http://localhost:4000/api/srd/monsters").then((res) => {
        setSrdMonsters(res.data);
        axios.get("http://localhost:4000/api/srd/spells").then((res) => {
          setSrdSpells(res.data);
          setLoadData(false);
        });
      });
    }
  }, [loadData]);
  // const headStyle = {
  //   cell: {
  //     style: {
  //       class: "table-header-cell",
  //       sx: {}
  //     }
  //   },
  //   row: {
  //     style: {
  //       class: "table-header-row",
  //       sx: {}
  //     }
  //   }
  // }
  // const bodyStyle = {
  //   cell: {
  //     style: {
  //       class: "table-body-cell",
  //       sx: {}
  //     }
  //   },
  //   row: {
  //     style: {
  //       class: "table-body-row",
  //       sx: {}
  //     }
  //   }
  // }
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
      <div style={{minWidth:'45vw',wordWrap:'normal'}} >
        <img id="monstIMG" src={row.img_url} alt={row.name}/>
      </div>
    ),
  };
  const monsterSearch = (searchTerm)=>searchService.monsterSearch(searchTerm,'name')
  
  return (
    <div className="homeComponent">
      <h1>Home</h1>
      <div>
        <p>Generated Table Test</p>
        <div>
        {tableService.generateTable(columnKeys([['meta',"Info"]]),{tableData:srdMonsters,setTableData:setSrdMonsters},collapseInfo,tableStyle,{filterFunc:monsterSearch})}
        </div>
         {/* <div>
         {tableService.generateTable(columnKeys([['level',"Level"]]),{tableData:srdSpells,setTableData:setSrdSpells})}
        </div>  */}
      </div>
    </div>
  );
}
export default Home;
