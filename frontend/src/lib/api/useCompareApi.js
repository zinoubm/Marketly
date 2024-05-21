import useCookie from "./useCookie";
import axios from "./axios";
import { toast } from "sonner";
const useCompareApi = () => {
  const { getToken } = useCookie();

  const getCompareLists = async () => {
    const token = getToken();
    try {
      const response = await axios.get("/compare-lists", {
        headers: {
          accept: "application/json",
          Authorization: "Token " + token,
        },
      });

      return response.data;
    } catch (error) {
      return null;
    }
  };
  const createCompareList = async (title) => {
    const token = getToken();

    try {
      const response = await axios.post(
        "/compare-lists/",
        {
          title: title,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: "Token " + token,
          },
        }
      );
      toast.success(" your list has been created ");
      return response.data;
    } catch (error) {
      toast.error("you must enter a title ")
      return null;
    }
  };

  const addProductToCompareList = async (compareList, product) => {
    const token = getToken();
    try {
      const response = await axios.post(
        "/compare-items/",
        {
          compare_list: compareList,
          product,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: "Token " + token,
          },
        }
      );
      toast.success("product added to list")
      return response.data;
    } catch (error) {
      return null;
    }
  };

  return { getCompareLists, createCompareList, addProductToCompareList };
};
export default useCompareApi;
