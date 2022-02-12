import React from "react";
import { useAuthUser } from "./context/authContext";
import AuthApp from "./app/AuthApp";
import UnAuthApp from "./app/UnAuthApp";

function App() {
  const { currentUser } = useAuthUser();
  if (!!!currentUser) {
    console.log("UnAuthApp");
    return <UnAuthApp />;
  } else {
    console.log("AuthApp");
    return <AuthApp />;
  }
}

export default App;
