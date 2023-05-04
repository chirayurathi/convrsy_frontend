import React, {lazy} from "react";
import { Routes, Route } from "react-router-dom";

// routes
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { Dashboard } from "@mui/icons-material";
//-----------------------|| ROUTING RENDER ||-----------------------//

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
};

export default AllRoutes;