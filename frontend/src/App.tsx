import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAuthenticated } = useAuth();

  return <div>{isAuthenticated ? <p>Dashboard</p> : <p>LoginScreen</p>}</div>;
}

export default App;
