import axios from "../utils/axios";
import { toast } from "react-toastify";

export const createCompany = (data, onSuccess)=>{
    axios.post('/create-company/',data)
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

export const getCompanies = (setCompanies)=>{
    axios.get("/get-companies/")
    .then((response)=>{
      console.log(response.data);
      setCompanies(response.data.data);
    })
    .catch((response)=>{
      console.log(response);
      toast.error(response.message);
    })
}