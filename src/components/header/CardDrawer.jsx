"use client";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCart from "../products/ProductCart";
import { emptyCart } from "@/store/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/client";

const CardDrawer = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation(localStorage.getItem("i18nextLng"));

  const { cart } = useSelector((state) => state);

  const handleRemoveCart = () => {
    dispatch(emptyCart());
  };

  const handleNavigation = () => {
    setOpen(false);
    router.push("/cart");
  };

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
        <Box width="300px" sx={{ p: 2 }}>
          <div className="w-full h-full relative">
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
              <Typography variant="body1">{t("myCart")}</Typography>
            </Stack>
            <div className="space-y-6 mt-8">
              {cart.map((element, index) => (
                <ProductCart key={index} data={element} />
              ))}
            </div>
            <Button
              onClick={handleNavigation}
              variant="contained"
              color="secondary"
              sx={{ position: "fixed", bottom: "10px", left: "20px" }}
            >
              Check Out
            </Button>
          </div>
        </Box>
        {cart.length ? (
          <div className="w-[80%] mx-auto">
            <button className="custom-button-login" onClick={handleRemoveCart}>
              Remove All Cart
            </button>
          </div>
        ) : (
          <>
            <Typography gutterBottom sx={{ textAlign: "center" }}>
              The cart is empty
            </Typography>
            <Link
              href="/collections"
              onClick={() => setOpen(false)}
              className="text-center font-bold"
            >
              Start Add Some
            </Link>
          </>
        )}
      </Drawer>
    </>
  );
};

export default CardDrawer;
