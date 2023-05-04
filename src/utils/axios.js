import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api"
});

// interceptor for http
instance.interceptors.response.use(
  (response) => {
    if (response.data.success) {
      return response;
    } else {
      console.log(response.data.message);
      toast.error(response.data.message);
      return response;
    }
  },
  (error) =>{
    console.log(error);
    toast.error("Network Error.");
    return Promise.reject((error.response && error.response.data) || "Wrong Services");
  }
);

export default instance;