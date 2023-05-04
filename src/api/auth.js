import axios from "../utils/axios";
import { toast } from "react-toastify";

export const signup = (data, onSuccess)=>{
    axios.post('/signup/',data)
    .then((response)=>{
        console.log(response);
        if(response.data.success){
            onSuccess(response);
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
};