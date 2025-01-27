"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../Loader";

const LoginComp = () => {
  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <>
      <Button sx={{color : "#000"}} size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

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
      }
      setLoading(false);
    });
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-[320px] lg:max-w-[400px] m-auto text-center"
        >
          <h6 className="text-cenetr text-2xl">My account</h6>
          <div className="flex flex-col">
            <label className="text-left">Phone</label>
            <input
              type="text"
              placeholder="Your number phone"
              required
              className="border px-4 py-1 rounded-sm font-semibold"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-left">password</label>
            <input
              type="password"
              placeholder="Password"
              required
              className="border px-4 py-1 rounded-sm font-semibold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="custom-button-login">
            {loading ? <Loader /> : " Log In"}
          </button>
          <div className="flex justify-between items-center flex-wrap">
            <Link href="/account/register" className="underline mt-4">
              Dont have an account
            </Link>
            <Link href="/account/reset-password" className="underline mt-4">
              Forget Password
            </Link>
          </div>
        </form>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        action={action}
        ContentProps={{
          style: {
            color: "#fff",
            backgroundColor: "#DD0612",
            fontWeight :"bold"
          },
        }}
      />
    </>
  );
};

export default LoginComp;
