"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
// import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import {
  FreeMode,
  //   Pagination,
  Navigation,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import Product from "../products/Product";

export default function SliderImage({product}) {



  return (
    <div className="container mx-auto">
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        freeMode={true}
        mousewheel={true}
        loop={true}
        navigation={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[FreeMode, Navigation, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >
        {product.map((element, index) => (
          <SwiperSlide key={index} className="flex flex-col">
            <Product data={element} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
