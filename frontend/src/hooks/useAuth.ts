import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    return new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
