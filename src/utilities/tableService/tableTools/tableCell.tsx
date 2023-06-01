import React from "react";
import TableCell from "@mui/material/TableCell";
interface props {
    value: string;
    styleClass?: string;
    sx?: Object;
}

function CustomTableCell (props:React.PropsWithChildren<props>) {
    return (
        <TableCell
            className={props.styleClass}
            sx={props.sx}>
            {props.children ?? props.value ?? null}
        </TableCell>
    );
};
export default CustomTableCell;