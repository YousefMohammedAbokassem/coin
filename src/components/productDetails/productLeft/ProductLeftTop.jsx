import React from "react";

const ProductLeftTop = ({ data }) => {
  return (
    <>
      <div className="basis-[45%] border-b-2 border-dashed pb-4 mx-auto">
        <div className="flex justify-end items-center gap-2 relative">
          <div className="text-sm left-[10px] flex justify-center items-center gap-2">
            {data.discount.is_percent === 0 ? (
              <p className="bg-yello-color text-sm text-white px-1 py-1/2 rounded-[2px] w-fit">
                {data.discount.value}-
              </p>
            ) : (
              ""
            )}
            {data.discount.is_percent === 1 ? (
              <p className="bg-red-color text-white px-1 py-1/2 rounded-[2px] w-fit">
                -20%
              </p>
            ) : (
              ""
            )}
          </div>
          <h4 className="font-semibold text-xl">{data.name}</h4>
        </div>
      </div>
    </>
  );
};

export default ProductLeftTop;
