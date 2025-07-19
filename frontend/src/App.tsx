import { useAuth } from "./hooks/useAuth";
import { LoginScreen } from "./screens/LoginScreen";

function App() {
  const { isAuthenticated } = useAuth();

  return <div>{isAuthenticated ? <p>Dashboard</p> : <LoginScreen />}</div>;
}

export default App;
