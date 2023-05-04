import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, Typography } from '@mui/material';
import DashboardTemplate from '../components/DashboardTemplate';
import AllRoutes from "../routes";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const theme = createTheme({
  palette: {
    primary: {
      main: "#F5EA09"
    },
    secondary: {
      main: "#494c7d"
    }
  }
});

function App() {
  const {state, dispatch} = useContext(AuthContext);
  const [load,setLoad] = useState(true);
  const onSuccess = (response)=>{
    console.log("response");
    instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("access")}`;
    dispatch({
        type:"LOGIN_SUCCESS",
        payload:{
            user:response.data.data,
            access:localStorage.getItem("access"),
            isAuthenticated:true
        }
    });
    setLoad(false);
  }
  useEffect(()=>{
    if(localStorage.getItem("access")){
      console.log(localStorage.getItem("access"))
      instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("access")}`;
      getUser(onSuccess,setLoad);
    }
  },[])

  return (
      !load && 
      <ThemeProvider theme={theme}>
        <Grid container>
          <DashboardTemplate>
            <AllRoutes/>
          </DashboardTemplate>
        </Grid>
      </ThemeProvider>
  );
}

export default App;
