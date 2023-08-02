import React from 'react';
import { UserContext } from "../../App";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from '@mui/material';
function GenerateTable(props) {
  const { searchService } = React.useContext(UserContext);
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const monsterSearch = (searchTerm) => searchService.monsterSearch(searchTerm, "name");
  const { headerNames, isCollapsible, config } = props;
  const {tableContainerID, tableID, header, tableContainerSx, cellStyle, pagination={itemData:null,setItemData:null}} = config
  const {itemData, setItemData} = pagination;
  const handleChangePage = itemData && setItemData ? (
    event,
    newPage,
  ) => {
    setPage(newPage);
    setItemData(itemData.slice(page * rowsPerPage,(page * rowsPerPage) + rowsPerPage))
  } : ()=>{};

  const handleChangeRowsPerPage = itemData && setItemData ? (
    event,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setItemData(itemData.slice(page * rowsPerPage,(page * rowsPerPage) + rowsPerPage))
  }: ()=>{};

  React.useEffect(()=>{
    if (itemData && setItemData) {
      setItemData(itemData.slice(page * rowsPerPage,(page * rowsPerPage) + rowsPerPage))
    }
  },[itemData, page, rowsPerPage, setItemData])
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
              colSpan={headerNames.length}
            >
              {header}
            </TableCell>
          </TableRow>
        ) : null}

        <TableRow>
          <TableCell colSpan={headerNames.length}>
            {Array.isArray(props.children) && props.children.length > 1 ? props.children[0] : null}
          </TableCell>
        </TableRow>
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
        {Array.isArray(props.children) && props.children.length > 1 ? props.children.slice(1).map(child=>child) : props.children}
        </TableBody>
    </Table>
  {itemData && typeof itemData.length === 'number' && itemData.length > 0 ? <TablePagination
      component="div"
      count={itemData.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    /> : null}
  </TableContainer>
  </>;
}
export default GenerateTable;