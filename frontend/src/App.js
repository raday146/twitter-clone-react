import logo from "./logo.svg";
import "./App.css";
import { useAuthUser } from "./context/authContext";
import AuthApp from "./app/AuthApp";
import UnAuthApp from "./app/UnAuthApp";

function App() {
  const auth = useAuthUser();
  if (auth) {
    return <AuthApp />;
  } else {
    return <UnAuthApp />;
  }
}

export default App;
