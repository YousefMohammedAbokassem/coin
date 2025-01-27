import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";

const OrderListHead = ({ headLabel }) => {
  return (
    <TableHead sx={{backgroundColor: "#eeeeee"}}>
      <TableRow>
        {headLabel.map((headCell, index) => (
          <TableCell key={index} sx={{fontWeight: "bold"}} align={headCell.alignRight ? "right" : "left"}>
            <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default OrderListHead;
