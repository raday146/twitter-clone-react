import "./App.css";
import { useAuthUser } from "./context/authContext";
import AuthApp from "./app/AuthApp";
import UnAuthApp from "./app/UnAuthApp";

function App() {
  const auth = useAuthUser();
  if (!!auth) {
    return <UnAuthApp />;
  } else {
    return <AuthApp />;
  }
}

export default App;
