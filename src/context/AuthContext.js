import React from "react";
import { useQuery } from "react-query";
import Splash from "../components/Splash";
import { authenticate } from "../utils/ApiClient";

const AuthContext = React.createContext(null);
export function AuthProvider({ children }) {
  const { data, loading } = useQuery("AuthProvider", authenticate);
  if (loading) {
    console.log("splash on!");
    return <Splash />;
  }
  const authUser = data || null;

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
}

export function useAutUser() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthUser must be used within AuthProvider component!",
      403
    );
  }
  return context;
}
