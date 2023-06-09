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
const themeTemplate = {
  palette: {
    primary: {
      main: "#F5EA09"
    },
    secondary: {
      main: "#494c7d"
    }
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight:"500",
        },
      },
    },
  },
};

function App() {
  const {state, dispatch} = useContext(AuthContext);
  const [load,setLoad] = useState(true);
  const [theme, setTheme] = useState(themeTemplate);
  useEffect(()=>{
    if(state?.user?.company?.color){
      console.log("changed");
      let _theme = {
        ...theme,
        palette:{
          ...theme.palette,
          primary:{
            ...theme.palette.primary,
            main:state.user.company.color
          }
        }
      }
      setTheme(_theme);
    }
    else{
      setTheme(themeTemplate);
    }
  },[state.user])
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
    else{
      setLoad(false);
    }
  },[])

  return (
      !load && 
      <ThemeProvider theme={createTheme(theme)}>
        <Grid container>
          <DashboardTemplate>
            <AllRoutes/>
          </DashboardTemplate>
        </Grid>
      </ThemeProvider>
  );
}

export default App;
