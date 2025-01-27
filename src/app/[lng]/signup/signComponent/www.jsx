"use client";
import React, { useState } from "react";

const Stepper = ({ currentStep }) => {
  const steps = ["الخطوة الأولى", "الخطوة الثانية", "الخطوة الثالثة"];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {/* الدائرة */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              index <= currentStep
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {index + 1}
          </div>
          {/* النص */}
          <span
            className={`ml-2 ${
              index <= currentStep ? "text-teal-500 font-bold" : "text-gray-500"
            }`}
          >
            {step}
          </span>
          {/* الخط */}
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-1 mx-2 ${
                index < currentStep ? "bg-teal-500" : "bg-gray-200"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">إنشاء حساب</h1>
      {/* Stepper Component */}
      <Stepper currentStep={currentStep} />

      {/* نموذج الخطوة */}
      <div className="mb-4">
        {currentStep === 0 && <p>قم بملء معلوماتك الأساسية هنا.</p>}
        {currentStep === 1 && <p>أضف بيانات إضافية هنا.</p>}
        {currentStep === 2 && <p>تمت العملية! تحقق من التفاصيل.</p>}
      </div>

      {/* أزرار التنقل */}
      <div className="flex justify-between">
        <button
          onClick={goToPreviousStep}
          className={`px-4 py-2 rounded ${
            currentStep === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          disabled={currentStep === 0}
        >
          السابق
        </button>
        <button
          onClick={goToNextStep}
          className={`px-4 py-2 rounded ${
            currentStep === 2
              ? "bg-teal-300 text-white cursor-not-allowed"
              : "bg-teal-500 text-white hover:bg-teal-600"
          }`}
          disabled={currentStep === 2}
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
