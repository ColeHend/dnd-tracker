import React from 'react';
import { UserContext } from "../../App";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function GenerateTable(props) {
  const { searchService } = React.useContext(UserContext);
  const monsterSearch = (searchTerm) => searchService.monsterSearch(searchTerm, "name");
  const { headerNames, isCollapsible, config } = props;
  const {tableContainerID, tableID, header, tableContainerSx, cellStyle} = config
    return <>
    <TableContainer
    sx={tableContainerSx}
    id={tableContainerID}
    component={Paper}
    >
    <Table id={tableID} aria-label={isCollapsible ? "collapsible table" : "simple table"}>
      <TableHead>
        {header ? (
          <TableRow>
            <TableCell
              style={{ fontWeight: "bold", fontSize: "24px", width: "min-content" }}
              colSpan={6}
            >
              {header}
            </TableCell>
          </TableRow>
        ) : null}
        {/* {header.search ? (
          <TableRow>
            <TableCell colSpan={6}>
              <SearchBar
                allTableData={allTableData}
                data={tableData}
                setData={setTableData}
                filterFunc={header.search.filterFunc}
              />
            </TableCell>
          </TableRow>
        ) : null} */}
        <TableRow>
        {isCollapsible ? 
          <TableCell
              sx={{ width: "min-content" }}
              id={cellStyle}
            ></TableCell>
           : null
        }
        {
          headerNames.map((key, index) =>( 
            <TableCell
              key={`header ${key} index ${index}`}
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >{key}</TableCell>
          )) 
        }
        </TableRow>

        <TableRow></TableRow>
      </TableHead>
      <TableBody>
        {props.children}
        </TableBody>
    </Table>
  </TableContainer></>;
}
export default GenerateTable;