"use client";
import { addOne, minusOne, removeFromCart } from "@/store/cartSlice";
import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const CartLeft = ({deliveryDuration, deliveryPrice}) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();


  const [total, setTotal] = useState(0);

  useEffect(() => {
    let calcTotal = 0;
    cart.forEach((element) => {
      calcTotal += element.total_price;
    });
    setTotal(calcTotal);
  }, [cart]);

  const handleIncrement = (product) => {
    dispatch(addOne(product));
  };


  const handleDecrement = (product) => {
    dispatch(minusOne(product));
  };

  const handleRemoveItem = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <div className="bg-[#FAFAFA] p-8 basis-[100%] lg:basis-[50%] w-full lg:w-auto">
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {cart.map((element, index) => (
          <div key={index} className="w-[200px] h-[300px] text-center">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${element.image}`}
              alt={element.name}
              className="w-full h-[200px] object-cover"
            />
            <div>
              <h6 className="font-bold">{element.name}</h6>
              <p className="font-semibold">{element.total_price}</p>
              <div className="flex justify-center items-center gap-2">
                <button
                  className="px-2 border"
                  onClick={() => handleDecrement(element)}
                >
                  -
                </button>{" "}
                <p className="font-semibold text-xl">{element.ammount}</p>
                <button
                  className="px-2 border"
                  onClick={() => handleIncrement(element)}
                >
                  +
                </button>
              </div>
              <button className="font-semibold" onClick={() => handleRemoveItem(element)}>remove</button>
            </div>
          </div>
        ))}
      </div>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          backgroundColor: "rgb(203 193 193)",
          py: 3,
          px: 2,
        }}
      >
        <Typography variant="h6">Items Price</Typography>
        <Typography variant="body1">{total}</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          backgroundColor: "rgb(203 193 193)",
          py: 3,
          px: 2,
        }}
      >
        <Typography variant="h6">Delivery Price</Typography>
        <Typography variant="body1">{deliveryPrice}</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          backgroundColor: "rgb(203 193 193)",
          py: 3,
          px: 2,
        }}
      >
        <Typography variant="h6">Total Payment</Typography>
        <Typography variant="body1">{deliveryPrice + total}</Typography>
      </Stack>
    </div>
  );
};

export default CartLeft;
