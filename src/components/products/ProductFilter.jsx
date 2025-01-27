"use client";
import { IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "@/store/favoriteSlice";
import axios from "axios";
import { useSession } from "next-auth/react";

const ProductFilter = ({ data }) => {
  const session = useSession();
  const dispatch = useDispatch();

  const handleFavorite = (e) => {
    e.stopPropagation();

    dispatch(removeFavorite(data.id));

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}user/favorites/add_to_favorite?product_id=${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${session.data.user.token}`,
          },
        }
      )
      .then((res) => {})
      .catch((error) => {
        console.log(error);
        dispatch(addFavorite(data));
      });
  };

  console.log("product from favorite", data);

  return (
    <div className="flex justify-between items-center my-8">
      <div className="basis-[45%] h-[120px] relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.images[0]}`}
          fill
          alt={data.name}
        />
      </div>
      <div className="basis-[45%] flex flex-col ">
        <p className="text-lg">{data.name}</p>
        <p className="text-md text-gray-400">
          {" "}
          {data.description.length > 30
            ? `${data.description.substring(0, 30)}...`
            : data.description}
        </p>
        {/* <IconButton sx={{}} onClick={handleFavorite}> */}
        {data.is_favorite ? (
          <FavoriteIcon onClick={handleFavorite} />
        ) : (
          <FavoriteBorderIcon onClick={handleFavorite} />
        )}
        {/* </IconButton>{" "} */}
        <p className="text-md text-gray-400">{data.price}</p>
      </div>
    </div>
  );
};

export default ProductFilter;
