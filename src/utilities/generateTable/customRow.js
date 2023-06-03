import React from "react";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function CustomRow(props) {
    const [open, setOpen] = React.useState(false);
    const { cellSX, cellStyle, CollapseComponent, colSpan} = props;
    return CollapseComponent ? <>
        <TableRow sx={{ "& > *": { borderBottom: "unset" }, ...props.sx }}>
        <TableCell style={{ width: "min-content", ...cellStyle }}
          sx={cellSX ?? {}}>
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
        {props.children}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={colSpan ?? 6}>
          <Collapse id="collapseTa" in={open} timeout="auto" unmountOnExit>
            {CollapseComponent()}
          </Collapse>
        </TableCell>
      </TableRow> </>: <TableRow>{props.children}</TableRow>
}
export default CustomRow;