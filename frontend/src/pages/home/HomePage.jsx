import React, { useEffect } from "react";
import TopBar from "./TopBar";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import useAuth from "@/lib/api/useAuth";
import { toast } from "sonner";
import useCookie from "@/lib/api/useCookie";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/context/authStore";
const HomePage = () => {
  const { googleSignIn, getCurrentUser } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useCookie();
  const { setFirstName , setLastName  , first_name} =useAuthStore()
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      googleSignIn(credentialResponse.credential);
    },
    onError: () => {
      toast.error("Something Went Wrong, Please Try Again!");
    },
  });

  // you can remove this as It's just for testing useCurrentUser
  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUser();
      setFirstName(currentUser.first_name)
      setLastName(currentUser.last_name)
      
      // use this later to save user Info
      console.log(currentUser);
    })();

  }, []);

  // console.log("is auth", isAuthenticated());
  // if (isAuthenticated()) {
  //   navigate("/");
  // }

  return (
    <>
      <TopBar />
      {/* remove later */}
      <div className="h-screen">Just a place holder</div>
    </>
  );
};

export default HomePage;
