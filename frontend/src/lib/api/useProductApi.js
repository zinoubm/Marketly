import useCookie from "./useCookie";
import axios from "./axios";
import FormData from "form-data";
import { toast } from "sonner"; 
const useProductApi = () => {
  const { getToken } = useCookie();

  const getProducts = async () => {
    const token = getToken();
    const response = await axios.get("/products/", {
      headers: {
        accept: "application/json",
        Authorization: "Token " + token,
      },
    });
    return response.data;
  };


  const getSingleProduct = async (id) => {

  

    const token = getToken();
    const response = await axios.get(`/products/${id}/`, {
      headers: {
        accept: "application/json",
        Authorization: "Token " + token,
      },
    });
    return response.data;
  }
  const addProduct = async (prod) => {
    const token = getToken();
    const form = new FormData();
    for (let key in prod) {
      form.set(key, prod[key]);
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

      if (response.status === 201) {
        toast.success("product added seccessfuly");

        return response.data;
      }
    } catch (err) {
      toast.error("error");
      console.log(err);
    }
  };

  const getCategories = async () => {
    
    const response = await axios.get("/categories/", {
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  };

  const deleteProduct = async (id) => {
    const token = getToken();
    try {
      const response = await axios.delete(`/products/${id}`, {
        headers: {
          Authorization: "Token " + token,
          accept: "application/json",
          "X-CSRFTOKEN":
            "JyrG5RuoxfXcbuMSiOtLYHeszliqZ8Y5eeBIIopWG75r9yHUGbPfohOtanhfU9PQ",
        },
      });

      if (response.status === 204) {
        toast.warning("deleted your product");
      }
    } catch (err) {
      toast.error("error");
      console.log(err);
    }
  };
  const updateProduct = async (prod, id) => {
    const token = getToken();
    const form = new FormData();
    for (let key in prod) {
      form.set(key, prod[key]);
    }

    try {
      const response = await axios.patch(`/products/${id}/`, form, {
        headers: {
          Authorization: "Token " + token,
          accept: "application/json",
          "Content-Type": "multipart/form-data",
          "X-CSRFTOKEN":
            "JyrG5RuoxfXcbuMSiOtLYHeszliqZ8Y5eeBIIopWG75r9yHUGbPfohOtanhfU9PQ",
        },
      });
      if (response.status === 200) {
        toast.success("product has been apdated seccessfuly");

        return response.data;
      }
    } catch (err) {
      if (err.response.data["product_image"]) {
        toast.error("error you must add a picture ");
      } else if (err.response.data["category"]) {
        toast.error("error you must choose a category  ");
      }
    }
  };
  const searchForProduct=async ({search , max_price , min_price ,category })=>{
    
    
    const response = await axios.get('/products/search/', {
      params: {
        category,
        max_price,
        min_price,
        search
      },
      headers: {
        'accept': 'application/json'
      }
    });
    return response.data
  }
  return {
    getProducts,
    getSingleProduct,
    addProduct,
    getCategories,
    deleteProduct,
    updateProduct,
    searchForProduct
  };
}

export default useProductApi;