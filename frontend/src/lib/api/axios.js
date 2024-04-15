import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL + "/api";

export default axios.create({
  baseURL: BASE_URL,
});
