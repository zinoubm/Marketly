import { useGoogleOneTapLogin } from "@react-oauth/google";
import useAuth from "@/lib/api/useAuth";

function GoogleOneTapLogin() {
const {googleSignIn}=useAuth()
    useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      googleSignIn(credentialResponse.credential);
    },
    onError: () => {
      toast.error("Something Went Wrong, Please Try Again!");
    },
  });

  return null;
}

export default GoogleOneTapLogin;
