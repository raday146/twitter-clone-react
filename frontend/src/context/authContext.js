import React from "react";
import { useQuery } from "react-query";
import { authenticate } from "../utils/apiClient";
import Splash from "../components/Splash";
const AuthContext = React.createContext(null);
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
export function useAuthUser() {}
