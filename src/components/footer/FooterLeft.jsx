'use client'
import React from "react";
// import { useTranslation } from "@/i18n";
import { useTranslation } from "@/i18n/client";

const FooterLeft = () => {

  const {t} =  useTranslation(localStorage.getItem("i18nextLng"))
  return (
    <>
      <div className="hidden md:block text-center px-4 border-r border-dashed border-gray-400 h-full basis-1/3">
        <h6 className="font-normal text-lg mb-4">
          {t("haventYouSigned")}
        </h6>
        <p className="text-[#666] text-sm mb-6">
          {t("theRicoHome")}
        </p>
        <p className="text-[#666] text-sm mb-2">
          {t("weRespectPrivcy")}
        </p>
      </div>
    </>
  );
};

export default FooterLeft;
