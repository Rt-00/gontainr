import { useState } from "react";
import { api } from "../../services/ApiService";
import type { User } from "../../type/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = async (username: string, password: string) => {
    const response = await api.login(username, password);

    setUser(response.user);
    setToken(response.token);

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
