'use client'
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faClock,
  faEnvelope,
  faHeadphones,
  faLocationDot,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
// import { useTranslation } from "@/i18n/client";
import { useTranslation } from "react-i18next";


const ResponciveFooterCenter = () => {

  const {t} = useTranslation(localStorage.getItem("i18nextLng"))




  

  const [isActive, setIsAvtive] = useState(false)

  const toggleContent = () => {
    setIsAvtive(!isActive);
  };


  

  return (
    <>
      <div onClick={toggleContent} className={`block md:hidden text-center px-4 h-full basis-1/3 mt-4 ${isActive ? "activeFooter" : ""} contentBx`}>
        <h6 className="font-normal text-lg mb-4 responcive-h6">
          WE ARE HERE FOR YOU
          <FontAwesomeIcon icon={faPlus} className="plus-icon" />
        </h6>
        <div className="content">
          <p className="text-[#666] text-sm mb-2">
            {t("haveAQuestion")}
          </p>
          <h6 className="font-normal text-lg mb-4">Customer Service</h6>
          <div className="flex justify-center items-center gap-2 text-[#666] mb-1">
            <p>
              Write to us <a href="">on Instagram</a>
            </p>
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <div className="flex justify-center items-center gap-2 text-[#666] mb-1">
            <p>
              Write to us <a href="">on Instagram</a>
            </p>
            <FontAwesomeIcon icon={faFacebookF} />
          </div>
          <div className="flex justify-center items-center gap-2 text-[#666] mb-1">
            <p>
              Write to us <a href="">on Instagram</a>
            </p>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div className="flex justify-center items-center gap-2 text-[#666] mb-1">
            <p>
              Write to us <a href="">on Instagram</a>
            </p>
            <FontAwesomeIcon icon=  {faHeadphones} />
          </div>
          <h6 className="font-normal text-lg mb-4">
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
      </div>
    </>
  );
};

export default ResponciveFooterCenter;
