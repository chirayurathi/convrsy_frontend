import React, {lazy} from "react";
import { Routes, Route } from "react-router-dom";

// routes
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from '../pages/Dashboard'; 
import Profile from '../pages/Profile'; 
import AuthGuard from "../hoc/AuthGuard";
//-----------------------|| ROUTING RENDER ||-----------------------//

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/dashboard" element={<AuthGuard><Dashboard/></AuthGuard>} />
        <Route path="/profile" element={<AuthGuard><Profile/></AuthGuard>} />
    </Routes>
  );
};

export default AllRoutes;