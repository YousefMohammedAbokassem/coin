'use client'
import React, { useState } from "react";
import ShipmentAndReturn from "./ShipmentAndReturn";
import Description from "../Description";
import Review from "./Review";

const ProductBotoom = ({data}) => {

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div>
      <Description expanded={expanded} handleChange={handleChange} data={data} />
      <Review expanded={expanded} handleChange={handleChange} />
      <ShipmentAndReturn expanded={expanded} handleChange={handleChange} />
    </div>
  );
};

export default ProductBotoom;
