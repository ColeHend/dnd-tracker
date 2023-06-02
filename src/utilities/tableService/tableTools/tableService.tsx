import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomTableCollapsibleRow from "./tableCollapseRow";
import CustomTableCell from "./tableCell";
import "../tableService.scss";
import SearchBar from "./searchbar";
import CustomTableRow from "./tableRow";
import props from "./tableService.model";


export default function GenerateTable(props: props) {
  const { data, options, header, body } = props;

  const ariaLabel = options.collapsible ? "collapsible table" : "simple table";
  const { tableData, setTableData } = props.state;
  const copy = (obj:Object) => JSON.parse(JSON.stringify(obj));
  const [allTableData] = React.useState(copy(data.value));
  console.log("allTableData", allTableData)
  console.log("tableData", tableData)
  console.log("props", props);
  
  const columnLength = options.collapsible ? data.keys.length + 1 : data.keys.length;
  return (
    <TableContainer
      sx={{ ...options.containStyle, width: "min-content" }}
      id={String(options?.containerClass)}
      component={Paper}
    >
      <Table id={String(options.tableClass)} aria-label={ariaLabel}>
        <TableHead>
          {header.row.headerValue ? (
            <TableRow>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "24px", width: "min-content" }}
                colSpan={columnLength}
              >
                {header.row.headerValue}
              </TableCell>
            </TableRow>
          ) : null}
          {header.search ? (
            <TableRow>
              <TableCell colSpan={columnLength}>
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
            value={undefined}
            styleClass={`${header.styleClass}`}
          >
             <>
                {header.row.beginValue ? header.row.beginValue() : null}

                {options.collapsible ? (
                  <TableCell style={{width:'min-content'}}></TableCell>
                ) : null}

                {header.cell.value.map((key, index) => (
                  <CustomTableCell
                    key={`key ${key} index ${index}`}
                    sx={header.cell.style.sx}
                    styleClass={`${header.cell.style.class}`}
                    value={String(key)}
                  />
                ))}
                
                  {header.row.endValue?<TableCell style={{width:'min-content'}}>
                    {typeof header.row.endValue === "string"
                      ? header.row.endValue
                      : "Nothing"}
                  </TableCell>:null}
                
              </>
          </CustomTableRow>
          <TableRow></TableRow>
        </TableHead>
        <TableBody>
          {options.collapsible
            ? tableData.map((row:any, index:number) => {
              return (
                <CustomTableCollapsibleRow
                  key={`${index} ${JSON.stringify(row)}`}
                  row={row}
                  index={index}
                  header={header}
                  body={body}
                  data={data}
                  collapseValue={options.collapsible?.collapseValue}                  >
                    <>
                    {data.keys.map((key, index) => (
                      <CustomTableCell
                        key={`key ${key} index ${index}`}
                        value={row[key]}
                        sx={body.cell.style.sx}
                        styleClass={`${body.cell.style.class}`} />
                    ))}
                    {body.row.endValue ? <TableCell style={{ width: 'min-content' }}>
                      {body.row.endValue(row)}
                    </TableCell> : null}
                  </>
                  </CustomTableCollapsibleRow>
              );
            })
            : tableData.map((row:any, index) => (
                <CustomTableRow
                  key={`${index} ${JSON.stringify(row)}`}
                  styleClass={`${body.row.style.class}`}
                >
                  <>
                      {data.keys.map((key) => (
                        <CustomTableCell
                          key={`key ${key} index ${index}`}
                          value={row[key]}
                          sx={body.cell.style.sx}
                          styleClass={`${body.cell.style.class}`}
                        />
                      ))}
                      {
                        body.row.endValue?<TableCell style={{width:'min-content'}}>
                        {body.row.endValue(row)}
                      </TableCell>:null
                      }
                    </>
                </CustomTableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
