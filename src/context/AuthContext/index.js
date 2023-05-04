import { createContext, useReducer } from "react";
import authReducer from "./authReducer";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
