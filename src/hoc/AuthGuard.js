import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const AuthGuard = ({ children }) => {
    const {state, dispatch} = useContext(AuthContext);
    console.log(state);
    return state.isAuthenticated ? children : <Navigate to="/login" />;
  }

export default AuthGuard;


