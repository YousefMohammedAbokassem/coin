'use client'
import React from "react";
import { useRouter } from "next/navigation";

const PolicyComp = () => {
  const router = useRouter()

  const handleRegister = () => {
    router.push("/account/register")
  }
  return (
    <div className="space-y-6 max-w-[320px] lg:max-w-[400px] m-auto text-center">
      <h6 className="text-cenetr text-2xl">My account</h6>
      <p>The advantages of opening a RICO Home account:</p>
      <ul className="list-disc text-left space-y-4">
        <li>
          <h6 className="text-gray-400 text-2xl">Order Tracking:</h6>
          <p className="text-gray-400">
            View your order history and track and manage purchases, returns and
            credits.
          </p>
        </li>
        <li>
          <h6 className="text-gray-400 text-2xl">Discounts and promotions:</h6>
          <p className="text-gray-400">
            receiving coupons and information by email about special discounts
            and promotions and the possibility of pre-purchasing new items at
            launch prices only for RICO Home account holders and before everyone
            else!
          </p>
        </li>
        <li>
          <h6 className="text-gray-400 text-2xl">
            Managing addresses and payment methods:
          </h6>
          <p className="text-gray-400">
            Registering and managing your addresses (billing and shipping
            addresses), and payment methods in a completely secure way for
            faster checkout.
          </p>
        </li>
        <li>
          <h6 className="text-gray-400 text-2xl">
            Saving items for future purchase:
          </h6>
          <p className="text-gray-400">
            Registering and managing your addresses (billing and shipping
            addresses), and payment methods in a completely secure way for
            faster checkout.
          </p>
        </li>
      </ul>
      <button className="custom-button-login" onClick={handleRegister}>
        please open an account for me!
      </button>
    </div>
  );
};

export default PolicyComp;
