import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import SideNav from "../SideNav";
import { Grid } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const DashboardTemplate = ({children})=>{
    const {state, dispatch} = useContext(AuthContext);

    return(
        <>
            <Header/>
            <Grid container sx={{overflow:"auto", height:"100vh"}}>
                {state?.isAuthenticated &&
                <Grid item>
                    <SideNav/>
                </Grid>}
                    {children}
            </Grid>
            <Footer/>
        </>
    )
}

export default DashboardTemplate;