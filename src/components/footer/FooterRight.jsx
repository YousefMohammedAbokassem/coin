'use client'
import React from "react";
// import { useTranslation } from "@/i18n/client";
import { useTranslation } from "react-i18next";



const FooterRight = () => {
  const {t} = useTranslation(localStorage.getItem("i18nextLng"))
  return (
    <>
      <div className=" hidden md:block text-center px-4 h-full basis-1/3">
        <h6 className="font-normal text-lg mb-4">{t("importantInformation")}</h6>
        <a href="" className="text-[#666] text-sm mb-2 block">
          Gift vouchers
        </a>
        <a href="" className="text-[#666] text-sm mb-2 block">
          Your RICO account
        </a>
        <a href="" className="text-[#666] text-sm mb-2 block">
          Home Staging
        </a>
        <a href="" className="text-[#666] text-sm mb-2 block">
          Questions and Answers
        </a>
        <a href="" className="text-[#666] text-sm mb-2 block">
          Shipments and returns
        </a>
        <a href="" className="text-[#666] text-sm mb-2 block">
          Who we are
        </a>
        <a href="" className="text-[#666] text-sm mb-2 block">
          Contact Us
        </a>
        <a href="" className="text-[#666] text-sm mb-2 block">
          Sites Policy
        </a>
        <a href="" className="text-[#666] text-sm mb-2 block">
          Accessibility statement
        </a>
      </div>
    </>
  );
};

export default FooterRight;
