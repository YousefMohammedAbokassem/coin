import { Button, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";

const ProductCart = ({ data }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeFromCart(data));
  };

  return (
    <div className="flex justify-between items-start ">
      <div className="relative w-[140px] h-[125px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.image}`}
          alt="product"
          fill
        />
      </div>
      <div className="relative h-[125px] w-[100px]">
        <h6 className="font-semibold">{data.name}</h6>
        <p className="text-gray-400">{data.price}$</p>
        <button className="absolute bottom-0 font-semibold" onClick={handleRemoveItem}>remove</button>
      </div>
    </div>
  );
};

export default ProductCart;
