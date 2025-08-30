import { useEffect, useState } from "react";
import { api } from "../../services/ApiService";
import type { User } from "../../type/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.getMe();
        setUser(response.user);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    await api.login(username, password);

    const me = await api.getMe();

    setUser(me);
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
