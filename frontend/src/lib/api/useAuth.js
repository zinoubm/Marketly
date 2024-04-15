import axios from "./axios";
import useCookie from "./useCookie";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "@/context/authContext";

const useAuth = () => {
  const { setToken, getToken } = useCookie;
  const navigate = useNavigate();

  const signUp = async () => {};
  const signIn = async () => {};

  const getCurrentUser = async () => {
    try {
      token = getToken();

      const response = await axios.get("/auth/user/", {
        headers: {
          accept: "application/json",
          Authorization: "Token " + token,
        },
      });

      return response.data;
    } catch (err) {
      console.log("Something went wrong!", err);
      if (err.response.status === 401) navigate("/sign-in");
    }
  };

  const googleSignIn = async (token) => {
    try {
      const response = await axios.post(
        "/auth/google/login/",
        {
          token: token,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setToken(response.data.key);
      return response.data;
    } catch (err) {
      console.log("Something went wrong!", err);
    }
  };

  return {
    signUp,
    signIn,
    getCurrentUser,
    googleSignIn,
  };
};

export default useAuth;
