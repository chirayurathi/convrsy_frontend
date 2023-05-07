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

export const login = (data, onSuccess)=>{
    axios.defaults.headers.common.Authorization = null;
    axios.post('/login/',data)
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

export const getUser = (onSuccess,setLoad) =>{
    axios.get('/get-user/')
    .then((response)=>{
        if(response.data.success){
            onSuccess(response);
        }
        else{
            console.log("err");
            localStorage.removeItem("access");
            axios.defaults.headers.common.Authorization = null;
            setLoad(false);
        }
    })
    .catch((error)=>{
        console.log(error);
        setLoad(false);
    })
}

export const updateUser = (data, onSuccess)=>{
    axios.put('/update-user/',data)
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