"use client";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import AbcIcon from "@mui/icons-material/Abc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import FooterLeft from "./FooterLeft";
import FooterCenter from "./FooterCenter";
import FooterRight from "./FooterRight";
import ResponciveFooterLeft from "./ResponciveFooterLeft";
import ResponciveFooterCenter from "./ResponciveFooterCenter";
import ResponciveFooterRight from "./ResponciveFooterRight";
import { BootstrapTooltip } from "@/theme/tooltip";

const Footer = () => {
  return (
    <>
      <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-4 px-4">
        <FooterLeft />
        <ResponciveFooterLeft />
        <FooterCenter />
        <ResponciveFooterCenter />
        <FooterRight />
        <ResponciveFooterRight />
      </div>
      <div className="border-t border-b py-6 mt-6 border-gray-200 flex justify-center items-center gap-4">
        <BootstrapTooltip title="facebook">
          <FontAwesomeIcon
            icon={faFacebookF}
            className="w-[20px] h-[25px] hidden md:block duration-150 cursor-pointer"
          />
        </BootstrapTooltip>
        <BootstrapTooltip title="Instagram">
          <FontAwesomeIcon
            icon={faInstagram}
            className="w-[20px] h-[25px] hidden md:block duration-150 cursor-pointer"
          />
        </BootstrapTooltip>
      </div>
      <div>
        <div className="my-4 border-b border-gray-200 pb-4">
          <p className="text-[10px] leading-[12px] text-center">
            © 2014 - 2022 by RICO Brand LTD.
          </p>
        </div>
        <div>
          <div className="flex justify-center flex-wrap items-center gap-8">
            <BootstrapTooltip title="American Express">
              <div>
                <img
                  src="/american-express.png"
                  alt="american-express"
                  className="w-[50px] h-[25px]"
                />
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="Discover Network">
              <div>
                <img
                  src="/dicover-logo.png"
                  alt="dicover-logo"
                  className="w-[50px] h-[25px]"
                />
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="McAfee Secure">
              <div>
                <img
                  src="/mcfee.png"
                  alt="mcfee"
                  className="w-[50px] h-[25px]"
                />
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="PayPal">
              <div>
                <img
                  src="/paypal.gif"
                  alt="paypal"
                  className="w-[50px] h-[25px]"
                />
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="Visa">
              <div>
                <img
                  src="/visa-card-logo.gif"
                  alt="visa-card-logo"
                  className="w-[50px] h-[25px]"
                />
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="MasterCard">
              <div>
                <img
                  src="/mastercard-logo.gif"
                  alt="mastercard-logo"
                  className="w-[50px] h-[25px]"
                />
              </div>
            </BootstrapTooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
