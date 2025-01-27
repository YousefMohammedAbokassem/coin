'use client'
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faClock, faEnvelope, faHeadphones, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "@/i18n/client";

const FooterCenter = () => {
  const {t} = useTranslation(localStorage.getItem("i18nextLng"))
  return (
    <>
<div className=" hidden md:block text-center px-4 border-r border-dashed border-gray-400 h-full basis-1/3">
        <h6 className="font-normal text-lg mb-4">{t("weAreHere")}</h6>
        <p className="text-[#666] text-sm mb-6">
          {t("haveAQuestion")}
        </p>
        <h6 className="font-normal text-lg mb-2">{t("customerServices")}</h6>
        <div className="flex justify-center items-center gap-2 text-[#666] mb-1">
          <p>
            Write to us <a href="">on Instagram</a>
          </p>
          <FontAwesomeIcon icon={faInstagram} />
        </div>
        <div className="flex justify-center items-center gap-2 text-[#666] mb-1">
          <p>
            Write to us <a href="">on Facebook</a>
          </p>
          <FontAwesomeIcon icon={faFacebookF} />
        </div>
        <div className="flex justify-center items-center gap-2 text-[#666] mb-6">
          <p>
            Write to us <a href="">on Email</a>
          </p>
          <FontAwesomeIcon icon={faEnvelope} />
        </div>  
        <h6 className="font-normal text-lg mb-2">
          {t("operratingHours")}
        </h6>
        <div className="flex justify-center items-center gap-2 text-[#666] mb-1">
          <a href="">Call us: 03-6035076</a>
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <div className="flex justify-center items-center gap-2 text-[#666] mb-1">
          <p>Sunday - Thursday: 17:00 - 9:30</p>
          <FontAwesomeIcon icon={faClock} />
        </div>
        <div className="flex justify-center items-center gap-2 text-[#666] mb-1">
          <div>
            <p>Lavanda 43, Tel Aviv</p>
            <p>(distribution center and offices only)</p>
          </div>
          <FontAwesomeIcon icon={faLocationDot} />
        </div>
      </div>
    </>
  );
};

export default FooterCenter;
