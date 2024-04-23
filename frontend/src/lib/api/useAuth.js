import axios from "./axios";
import useCookie from "./useCookie";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useAuth = () => {
  const { setToken, getToken } = useCookie();
  const navigate = useNavigate();

  const signUp = async (user) => {
    try {
      const response = await axios.post(
        "/auth/register/",
        {
          ...user,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFTOKEN":
              "mAVUAZcBGxrnbTXbcZAO9t1v5DubrgDAIANxnLMfcXfaBG14KdHsJ6oJBpyWB5C3",
          },
        }
      );

      if (response.status == 204) {
        setToken(response.data.key);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.email);
    }
  };

  const signIn = async (user) => {
    try {
      const response = await axios.post(
        "/auth/login/",

        {
          ...user,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFTOKEN":
              "mAVUAZcBGxrnbTXbcZAO9t1v5DubrgDAIANxnLMfcXfaBG14KdHsJ6oJBpyWB5C3",
          },
        }
      );
      if (response.status == 200) {
        setToken(response.data.key);
        navigate("/");
      }
    } catch (error) {
      toast.error("wrong password or email !");
    }
  };

  const getCurrentUser = async () => {
    try {
      const token = getToken();

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

      setToken(response.data.key);
      navigate("/");
      // return response.data;
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
