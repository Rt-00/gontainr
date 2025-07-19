import { Container, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Container className="h-8 w-8 text-blue-500" />
          <h1 className="text-xl font-bold text-white">Container Manager</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-300">Welcome, {user?.username}</span>
          <button
            onClick={logout}
            className="bg-red-700 hover:bg-red-800 text-white px-2 rounded-md cursor-pointer
            flex items-center gap-2 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
