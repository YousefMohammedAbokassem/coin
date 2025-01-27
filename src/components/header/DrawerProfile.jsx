"use client";
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
  Button,
  Divider,
  Snackbar,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import Loader from "../Loader";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/i18n/client";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "@/store/loginSlice";
import axios from "axios";


const DrawerProfile = ({ open, setOpen }) => {
  const dispatch = useDispatch()
  const {login} = useSelector(state => state)
  
  const handleCloseDrawer = () => {
    dispatch(closeDrawer())
  }

  // useEffect(() => {
  //     axios.get(`${process.env.NEXT_PUBLIC_API_URL}user/products`, {
  //       headers: {
  //         Authorization: `Bearer ${session?.data?.user?.token}`
  //       }
  //     })
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(error => {
  //       console.log((error))
  //     })
  // }, [])


  const router = useRouter();
  const session = useSession();
  const {t} = useTranslation(localStorage.getItem("i18nextLng"))


  const [loading, setLoading] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

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

  const handleForget = () => {
    // setOpen(false);
    handleCloseDrawer()
    router.push("/account/login/recover");
  };

  const handleRegister = () => {
    // setOpen(false);
    handleCloseDrawer
    router.push("/account/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signIn("credentials", {
      phone,
      password,
      fcm_token: "test",
      redirect: false,
      callbackUrl: "/",
    }).then((res) => {
      if (res.ok) {
        router.push(res.url || "/");
        setLoading(false);
      } else {
        setOpen(true);
        setErrorMessage("wrong phone or password");
        setLoading(false);
        console.log("failed to login")
      }
      setLoading(false);
    });
  };

  const handleLogOut = () => {
    //handle log out from api
    signOut()
  }
  return (
    <>
      <Drawer open={login} onClose={handleCloseDrawer} anchor="left">
        <Box width="300px" sx={{ p: 2 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <IconButton onClick={handleCloseDrawer}>
              <CloseIcon />
            </IconButton>
            <Typography variant="body1">{t("myAccount")}</Typography>
          </Stack>
          {session.status === "authenticated" ? (
            <>
            <div className="text-center">
              <Avatar sx={{margin : "auto", mt: "20px"}} alt="Remy Sharp" src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${session.data.user.user.image}`} />
              <Typography variant="h6">{session.data.user.user.name}</Typography>
              <Typography variant="body1">{session.data.user.user.phone}</Typography>
            </div>
            <button onClick={handleLogOut} className="custom-button-login mt-4">Log Out</button>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <label>*Phone</label>
                <input
                  type="text"
                  placeholder="your Number Phone?"
                  name="email"
                  className="border border-gray-400 py-1/2 px-2 w-full block m-auto mb-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />{" "}
                <label className="mt-2">*Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="border border-gray-400 py-1/2 px-2 w-full block m-auto mb-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />{" "}
                <button type="submit" className="custom-button-login">
                  {loading ? <Loader /> : " Log In"}
                </button>
              </form>
              <button
                onClick={handleCloseDrawer}
                className="bg-none underline mt-4"
              >
                Bach to the store
              </button>
              <button
                className="bg-none underline mt-4 text-gray-600 hover:text-black duration-150"
                onClick={handleForget}
              >
                forget your password ?{" "}
              </button>
              <Divider sx={{ mt: 2 }} />
              <Box>
                <Typography gutterBottom>enrollment</Typography>
                <Typography variant="subtitle2" gutterBottom>
                  The advantages of opening a RICO Home account:
                </Typography>
                <ul className="list-disc px-4">
                  <li className="mt-4">
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "16px", fontWeight: "medium" }}
                    >
                      Order tracking:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#858585" }}>
                      view order history, track and manage purchases, refunds
                      and credits.
                    </Typography>
                  </li>
                  <li className="mt-4">
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "16px", fontWeight: "medium" }}
                    >
                      Discounts and promotions:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#858585" }}>
                      receiving coupons and information by email about special
                      discounts and promotions and the possibility of
                      pre-purchasing new items at launch prices only for RICO
                      Home account holders and before everyone else!
                    </Typography>
                  </li>
                  <li className="mt-4">
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "16px", fontWeight: "medium" }}
                    >
                      Managing addresses and payment methods:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#858585" }}>
                      Registering and managing your addresses (billing and
                      shipping addresses), and payment methods in a completely
                      secure way for faster checkout.
                    </Typography>
                  </li>
                  <li className="mt-4">
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "16px", fontWeight: "medium" }}
                    >
                      Saving items for future purchase:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#858585" }}>
                      saving items you liked and may be out of stock (or for
                      future purchase) to your wish list and tracking their
                      return to stock.
                    </Typography>
                  </li>
                </ul>
                <button
                  onClick={handleRegister}
                  className="custom-button-login my-4"
                >
                  !open an account now
                </button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
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
            backgroundColor: "#DD0612",
            fontWeight: "bold",
          },
        }}
      />
    </>
  );
};

export default DrawerProfile;
