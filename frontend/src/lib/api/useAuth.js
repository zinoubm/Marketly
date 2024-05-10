import axios from "./axios";
import useCookie from "./useCookie";
import FormData from "form-data"
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
        //todo fix this when they update the server
        signIn({email:user.email , password: user.password1})
      }
    } catch (error) {
      if (error.response.data.non_field_errors) {
      toast.error(error.response.data.non_field_errors[0]);
        
      }else if(error.response.data.email){

        toast.error(error.response.data.email);
      }else{
        toast.error(error.response.data.password1);
      }
      console.log(error);
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
      if (err.response.status ===401) return null;

      console.log("Something went wrong!", err);
      // if (err.response.status === 401) navigate("/sign-in");

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


  const updateUserInfo=async (user)=>{
    //! this function sends the request in a multipart/form-data 
    const form = new FormData();
    for(let key in user){
      form.set(key , user[key])
    }
      
    const token = getToken();
    try{

      const response = await axios.patch(
        '/auth/user/',
        form,
        {
          headers: {
            Authorization: "Token " + token,
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'X-CSRFTOKEN': 'JyrG5RuoxfXcbuMSiOtLYHeszliqZ8Y5eeBIIopWG75r9yHUGbPfohOtanhfU9PQ'
          }
        }
      );
      
      if(response.status ===200) toast.success("updated your information" )
      return response.data
  }catch(err){
   toast.error("error")
    console.log(err);
    }
  }
  



  return {
    signUp,
    signIn,
    getCurrentUser,
    googleSignIn,
    updateUserInfo
  };
};

export default useAuth;
