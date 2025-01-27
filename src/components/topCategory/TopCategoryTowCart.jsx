import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopCategoryTowCart = ({data}) => {
  return (
    <>
      <div className="w-full sm:w-1/2 px-4 mb-4 h-[500px]">
        <Link
          href={`/collections?id=${data.id}&category_name=${data.name}`}
          className="relative block w-full h-full"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.image}`}
            alt={data.name}
            fill
            className="hover:opacity-[0.5] duration-500 w-full h-full relative"
          />
          <div className="absolute bottom-4 bg-white-rgb px-4 py-2 font-medium w-3/4 text-center left-1/2 transform translate-x-half">
            {data.name}
          </div>
        </Link>
      </div>
    </>
  );
};

export default TopCategoryTowCart;
