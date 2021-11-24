import React, { useContext, createContext } from "react";
import { useQuery } from "react-query";
import { authenticate } from "../utils/apiClient";
import Splash from "../components/Splash";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data, loadding } = useQuery("AuthProvider", authenticate);

  if (loadding) {
    return <Splash />;
  }
  const authUser = data || null;

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
}

export function useAuthUser() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuthUser must be used within the AuthProvider component"
    );
  }
  return context;
}
