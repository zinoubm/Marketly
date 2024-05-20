import useCookie from "./useCookie";
import axios from "./axios";
import { toast } from "sonner";
const useReviewsApi = () => {
  const { getToken } = useCookie();
  // const getReviews = async () => {
  //   const token = getToken();
  //   const response = await axios.get("/reviews/?product=101" , {
  //     headers:{
  //       accept: "application/json",
  //       Authorization: "Token " + token,

  //     }
  //   })
    
  // };
  const addReview = async ({ product, details, rating }) => {
    const token = getToken();
    try{

      const response = await axios.post(
        "/reviews/",
        {
        product,
        details,
        rating,
      },
      {
        headers: {
          accept: "application/json",
          Authorization: "Token " + token,
        },
      }
    );
    if (response.status == 201) {
      toast.success("your review has been added");
    }
    return response.data;
  }catch(e){  

    toast.error("you must login to add review ")
  }
    
    
  };

  return { addReview  };
};
export default useReviewsApi;
