import { Typography } from "@mui/material";
import React from "react";
import ProductLeftTop from "./ProductLeftTop";
import ProductLeftCenter from "./ProductLeftCenter";
import ProductBotoom from "./productBotoom/ProductBotoom";

const ProductRight = ({data}) => {
  return (
    <div className="basis-[48%] flex flex-col items-center lg:items-end text-base lg:text-center">
      <ProductLeftTop data={data} />
      <ProductLeftCenter data={data} />
      <ProductBotoom data={data} />

    </div>
  );
};

export default ProductRight;
