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

export default function GenerateTable(props) {
  const { data, options, header, body } = props.config;
  const CustomTableCell = (prop) => (
    <TableCell sx={props.sx} id={prop.styleClass}>{prop.value}</TableCell>
  );
  const CustomTableRow = (prop) => (
    <TableRow sx={props.sx} id={props.styleClass}>{prop.value}</TableRow>
  );
  const CollapsibleTableRow = (prop) => {
    const [open, setOpen] = React.useState(false);
    const { styleClass, collapseValue } = prop;
    return (
      <>
        <TableRow sx={{ "& > *": { borderBottom: "unset" },...props.sx }}>
          {header.row.beginValue ? header.row.beginValue() : null}
          <TableCell sx={{...body.cell.style.sx}}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              sx={{width:"min-content"}}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {prop.value}
          {header.row.endValue ? header.row.endValue() : null}
        </TableRow>
        <TableRow>
          <TableCell
            classNames={styleClass}
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={6}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
            {collapseValue(prop.row,prop.index)}
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };
  const ariaLabel = options.collapsible ? "collapsible table" : "simple table";
  return (
    <TableContainer sx={options.containStyle} id={options.containerClass} component={Paper}>
      <Table id={options.tableClass} aria-label={ariaLabel}>
        <TableHead>
          <CustomTableRow
            value={
              <>
                {header.row.beginValue ? header.row.beginValue() : null}
                {options.collapsible ?
                <CustomTableCell
                  value={""}
                  sx={{width: 'min-content', ...header.cell.style.sx}}
                  styleClass={`${header.cell.style.class}`}
                />
                :null}
                {header.cell.values.map((key) => (
                  <CustomTableCell
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
            ? data.value.map((row, index) => (
                <CollapsibleTableRow
                  key={`${index} ${JSON.stringify(row)}`}
                  row={row}
                  index={index}
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
                  collapseValue={options.collapsible.collapseValue}
                />
              ))
            : data.value.map((row, index) => (
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
