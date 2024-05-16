import React from "react";
import { FcPaid } from "react-icons/fc";

import { useNavigate } from "react-router-dom";
function PaymentSucceded() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen ">
      <div
        onClick={() => navigate("/")}
        className=" flex cursor-pointer  items-center"
      >
        <h1 className="text-3xl font-bold mr-2   ">your payment has succeded </h1>
        <FcPaid
          size={50}
        />
      </div>
    </div>
  );
}

export default PaymentSucceded;
