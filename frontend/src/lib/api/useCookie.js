import { useCookies } from "react-cookie";

function useCookie() {
  const [cookies, setCookie] = useCookies(["token"]);

  const getToken = () => {
    if (cookies.token === "null") {
      return null;
    }

    return cookies.token;
  };
  const setToken = (token) => {
    setCookie("token", token, { path: "/" });
  };
  const deleteToken = () => {
    setCookie("token", null, { path: "/" });
  };

  const isAuthenticated = () => {
    if (cookies.token === "null" || cookies.token === "") {
      return false;
    }

    return true;
  };

  return {
    getToken,
    setToken,
    deleteToken,
    isAuthenticated,
  };
}

export default useCookie;
