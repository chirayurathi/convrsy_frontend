import React from "react";

import { AuthProvider } from "./AuthContext";


const AppContextProvider = ({ children }) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  );
};

export default AppContextProvider;