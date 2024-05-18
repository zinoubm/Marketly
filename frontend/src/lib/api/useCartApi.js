import axios from "./axios";
import { toast } from "sonner";
import useProductApi from "./useProductApi";
import useCookie from "./useCookie";
const useCartAPi = () => {
  const { getToken } = useCookie();
  const { getSingleProduct } = useProductApi();

  const getCartProducts = async () => {
    const token = getToken();
    try {
      const response = await axios.get("/cart/", {
        headers: {
          accept: "application/json",
          Authorization: "Token " + token,
        },
      });
      const data = response.data;
      const MyData = await Promise.all(
        data.map(async (InCart) => {
          const productDetails = await getSingleProduct(InCart.product);
          //! fixing the image
          if (!productDetails.product_image.includes("media/images")) {
            productDetails.product_image = productDetails.product_image.replace(
              "https://res.cloudinary.com/diqljjjbp/image/upload/v1/media/",
              ""
            );
          }

          return { ...InCart, product: productDetails };
        })
      );
      return MyData;
    } catch (error) {
      return null;
    }
  };

  const deleteCartProduct = async (id) => {
    const token = getToken();
    const response = await axios.delete(`/cart/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: "Token " + token,
      },
    });
    if (response.status == 204) {
      toast.warning("deleted ");
    }
  };

  const addProductToCart = async (product, quantity) => {
    const token = getToken();
    try {
      const response = await axios.post(
        "/cart/",
        {
          product,
          quantity,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: "Token " + token,
          },
        }
      );
      if (response.status == 201) toast.success("product added to the cart ");
    } catch (error) {
      if (error.response.status == 401) {
        toast.error("you must login to add product to your cart ", {
          style: { scale: 30 },
        });
      }
    }
  };

  const orderAllCartProducts = async () => {
    const token = getToken();

    const response = await axios.post(
      "/cart/order",
      {},
      {
        headers: {
          accept: "application/json",
          Authorization: "Token " + token,
        },
      }
    );
    return response.data
  };
  return {
    getCartProducts,
    addProductToCart,
    deleteCartProduct,
    orderAllCartProducts,
  };
};

export default useCartAPi;
