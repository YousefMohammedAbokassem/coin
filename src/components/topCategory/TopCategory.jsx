"use client";

import { useSelector } from "react-redux";
import TopCategoryCard from "./TopCategoryCard";

const TopCategory = () => {


  const {data} = useSelector((state) => state.category);

  return (
    <div className="container mx-auto border-b mb-4 border-gray-300">
      <div className="overflow-x-hidden">
        <div className="flex flex-wrap mt-8 -mx-4 ">
          {data.slice(0, 3).map((element, index) => (
            <TopCategoryCard key={index} data={element} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCategory;
