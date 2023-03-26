import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./tableService.scss";
import SearchBar from "./searchbar";
export default function GenerateTable(props) {
  const { data, options, header, body } = props.config;
  const CustomTableCell = (prop) => (
    <TableCell sx={props.sx} id={prop.styleClass ?? "default_celll"}>
      {prop.value}
    </TableCell>
  );
  const CustomTableRow = (prop) => (
    <TableRow sx={props.sx} id={props.styleClass ?? "default_roww"}>
      {prop.value}
    </TableRow>
  );
  const CollapsibleTableRow = (prop) => {
    const [open, setOpen] = React.useState(false);
    const { styleClass, collapseValue } = prop;
    return (
      <>
        <TableRow sx={{ "& > *": { borderBottom: "unset" }, ...props.sx }}>
          {header.row.beginValue ? header.row.beginValue() : null}
          <TableCell
            style={{ width: "min-content" }}
            sx={{ ...body.cell.style.sx }}
          >
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              sx={{ width: "min-content" }}
              style={{ width: "min-content" }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {prop.value}
          {header.row.endValue ? header.row.endValue() : null}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse id="collapseTa" in={open} timeout="auto" unmountOnExit>
              {collapseValue(prop.row, prop.index)}
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };
  const ariaLabel = options.collapsible ? "collapsible table" : "simple table";
  const { tableData, setTableData } = props.state;
  const copy = (obj) => JSON.parse(JSON.stringify(obj));
  const [allTableData] = React.useState(copy(props.state.tableData));
  // let tableData = data.value;
  // const setTableData = (data) => {tableData = data};
  return (
    <TableContainer
      sx={{ ...options.containStyle, width: "min-content" }}
      id={options.containerClass}
      component={Paper}
    >
      <Table id={options.tableClass} aria-label={ariaLabel}>
        <TableHead>
          {header.search ? (
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
          ) : null}
          <CustomTableRow
            value={
              <>
                {header.row.beginValue ? header.row.beginValue() : null}
                {options.collapsible ? (
                  <CustomTableCell
                    value={""}
                    sx={{ width: "min-content", ...header.cell.style.sx }}
                    styleClass={header.cell.style.class}
                  />
                ) : null}
                {header.cell.value.map((key) => (
                  <CustomTableCell
                    key={key}
                    sx={header.cell.style.sx}
                    styleClass={`${header.cell.style.class}`}
                    value={key}
                  />
                ))}
                {header.row.endValue ? header.row.endValue() : null}
              </>
            }
            styleClass={`${header.styleClass}`}
          />
          <TableRow></TableRow>
        </TableHead>
        <TableBody>
          {options.collapsible
            ? tableData.map((row, index) => (
                <CollapsibleTableRow
                  key={`${index} ${JSON.stringify(row)}`}
                  row={row}
                  index={index}
                  value={
                    <>
                      {data.keys.map((key) => (
                        <CustomTableCell
                          key={key}
                          value={row[key]}
                          sx={body.cell.style.sx}
                          styleClass={`${body.cell.style.class}`}
                        />
                      ))}
                    </>
                  }
                  collapseValue={options.collapsible.collapseValue}
                />
              ))
            : tableData.map((row, index) => (
                <CustomTableRow
                  key={`${index} ${JSON.stringify(row)}`}
                  value={
                    <>
                      {data.keys.map((key) => (
                        <CustomTableCell
                          value={row[key]}
                          sx={body.cell.style.sx}
                          styleClass={`${body.cell.style.class}`}
                        />
                      ))}
                    </>
                  }
                  styleClass={`${body.row.styleClass}`}
                />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
