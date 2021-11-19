import "./App.css";
import { useAutUser } from "./context/AuthContext";
import UnAuthApp from "./auth/UnAuthApp";
import AuthApp from "./auth/AuthApp";

function App() {
  const authUser = useAutUser();
  if (authUser) {
    return <AuthApp />;
  } else {
    return <UnAuthApp />;
  }
}

export default App;
