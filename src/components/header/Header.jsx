"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DrawerProfile from "./DrawerProfile";
import DrawerFavorate from "./DrawerFavorate";
import CardDrawer from "./CardDrawer";
import Link from "next/link";
import Navbar from "./Navbar";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonIcon from "@mui/icons-material/Person";
import InstagramIcon from "@mui/icons-material/Instagram";
import useMediaQuery from "@mui/material/useMediaQuery";
import FacebookIcon from "@mui/icons-material/Facebook";
import ReorderIcon from "@mui/icons-material/Reorder";
import LanguageIcon from "@mui/icons-material/Language";
import { Badge, Menu, MenuItem } from "@mui/material";
import { languages } from "@/i18n/settings";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer } from "@/store/loginSlice";
import { useSession } from "next-auth/react";
import { fetchFavorite } from "../../store/favoriteSlice";
import NotificationsPopover from "./NotificationsPopover";
import { onMessage } from "firebase/messaging";
import { generateToken, messaging } from "../notification/firebase";
import { category } from "@/store/categorySlice";

const Header = ({ lng }) => {
  const session = useSession();


  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:1024)");
  const [openProfile, setOpenProfile] = useState(false);
  const [openFavorate, setOpenFavorate] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (session.data?.user?.token) {
      dispatch(fetchFavorite(session.data.user.token));
    }
  }, [session.data?.user?.token]);

  const { data } = useSelector((state) => state.favorite);


  useEffect(() => {
    dispatch(category(session?.data?.user?.token))
  }, [])
  

  const categories = useSelector((state) => state.category.data);




  //function for language
  const pathname = usePathname();

  function name() {
    let pathname2 = pathname.slice("1");
    // ar/asdas
    let pathname3 =
      pathname.slice("1").indexOf("/") >= 0
        ? pathname2.slice(pathname2.indexOf("/"))
        : "";
    return pathname3;
  }

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (e) => {
    // Handle the selected language here
    localStorage.setItem("i18nextLng", e);

    handleLanguageClose();
  };

  const showNavFun = () => {
    setShowNavBar((prev) => !prev);
  };

  const { cart } = useSelector((state) => state);

  const [payloadNotification, setPayloadNotification] = useState({});





  useEffect( () => {
    generateToken()
    onMessage(messaging, (payload) => {
      console.log(payload)
    })
  }, [])


  return (
    <>
      <div className="container mx-auto hidden  lg:flex flex-col lg:flex-row justify-between items-center ">
        <div className="flex justify-between w-full lg:w-auto">
          <div className="flex justify-center items-center gap-1">
            <div className="flex justify-center items-center gap-1 duration-150 hover:text-gray-400 cursor-pointer">
              <p>({cart.length})</p>
              <ShoppingCartCheckoutIcon onClick={() => setOpenCart(true)} />
            </div>
            <Badge badgeContent={data.length}>
              <FavoriteBorderIcon
                onClick={() => setOpenFavorate((prev) => !prev)}
                sx={{ transition: "0.2s", ":hover": { color: "gray" } }}
              />
            </Badge>
            <PersonIcon
              onClick={() => dispatch(toggleDrawer())}
              sx={{ transition: "0.2s", ":hover": { color: "gray" } }}
            />
            <LanguageIcon
              sx={{ cursor: "pointer" }}
              onClick={handleLanguageClick}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleLanguageClose}
              keepMounted
            >
              {languages.map((element, index) => (
                <Link key={index} href={`/${element}${name()}`}>
                  <MenuItem onClick={() => handleLanguageSelect(element)}>
                    {element}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </div>
        </div>
        <Link href="/">
          <Image src="/rico.webp" width={200} height={100} alt="Rico" />
        </Link>
        <div className="flex justify-center gap-1">
          {session.status === "authenticated" ? <NotificationsPopover /> : ""}

          <InstagramIcon
            sx={{
              display: `${matches ? "none" : "block"}`,
              transition: "0.2s",
              ":hover": { color: "gray" },
            }}
          />
          <FacebookIcon
            sx={{
              display: `${matches ? "none" : "block"}`,
              transition: "0.2s",
              ":hover": { color: "gray" },
            }}
          />
        </div>
      </div>

      <div className="container mx-auto flex  lg:hidden flex-col lg:flex-row justify-between items-center ">
        <Link href="/">
          <Image src="/rico.webp" width={200} height={100} alt="Rico" />
        </Link>
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-between w-full lg:w-auto">
            <div className="flex justify-center items-center gap-1">
              <div className="flex justify-center items-center gap-1 duration-150 hover:text-gray-400 cursor-pointer">
                <p>({cart.length})</p>
                <ShoppingCartCheckoutIcon onClick={() => setOpenCart(true)} />
              </div>
              <Badge badgeContent={data.length}>
                <FavoriteBorderIcon
                  onClick={() => setOpenFavorate((prev) => !prev)}
                  sx={{ transition: "0.2s", ":hover": { color: "gray" } }}
                />
              </Badge>
              <PersonIcon
                onClick={() => dispatch(toggleDrawer())}
                sx={{ transition: "0.2s", ":hover": { color: "gray" } }}
              />
              <LanguageIcon
                sx={{ cursor: "pointer" }}
                onClick={handleLanguageClick}
              />
            </div>
            <div>
              <ReorderIcon
                onClick={(prev) => setShowNavBar(!prev)}
                sx={{
                  display: `${matches ? "none" : "block"}`,
                  transition: "0.2s",
                  ":hover": { color: "gray" },
                }}
              />
            </div>
          </div>
          <div className="flex justify-center gap-1">
            {
              session.status === "authenticated" &&
            <NotificationsPopover />
            }
            <InstagramIcon
              sx={{
                display: `${matches ? "none" : "block"}`,
                transition: "0.2s",
                ":hover": { color: "gray" },
              }}
            />
            <FacebookIcon
              sx={{
                display: `${matches ? "none" : "block"}`,
                transition: "0.2s",
                ":hover": { color: "gray" },
              }}
            />
          </div>
        </div>
      </div>
      <DrawerProfile open={openProfile} setOpen={setOpenProfile} />
      <DrawerFavorate open={openFavorate} setOpen={setOpenFavorate} />
      <CardDrawer open={openCart} setOpen={setOpenCart} />
      <Navbar
        categories={categories}
        showNavBar={showNavBar}
        setShowNavBar={setShowNavBar}
        showNavFun={showNavFun}
        lng={lng}
      />
    </>
  );
};

export default Header;
