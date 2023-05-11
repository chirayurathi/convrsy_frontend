import axios from "../utils/axios";
import { toast } from "react-toastify";

export const createForm = (data, onSuccess)=>{
    axios.post('/create-form/',data)
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

export const getUserForms = (setForms)=>{
    axios.get("/get-user-forms/")
    .then((response)=>{
      console.log(response.data);
      setForms(response.data.data || []);
    })
    .catch((response)=>{
      console.log(response);
      toast.error(response.message);
    })
}

export const getFormByID = (id, setFormData)=>{
    axios.get(`/form/${id}/`)
    .then((response)=>{
      console.log(response.data);
      setFormData(response.data.data);
    })
    .catch((response)=>{
      console.log(response);
      toast.error(response.message);
    })
}