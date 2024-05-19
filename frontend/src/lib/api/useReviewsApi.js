import useCookie from "./useCookie";
import axios from "./axios";
import { toast } from "sonner";
const useReviewsApi = () => {
  const { getToken } = useCookie();

  const addReview = async ({product , details, rating}) => {
    const token = getToken();

    const response = await axios.post("/reviews/",{
        product , details , rating
    }, {
        headers: {
          accept: "application/json",
          Authorization: "Token " + token,
        },
      } );
      if(response.status==201){
        toast.success('your review has been added')
      }
      return response.data;
    
  
  };

  return { addReview };
};
export default useReviewsApi;
