import { useEffect, useState } from "react";
import { api } from "../../services/ApiService";
import type { User } from "../../type/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    const response = await api.login(username, password);

    setUser(response.user);
    setToken(response.token);

    localStorage.setItem("token", response.token);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
