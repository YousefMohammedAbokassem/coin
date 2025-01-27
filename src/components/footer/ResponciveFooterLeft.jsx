import React from "react";
import { useTranslation } from "@/i18n/client";

const ResponciveFooterLeft = () => {
  const { t } = useTranslation(localStorage.getItem("i18nextLng"));
  return (
    <>
      <div className="block md:hidden text-center px-4 h-full">
        <h6 className="font-normal text-lg mb-4">{t("haventYouSigned")}</h6>
        <p className="text-[#666] text-sm mb-8">{t("theRicoHome")}</p>
        <p className="text-[#666] text-sm mb-8">{t("weRespectPrivcy")}</p>
      </div>
    </>
  );
};

export default ResponciveFooterLeft;
