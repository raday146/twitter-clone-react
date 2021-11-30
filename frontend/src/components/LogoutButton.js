import React from "react";
import { useAuthUser } from "../context/authContext";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LogoutButton = () => {
  const { userLogout } = useAuthUser();
  return (
    <button
      onClick={userLogout}
      className="btn btn-outline-primary rounded-pill px-2 py-1 m-2"
    >
      <FontAwesomeIcon size="lg" icon={faSignOutAlt} />
    </button>
  );
};
export default LogoutButton;
