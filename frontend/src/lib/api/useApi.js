import useAuth from "./useAuth";
import useCookie from "./useCookie";
import axios from "./axios";
import FormData from "form-data";
import { toast } from "sonner";
const useApi = () => {
  const { getToken } = useCookie();
  const getProducts = async () => {
    const token = getToken();
    const response = await axios.get("/products/", {
      headers: {
        accept: "application/json",
        Authorization: "Token " + token,
      },
    });
    return response.data
  };

  const addProduct = async (user) => {
    const token = getToken();
    const form = new FormData();
    for (let key in user) {
      form.set(key, user[key]);
    }
    

    try {
      const response = await axios.post("/products/", form, {
        headers: {
          Authorization: "Token " + token,
          accept: "application/json",
          "Content-Type": "multipart/form-data",
          "X-CSRFTOKEN":
            "JyrG5RuoxfXcbuMSiOtLYHeszliqZ8Y5eeBIIopWG75r9yHUGbPfohOtanhfU9PQ",
        },
      });

      if (response.status === 201) toast.success("product added seccessfuly");
      
      return response.data;
    } catch (err) {
      toast.error("error");
      console.log(err);
    }
  };

  const getCategories = async () => {
    const token = getToken();

    const response = await axios.get("/categories/", {
      headers: {
        accept: "application/json",
        Authorization: "Token " + token,
      },
    });
    return response.data
  };

  return { getProducts, addProduct , getCategories };
};

export default useApi;
