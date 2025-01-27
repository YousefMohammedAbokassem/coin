"use client";
import {
  Avatar,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const OrderTableRow = ({ data, handleClick }) => {
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" sx={{cursor:"pointer"}} onClick={() => handleClick(data)}>
        <TableCell component="th" scope="row" padding="none">
          <Typography variant="subtitle2" noWrap sx={{marginLeft: "10px"}}>
            {data.personal_info.name}
          </Typography>
        </TableCell>
        <TableCell>
          {" "}
          <Typography variant="subtitle2" noWrap>
            {data.personal_info.phone}
          </Typography>
        </TableCell>
        <TableCell>
          {" "}
          <Typography variant="subtitle2" noWrap>
            {data.area}
          </Typography>
        </TableCell>
        <TableCell>
          {" "}
          <Typography variant="subtitle2" noWrap>
            {data.city}
          </Typography>
        </TableCell>
        <TableCell>
          {" "}
          <Typography variant="subtitle2" noWrap>
            {data.address}
          </Typography>
        </TableCell>
        <TableCell>
          {" "}
          <Typography variant="subtitle2" noWrap>
            {data.status}
          </Typography>
        </TableCell>
        <TableCell>
          {" "}
          <Typography variant="subtitle2" noWrap>
            {data.total_price}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderTableRow;
