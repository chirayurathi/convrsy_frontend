import React from "react";

import { AuthProvider } from "./AuthContext";
import { ProSidebarProvider } from "react-pro-sidebar";


const AppContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ProSidebarProvider>
        {children}
      </ProSidebarProvider>
    </AuthProvider>
  );
};

export default AppContextProvider;