"use client";

import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from '@mui/icons-material/Telegram';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ReactImageMagnify from "react-image-magnify";
import MyGallery from "./ImageGallery";
import {  Typography } from "@mui/material";
import { FacebookShareButton, TelegramShareButton, WhatsappShareButton } from "react-share";

const ProductLeft = ({ data }) => {
  const shareUrl = window.location.href;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="basis-[48%] w-full">
      <Swiper
        style={{
          "--swiper-navigation-color": "#000",
          "--swiper-pagination-color": "#000",
          "--swiper-pagination-width": "500px",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {data.images.map((element, index) => (
          <SwiperSlide key={index}>
            <div className="image-magnify-container">
              <ReactImageMagnify
                smallImage={{
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: `${process.env.NEXT_PUBLIC_IMAGE_URL}${element}`,
                }}
                largeImage={{
                  src: `${process.env.NEXT_PUBLIC_IMAGE_URL}${element}`,
                  width: 1200,
                  height: 1800,
                }}
                enlargedImageContainerDimensions={{
                  width: "150%",
                  height: "50%",
                }}
                enlargedImagePosition="over"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        navigation={true}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {data.images.map((element, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${element}`}
              alt="image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="">
        <MyGallery data={data} />
        <div className="flex justify-center items-center gap-4">
          <Typography variant="h6">Share this icon: </Typography>
          <div>
            <WhatsappShareButton url={shareUrl}>
              <WhatsAppIcon />
            </WhatsappShareButton>
            <TelegramShareButton url={shareUrl}>
              <TelegramIcon />
            </TelegramShareButton>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon />
            </FacebookShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLeft;
