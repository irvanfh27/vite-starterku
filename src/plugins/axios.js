import axios from "redaxios";
import Cookies from "js-cookie";

const token = Cookies.get("authToken") ?? false;
const http = axios;

http.defaults.baseURL = import.meta.env.VITE_API_URL;
http.defaults.headers = {
  Accept: "application/json",
};

if (token) {
  http.defaults.headers = {
    Authorization: "Bearer " + token,
    Accept: "application/json",
  };
}

export default http;
