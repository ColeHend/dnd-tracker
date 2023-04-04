import React, { PropsWithChildren } from "react";
import { TableRow } from "@mui/material";
interface props {
    value?: any;
    styleClass?: string;
    sx?: Object;
}

function CustomTableRow (props:PropsWithChildren<props>) {
    return (
        <TableRow sx={props.sx} id={props.styleClass ?? "default_roww"}>
          {props.children ?? props.value ?? null}
        </TableRow>
      )
}

export default CustomTableRow;