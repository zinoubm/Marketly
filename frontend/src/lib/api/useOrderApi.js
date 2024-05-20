import axios from "./axios";
import FormData from "form-data";
import { toast } from "sonner";
import useCookie from "./useCookie";

import useProductApi from "./useProductApi";
const useOrderApi = () => {
  const { getToken } = useCookie();
  //! this code should be done on the server !!!!

  const { getSingleProduct } = useProductApi();
  const getBuyerOrders = async () => {
    const token = getToken();

    const response = await axios.get("/orders/buyer", {
      headers: {
        accept: "application/json",
        Authorization: "Token " + token,
      },
    });

    const data = response.data;
    const Mydata = await Promise.all(
      data.map(async (order) => {
        const prod = await getSingleProduct(order.product);
        order.product = prod.title;
        return order;
      })
    );

    return Mydata;
  };

  const getSellerOrders = async () => {
    const token = getToken();

    const response = await axios.get("/orders/seller", {
      headers: {
        accept: "application/json",
        Authorization: "Token " + token,
      },
    });
    const data = response.data;
    const Mydata = await Promise.all(
      data.map(async (order) => {
        const prod = await getSingleProduct(order.product);
        order.product = prod.title;
        return order;
      })
    );
    
    return Mydata;
  };
  const updateOrderStatus = async (id, status) => {
    const token = getToken();
    try {
      
      const response = await axios.patch(
        `http://localhost:8000/api/orders/status/${id}/`,
        
        {
      status,
      },
      {
        headers: {
          'accept': 'application/json',
          'Authorization': 'Token '+token,
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': '2jZ5TO8BDfALuK42vala79FJpzg6FxG2eTlOS4Poz8n6rQh8roWu9xthvYjEaq2i'
        }
      }
    );
    toast.success("updated ")
    const data = response.data;
    return data
  } catch (error) {

    toast.error('error')
    console.log(error);
  }
  }
  
  return { getBuyerOrders, getSellerOrders  , updateOrderStatus};
};
export default useOrderApi;


