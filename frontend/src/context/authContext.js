import React, { useContext, createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { authenticate } from "../utils/apiClient";
import { loginApi, logout } from "../utils/apiClient";

import Splash from "../components/Splash";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (email, password) => {
    try {
      const { data } = await loginApi(email, password);
      console.log(data, "user");
      setCurrentUser(data);
    } catch (e) {
      setLoading(false);
      return e.message;
    }
  };
  const userLogout = async () => {
    try {
      window.localStorage.removeItem("AuthProvider");
      logout();
      console.log("logout");
      setCurrentUser(null);
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    const data = window.localStorage.getItem("AuthProvider")
      ? JSON.parse(window.localStorage.getItem("AuthProvider"))
      : null;

    if (!!data && !!!currentUser) {
      setCurrentUser(data);
      setLoading(false);
    }
  }, [currentUser]);

  const value = {
    currentUser,
    loginUser,
    userLogout,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading ? <Splash /> : children}
    </AuthContext.Provider>
  );
}

export function useAuthUser() {
  return useContext(AuthContext);
}
