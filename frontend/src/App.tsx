import { useAuth } from "./hooks/useAuth";
import { Dashboard } from "./screens/Dashboard";
import { LoginScreen } from "./screens/LoginScreen";

function App() {
  const { isAuthenticated } = useAuth();

  return <div>{isAuthenticated ? <Dashboard /> : <LoginScreen />}</div>;
}

export default App;
