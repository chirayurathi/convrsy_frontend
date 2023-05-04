import { Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Dashboard = ()=>{
    const {state, dispatch} = useContext(AuthContext);
    return(
        <Typography> Logged in as {state.user.first_name}</Typography>
    );
}

export default Dashboard;