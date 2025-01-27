"use client";
import { Gallery, Item, useGallery } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const images = [
  "/category-1.png",
  "/category-2.png",
  "/category-3.png",
  "/category-4.png",
  "/category-5.png",
];

import React from "react";

const ImageGallery = () => {
  const { open } = useGallery();

  const handleOpen = () => {
    open(0);
  };
  return (
    <>
      <button onClick={handleOpen} className="text-gray-400 text-sm w-full text-center">
      View photos in full screen
        <ZoomInIcon />
      </button>
    </>
  );
};

// export default ImageGallery;
const MyGallery = ({data}) => {
  return (
    <Gallery>
      <ImageGallery />
      {data.images.map((image, index) => (
        <Item
          key={index}
          original={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`}
          thumbnail={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`}
          width="1024"
          height="768"
        >
          {({ ref, open }) => (
            <img
              ref={ref}
              onClick={open}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`}
              style={{ display: "none" }}
            />
          )}
        </Item>
      ))}
    </Gallery>
  );
};

export default MyGallery;
