'use client'
import React from "react";
import ProductCardComponent from "./ProductCardComponent";
import { Typography } from "@mui/material";

const OrderItems = ({ data, elementRef }) => {
  return (
    <>
      <Typography
        variant="h6"
        sx={{ mb: 4, fontWeight: "bold", textAlign: "center", mt: 8 }}
        ref={elementRef}
      >
        Item
      </Typography>
      <div className="flex justify-center items-center flex-wrap gap-8">
        {data.items.map((element, index) => (
          <ProductCardComponent key={index} element={element} />
        ))}
      </div>
    </>
  );
};

export default OrderItems;
