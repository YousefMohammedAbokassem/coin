import {
  Badge,
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductFilter from "../products/ProductFilter";
import { removeAllFavorites } from "@/store/favoriteSlice";
import { useTranslation } from "@/i18n/client";
import { closeDrawer } from "@/store/loginSlice";

const DrawerFavorate = ({open, setOpen}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation(localStorage.getItem("i18nextLng"))

  const handleEmptyFavorie = () => {
    dispatch(removeAllFavorites());
  };

  const handleClose = () => {
    dispatch(closeDrawer())
  }

  const {data} = useSelector(state => state.favorite)



  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
        <Box width="300px" sx={{ p: 2 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
            <Typography variant="body1">{t("myFavorite")}</Typography>
          </Stack>
          {data.map((element, index) => (
            <ProductFilter key={index} data={element} />
          ))}
        </Box>
        {/* {data.length ? (
          <div className="w-[80%] mx-auto">
            <button
              className="custom-button-login w-[80%]"
              onClick={handleEmptyFavorie}
            >
              Empty Favorite
            </button>
          </div>
        ) : (
          ""
        )} */}
      </Drawer>
    </>
  );
};

export default DrawerFavorate;
