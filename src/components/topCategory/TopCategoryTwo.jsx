'use client'
import React from "react";
import TopCategoryTowCart from "./TopCategoryTowCart";

import { useSelector } from "react-redux";

const TopCategoryTwo = () => {

  const {data} = useSelector(state => state.category)

  return (
    <div className="container mx-auto">
      <div className="overflow-x-hidden border-b border-gray-300">
        <div className="flex flex-wrap -mx-4">
          {data.slice(2, 4).map((element, index) => (
            <TopCategoryTowCart key={index} data={element} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCategoryTwo;
