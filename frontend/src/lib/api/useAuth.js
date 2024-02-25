import axios from "./axios";
import useCookie from "./useCookie";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthContext } from "@/context/authContext";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, password, full_name }) => {
      const response = await axios.post(
        "users/open",
        {
          email: email,
          password: password,
          full_name: full_name,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      navigate("/verify-email");
    },
    onError: (error) => {
      toast.error(error["response"].data.detail);
    },
  });
};

export const useSignIn = () => {
  const { setToken } = useCookie();
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axios.post(
        "/login/access-token",
        new URLSearchParams({
          grant_type: "",
          username: email,
          password: password,
          scope: "",
          client_id: "",
          client_secret: "",
        }),
        {
          headers: {
            accept: "application/json",
          },
        }
      );

      setToken(response.data.access_token);
      setUser(response.data.user);
      navigate("/documents");
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        toast.error("Uncorrect Credentials!");
        navigate("/sign-in");
      }
      if (error.response?.status === 401) {
        toast.error("Please Verify Your Email!");
        navigate("/verify-email");
      }
    },
  });
};

export const useCurrentUser = () => {
  const { getToken } = useCookie();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.get("users/me", {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      });

      return response.data;
    },
    onError: (error) => {
      if (error.response?.status === 403) {
        toast.error("Session Expired, please Sign In!");
        navigate("/");
      }
    },
  });
};

export const useGoogleSignIn = () => {
  const { setToken } = useCookie();
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ token }) => {
      const response = await axios.post("/login/google", token, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setToken(response.data.access_token);
      setUser(response.data.user);
      navigate("/documents");
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        toast.error("Something went wrong, please try again!");
      }
    },
  });
};
