import React, { useEffect } from "react";
import TopBar from "./TopBar";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useGoogleSignIn } from "@/lib/api/useAuth";
import { toast } from "sonner";
import useCookie from "@/lib/api/useCookie";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { mutateAsync: SignInGoogle } = useGoogleSignIn();
  const navigate = useNavigate();
  const { isAuthenticated } = useCookie();

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse.credential);
    },
    onError: () => {
      toast.error("Something Went Wrong, Please Try Again!");
    },
  });

  // console.log("is auth", isAuthenticated());
  // if (isAuthenticated()) {
  //   navigate("/documents");
  // }

  return (
    <>
      <TopBar />
      {/* remove later */}
      <div className="h-screen">
        Just a place holder
      </div>
    </>
  );
};

export default HomePage;
