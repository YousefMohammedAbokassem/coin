"use client";
import { Button, IconButton, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addFavorite, removeFavorite } from "@/store/favoriteSlice";
import { useSession } from "next-auth/react";
import axios from "axios";

const ProductLeftCenter = ({ data }) => {
  const session = useSession();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [number, setNumber] = useState(1);
  const [isHovered, setIsHovered] = useState(false);


  const handleAddClick = () => {
    setNumber((prev) => prev + 1);
  };

  const handleMinusClick = () => {
    if (number === 1) {
    } else {
      setNumber((prev) => prev - 1);
    }
  };

  const handleNumberChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setNumber(value);
    }
  };

  const handleButtonHover = () => {
    setIsHovered(true);
  };

  const handleButtonHoverOut = () => {
    setIsHovered(false);
  };

  //start solution

  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState(0);

  const [firstAttribute, setFirstAttribute] = useState("");
  const [firstAttributeValues, setFirstAttributeValues] = useState([]);
  const [otherAttributes, setOtherAttributes] = useState([]);

  function getNextAttribute(attribute, value) {
    var attributesValuesDiv = document.getElementById(attribute);
    const children = attributesValuesDiv.children;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.innerHTML != value) {
        child.className =
          "px-3 py-[6px] text-[16px] capitalize rounded-sm  flex justify-center items-center bg-white text-gray-400 border border-gray-400";
      }
    }

    var index = otherAttributes.indexOf(attribute);
    var nextAttribute;
    if (index == null) {
      nextAttribute = otherAttributes[0];
      otherAttributes.forEach((element) => {
        var otherAttributesValues = document.getElementById(element);
        otherAttributesValues.innerHTML = "";
      });
    } else {
      nextAttribute = otherAttributes[index + 1];
      otherAttributes.slice(index + 1).forEach((element) => {
        var otherAttributesValues = document.getElementById(element);
        otherAttributesValues.innerHTML = "";
      });
    }
    var selectedIndex = -1;
    for (let index = 0; index < selected.length; index++) {
      if (selected[index].attribute == attribute) {
        selectedIndex = index;
      }
    }

    if (selectedIndex != -1) selected.splice(selectedIndex);
    selected.push({
      attribute: attribute,
      value: value,
    });
    var price = 0;
    var nextAttributeValues = [];
    data.variants.forEach((variant) => {
      var is_existed = selected.every(function (element) {
        return variant.attributes.find(function (attribute) {
          return (
            attribute.attribute == element.attribute &&
            attribute.value == element.value
          );
        });
      });
      if (is_existed) {
        price = variant.price;
        setSelectedVariantId(variant.id);
        variant.attributes.forEach((attribute) => {
          if (attribute.attribute == nextAttribute) {
            if (!nextAttributeValues.includes(attribute.value)) {
              nextAttributeValues.push(attribute.value);
            }
          }
        });
      }
    });

    if (nextAttribute == null) {
      setPrice(price);
    } else {
      setPrice(0);
      var nextValuesDiv = document.getElementById(nextAttribute);

      nextValuesDiv.innerHTML = "";

      nextAttributeValues.forEach((element) => {
        var button = document.createElement("button");
        button.style = "margin:5px";
        if (element.startsWith("#")) {
          button.style.backgroundColor = element;
          // button.className="w-[30px] h-[15px]"
          button.style.height = "25px";
          button.style.width = "50px";
        } else {
          button.className =
            "px-3 py-[6px] text-[16px] capitalize rounded-sm  flex justify-center items-center bg-white text-gray-400 border border-gray-900";
          button.addEventListener("click", function () {
            button.className = `px-3 py-[6px] text-[16px] capitalize rounded-sm  flex justify-center items-center bg-white text-gray-400 border border-gray-900`;
            getNextAttribute(nextAttribute, element);
          });
          button.append(element);
        }
        nextValuesDiv.appendChild(button);
      });
      getNextAttribute(nextAttribute, nextAttributeValues[0]);
    }
  }

  useEffect(() => {
    let firstAttribute = "";
    const firstAttributeValues = [];

    if (data.variants && data.variants.length > 0) {
      firstAttribute = data.variants[0].attributes[0].attribute;

      data.variants.forEach((variant) => {
        variant.attributes.forEach((attribute) => {
          if (attribute.attribute === firstAttribute) {
            if (!firstAttributeValues.includes(attribute.value)) {
              firstAttributeValues.push(attribute.value);
            }
          }
        });
      });
    }

    setFirstAttribute(firstAttribute);
    setFirstAttributeValues(firstAttributeValues);

    var otherAttributes = [];
    data.variants[0].attributes.slice(1).forEach((element) => {
      otherAttributes.push(element.attribute);
    });
    setOtherAttributes(otherAttributes);

    // Set default selected values for each attribute
    const defaultSelected = [];
    data.variants.forEach((variant) => {
      variant.attributes.forEach((attribute) => {
        if (
          !defaultSelected.some(
            (item) => item.attribute === attribute.attribute
          )
        ) {
          defaultSelected.push({
            attribute: attribute.attribute,
            value: attribute.value,
          });
        }
      });
    });
    setSelected(defaultSelected);
  }, [data]);

  useEffect(() => {
    if (firstAttribute && firstAttributeValues.length > 0) {
      getNextAttribute(firstAttribute, firstAttributeValues[0]);
    }
  }, [firstAttribute, firstAttributeValues]);

  const [errorMessage, setErrorMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const handleClose = () => {
    setOpenSnack(false);
  };
  const [selectedVariantId, setSelectedVariantId] = useState(null);

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

  const handleButtonClick = () => {
    const selectedAttributes = selected.map((item) => item.attribute);
    const missingAttributes = otherAttributes.filter(
      (attribute) => !selectedAttributes.includes(attribute)
    );

    if (missingAttributes.length === 0) {
      // console.log("All attributes selected. Add to cart: true");
      dispatch(
        addToCart({
          image: data.images[0],
          name: data.name,
          price,
          total_price: price * number,
          ammount: number,
          id: data.id,
          variant_id: selectedVariantId,
        })
      );
    } else {
      setErrorMessage(
        `you have to chose ${missingAttributes.map((attribute) => attribute)}`
      );
      setOpenSnack(true);
    }
  };

  const isProductInCart = () => {
    return cartItems.some(
      (item) => item.id === data.id && item.variant_id === selectedVariantId
    );
  };

  const favorite = useSelector((state) => state.favorite);

  const isFavorite = favorite.data.some((favorite) => favorite.id === data.id);

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (data.is_favorite) {
      dispatch(removeFavorite(data.id));
    } else {
      dispatch(addFavorite(data));
    }
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
      });
  };

  return (
    <>
      <div className="flex justify-between items-center w-[70%] py-4 mx-auto">
        <Typography
          variant="body1"
          sx={{
            color: "gray",
            textTransform: "capitalize",
            flexBasis: "20%",
          }}
        >
          {firstAttribute} :
        </Typography>
        <div
          id={firstAttribute}
          className="flex justify-center items-center gap-4"
        >
          {firstAttributeValues.map((element, index) => (
            <button
              key={index}
              className={`px-3 py-[6px] rounded-sm text-[16px] capitalize flex justify-center items-center bg-white text-gray-400 border ${
                selected.some((item) => item.value === element)
                  ? "border-gray-900"
                  : "border-gray-400"
              }`}
              onClick={() => getNextAttribute(firstAttribute, element)}
            >
              {element}
            </button>
          ))}
        </div>
      </div>



      {otherAttributes.map((element, index) => (
        <div
          key={index}
          className="flex justify-between items-center w-[70%] py-4 mx-auto"
        >
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              textTransform: "capitalize",
              flexBasis: "20%",
            }}
          >
            {element} :
          </Typography>
          <div
            id={element}
            className="flex justify-center items-center gap-4"
          ></div>
        </div>
      ))}

      <div className="flex justify-between items-center w-[70%] border-t border-dashed border-gray-400 pt-1 mx-auto">
        <Typography
          variant="body1"
          sx={{
            color: "#000",
            mt: 4,
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
        >
          price :
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "gray",
            mt: 4,
            textTransform: "capitalize",
          }}
        >
          {price * number}
        </Typography>
      </div>

      <div className="mx-auto">
        <Typography
          variant="body1"
          sx={{
            textTransform: "capitalize",
            fontSize: "18px",
            mt: 4,
            textAlign: "center",
          }}
        >
          Amount:
        </Typography>
        <div className="flex justify-between lg:justify-start w-full items-center gap-2 mt-2">
          <button
            onClick={handleAddClick}
            className="w-[30px] h-[30px] flex justify-center items-center text-xl font-bold bg-white text-gray-400 border border-gray-400 uppercase"
          >
            +
          </button>
          <input
            type="number"
            className="w-[200px] h-[30px] text-center border border-gray-400 text-gray-400 flex-grow"
            value={number}
            onChange={handleNumberChange}
          />
          <button
            onClick={handleMinusClick}
            className="w-[30px] h-[30px] flex justify-center items-center text-xl font-bold bg-white text-gray-400 border border-gray-400 uppercase"
          >
            -
          </button>
          <IconButton onClick={handleFavorite}>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
        <button
          className={`w-full rounded-sm p-1 flex justify-center items-center bg-black text-white uppercase border-black m-auto mt-2 cart-button 
      ${isHovered ? "hovered" : ""}${
            cartItems.some(
              (item) =>
                item.id === data.id && item.variant_id === selectedVariantId
            )
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }
      `}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonHoverOut}
          onClick={handleButtonClick}
          disabled={cartItems.some(
            (item) =>
              item.id === data.id && item.variant_id === selectedVariantId
          )}
        >
          {cartItems.some(
            (item) =>
              item.id === data.id && item.variant_id === selectedVariantId
          ) ? (
            <>
              Already in Cart
              <span className="icon-container">
                <ShoppingBagIcon />
              </span>
            </>
          ) : (
            <>
              Add to Cart
              <span className="icon-container">
                <ShoppingBagIcon />
              </span>
            </>
          )}
        </button>
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

export default ProductLeftCenter;
