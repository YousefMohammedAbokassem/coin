"use client";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import { emptyCart } from "@/store/cartSlice";
import CloseIcon from "@mui/icons-material/Close";

const CartRight = ({
  cities,
  selectedArea,
  areas,
  setSelectedArea,
  setDeliveryDuration,
  setDeliveryPrice,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [address, setAddress] = useState("");
  const [radio, setRadio] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { cart } = useSelector((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("area_id", selectedArea);
    formData.append("city_id", selectedCity);
    formData.append("address", address);
    formData.append("is_paid", radio === "Cash" ? 1 : 0);

    cart.forEach((element, index) => {
      formData.append(`items[${index}][product_id]`, element.id);
      formData.append(`items[${index}][variant_id]`, element.variant_id);
      formData.append(`items[${index}][amount]`, element.ammount);
    });

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}user/orders/create`, formData, {
        headers: {
          Authorization: `Bearer 5|pcpbtsQdGQWgcVamUPCTtUZrUAQEILypNwPyG7t0d0d9fe36`,
        },
      })
      .then((res) => {
        setLoading(false);
        dispatch(emptyCart());
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

        if (error.response) {
          setOpenSnack(true);
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("Error, please try again");
        }
      });
  };

  //   handle snack bar
  const handleClose = () => {
    setOpenSnack(false);
  };
  const action = (
    <>
      <Button sx={{ color: "#000" }} size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const handleChangeCity = (event) => {
    const selectedCityId = event.target.value;
    const selectedCity = cities.find((city) => city.id === selectedCityId);

    setSelectedCity(selectedCityId);
    setDeliveryDuration(selectedCity.delivery_duration);
    setDeliveryPrice(selectedCity.delivery_price);
  };

  return (
    <>
      <div className="mt-8 basis-[100%] lg:basis-[50%] p-8 ">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontSize: "26px" }}
        >
          Personal Information
        </Typography>
        <form className="space-y-6 w-[70%] m-auto" onSubmit={handleSubmit}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Your Name"
            name="name"
            required
            fullWidth
          />
          <TextField
            value={phone}
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            label="Your number phone"
            required
            fullWidth
          />
          <TextField
            required
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            select
            fullWidth
            label="Select Area"
          >
            {areas.map((area) => (
              <MenuItem key={area.id} value={area.id}>
                {area.name}
              </MenuItem>
            ))}
          </TextField>
          {selectedArea && (
            <TextField
              required
              value={selectedCity}
              onChange={handleChangeCity}
              select
              fullWidth
              label="Select City"
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          <TextField
            required
            value={address}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            label="Enter Your Address"
          />
          <FormControl>
            <FormLabel> Chose Delivery Method</FormLabel>
            <RadioGroup
              name="delivery method"
              value={radio}
              onChange={(e) => setRadio(e.target.value)}
              required
            >
              <FormControlLabel
                control={<Radio required />}
                label="Cash"
                value="cash"
              />
              <FormControlLabel
                control={<Radio required />}
                label="Credit Card"
                value="CreditCard"
              />
            </RadioGroup>
          </FormControl>
          {radio === "CreditCard" && (
            <div className="bg-[#F6F6F6]">
              <div className=" p-4 flex justify-between items-center border  ">
                <div className="flex justify-center items-center gap-4">
                  <img
                    src="/Visa_Brandmark_Blue_RGB.png"
                    alt="visa"
                    className="w-[60px] h-[20px] object-cover"
                  />
                  <img
                    src="/visa-mastercard-logos.jpg"
                    alt="visa"
                    className="w-[60px] h-[20px] object-cover"
                  />
                </div>
                <Typography variant="body1">Credit Card</Typography>
              </div>
              <div className="min-h-[200px] text-center">
                <img
                  src="/Screen.png"
                  alt=""
                  className="w-[200px] h-[200px] object-contain"
                />
                <Typography variant="body1">
                  After clicking Pay Now you will be redirected to a credit card
                  to complete the purchase securely.
                </Typography>
              </div>
            </div>
          )}
          <button
            type="submit"
            className={`w-full bg-[#232323] px-2 py-4  rounded-md hover:bg-[#3838389c] duration-150 cursor-pointer text-white ${
              cart.length ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            disabled={cart.length ? false : true}
          >
            {loading ? <Loader /> : "Pay Now"}
          </button>
        </form>
      </div>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={action}
        ContentProps={{
          style: {
            color: "#fff",
            backgroundColor: "#D35252",
            fontWeight: "bold",
          },
        }}
      />
    </>
  );
};

export default CartRight;
