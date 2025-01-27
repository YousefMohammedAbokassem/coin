import React from "react";

const ResetPassword = () => {
  return (
    <div className="container mx-auto my-16">
      <form className="space-y-6 max-w-[320px] lg:max-w-[400px] m-auto text-center">
        <h6 className="text-cenetr text-2xl">Password reset</h6>
        <div className="flex flex-col">
          <label className="text-left">Phone</label>
          <input
            type="text"
            placeholder="Your number phone"
            required
            className="border px-4 py-1 rounded-sm font-semibold"
          />
        </div>
        <button type="submit" className="custom-button-login">
          Send code
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
