"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ResponciveFooterRight = () => {
  const {t} = useTranslation(localStorage.getItem("i18nextLng"))
  const [isActive, setIsAvtive] = useState(false);

  const toggleContent = () => {
    setIsAvtive(!isActive);
  };

  return (
    <>
      <div
        onClick={toggleContent}
        className={`block md:hidden text-center px-4 h-full w-full basis-1/3 ${
          isActive ? "activeFooter" : ""
        } contentBx`}
      >
        <h6 className="font-normal text-lg mb-4 responcive-h6">
          {t("importantInformation")}
          <FontAwesomeIcon icon={faPlus} className="plus-icon" />
        </h6>
        <div className="content">
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
      </div>
    </>
  );
};

export default ResponciveFooterRight;
