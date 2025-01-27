"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "@/store/loginSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { SettingsInputSvideo } from "@mui/icons-material";
import { useState } from "react";
import { addFavorite, removeFavorite } from "@/store/favoriteSlice";

const Product = ({ data }) => {
  const dispatch = useDispatch();
  const session = useSession();

  const router = useRouter();

  const handleProduct = (id) => {
    router.push(`/products/${id}`);
  };

  const [isFavorite, setIsFavorite] = useState(data.is_favorite);

  const { favorite } = useSelector((state) => state);

  // const isFavorite = favorite.includes(data.id);

  // const isFavorite = favorite.some((favorite) => favorite.id === data.id);

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (session.status === "authenticated") {
      const token = session.data.user.token;
      console.log("token", token)
      const addToFavoriteUrl = `${process.env.NEXT_PUBLIC_API_URL}user/favorites/add_to_favorite?product_id=${data.id}`;
      setIsFavorite((prev) => !prev);
      // data.is_favorite = !data.is_favorite;
      if (data.is_favorite) {
        dispatch(removeFavorite(data.id));
      } else {
        dispatch(addFavorite({...data, is_favorite: 1}));
      }
      axios
        .get(addToFavoriteUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
        })
        .catch((error) => {
          console.log(error);
          setIsFavorite((prev) => !prev);
        });
    } else {
      dispatch(toggleDrawer());
    }
  };

  return (
    <div
      className="flex flex-col relative cursor-pointer w-[300px] h-[400px]"
      onClick={() => handleProduct(data.id)}
    >
      {data && data.images && data.images.length > 0 && (
        <>
          <div className="relative h-[350px]  w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.images[0]}`}
              fill
              className="rounded-xs"
              alt="product"
            />

          </div>
          <div className="flex items-center justify-between w-full px-1">
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex justify-between items-center w-full">
                <h6 className="custom-title-font">{data.name}</h6>
              </div>
              <p className="text-[16px] text-gray-400 text-start">
                {data.description.length > 30
                  ? `${data.description.substring(0, 30)}...`
                  : data.description}
              </p>
              <div className="flex justify-between items-center w-full">
                <h6 className="font-semibold">{data.price}
                <span className="font-normal text-gray-400 text-sm">$</span>
                </h6>
                {isFavorite ? (
                  <FavoriteIcon onClick={(e) => handleFavorite(e)} />
                ) : (
                  <FavoriteBorderIcon onClick={(e) => handleFavorite(e)} />
                )}
              </div>
            </div>
          </div>
          <div className="absolute top-[10px] text-sm left-[10px] flex justify-center items-center gap-2">
            {data.discount.is_percent === 0 ? (
              <p className="bg-yello-color text-sm text-white px-1 py-1/2 rounded-[2px] w-fit">
                {data.discount.value}-
              </p>
            ) : (
              ""
            )}
            {data.discount.is_percent === 1 ? (
              <p className="bg-red-color text-white px-1 py-1/2 rounded-[2px] w-fit">
                {data.discount.value}%-
              </p>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
