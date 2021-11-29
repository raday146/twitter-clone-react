import React from "react";
import { useAuthUser } from "../context/authContext";

const LogoutButton = () => {
  const { userLogout } = useAuthUser();
  return (
    <button
      onClick={userLogout}
      className="btn btn-outline-primary rounded-pill px-2 py-1 mr-2 font-weight-bold"
    >
      Logout
    </button>
  );
};
export default LogoutButton;
