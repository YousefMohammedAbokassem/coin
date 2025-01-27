"use client";
import { useTranslation } from "../../../../i18n/client";
// import Games from "./components/games/Games";
import { capitalize } from "../../../../lib/capitalize";
import Image from "next/image";
import FirstStep from "./../signComponent/FirtsStep";
import SecondStep from "./../signComponent/SecondStep";
import ThirdStep from "./../signComponent/ThirdStep";
import Stepper from "./../signComponent/Stepper";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
// export async function generateMetadata({ params: { lng } }) {
//   const { t } = await useTranslation(lng);
//   return {
//     title: capitalize(t("signup")),
//   };
// }
const people = [
  {
    id: 1,
    gender: "male",
  },
  {
    id: 2,
    gender: "female",
  },
];
export default function page({ lng }) {
  const { t } = useTranslation(lng);
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState(people[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [display_name, setDisplay_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [national_id, setNational_id] = useState("");
  const [gender, setGender] = useState(people[0]);
  const [place_of_birth, setPlace_of_birth] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [birthday, setBirthday] = useState("");
  const [card_number, setCard_number] = useState("");
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const [otp, setOtp] = useState("");
  const goToNextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // const checkIfDisable = () => {
  //   if (
  //     currentStep === 0 &&
  //     gender.length &&
  //     birthday.length &&
  //     first_name.length &&
  //     last_name.length &&
  //     national_id.length &&
  //     place_of_birth.length
  //   ) {
  //     return false;
  //   }
  //   return true;
  // };
  // console.log(checkIfDisable());
  return (
    <div className="signUp flex items-center h-screen">
      <div className="FormAccount w-1/2 mx-10 py-10">
        {/* <ChevronLeftIcon /> */}
        <div className="relative">
          <div
            className={`absolute -top-12 ${
              lng === "ar" ? "-right-2" : "-left-2"
            } cursor-pointer  ${currentStep === 0 && "hidden"}`}
            onClick={goToPreviousStep}
          >
            {lng === "ar" ? (
              <ChevronRightIcon className="w-10 h-10 text-[#85878B] dark:text-[#FFFFFF]" />
            ) : (
              <ChevronLeftIcon className="w-10 h-10 text-[#85878B] dark:text-[#FFFFFF]" />
            )}
          </div>
          <form className="createAn">
            <h1 className="text-[#1D1D1D] dark:text-[#fff] flex items-center justify-center text-2xl font-bold mt-16 mb-4">
              {t("createAnAcoount")}
            </h1>
          </form>
          {/* stpper */}
          <Stepper lng={lng} currentStep={currentStep} />
          {/* stpper */}
          {/* firststep */}
          {currentStep === 0 && (
            <FirstStep
              lng={lng}
              selected={gender}
              setSelected={setGender}
              selectedDate={birthday}
              setSelectedDate={setBirthday}
              people={people}
              first_name={first_name}
              setFirst_name={setFirst_name}
              last_name={last_name}
              setLast_name={setLast_name}
              national_id={national_id}
              setNational_id={setNational_id}
              place_of_birth={place_of_birth}
              setPlace_of_birth={setPlace_of_birth}
            />
          )}
          {currentStep === 1 && (
            <SecondStep
              lng={lng}
              card_number={card_number}
              setCard_number={setCard_number}
              country_id={country_id}
              setCountry_id={setCountry_id}
              password={password}
              password_confirmation={password_confirmation}
              setPassword={setPassword}
              setPassword_confirmation={setPassword_confirmation}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          )}
          {currentStep === 2 && (
            <ThirdStep lng={lng} otp={otp} setOtp={setOtp} />
          )}

          {/* firststep */}
          {currentStep !== 2 && (
            <div className="mt-6">
              <button
                type="button"
                className={`border-[#CDCDCD] bg-[#275963] text-white dark:bg-[#E1B145]  border-[1px]  dark:text-white rounded-md px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]
                ${
                  currentStep === 2 &&
                  "opacity-90 pointer-events-none cursor-not-allowed"
                }
                `}
                onClick={goToNextStep}
                disabled={currentStep === 2}
              >
                {t("next")}
              </button>
            </div>
          )}

          <div className="flex items-center justify-center m-10">
            <Link
              href={"/login"}
              className="text-[#1D1D1D] dark:text-[#FFFFFF]"
            >
              {t("doYou")}{" "}
              <u className=" dark:text-[#E1B145] text-[#275963]275963">
                {t("logIn")}
              </u>
            </Link>
          </div>
        </div>
      </div>
      {/* image */}
      <div className="image w-[60%] h-full">
        <Image
          src="/images/SingUp.jpg"
          alt="signUp image"
          width={700}
          height={700}
          className="w-full h-full "
        />
      </div>
    </div>
  );
}
