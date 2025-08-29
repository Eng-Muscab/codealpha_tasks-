import { LogOut } from "lucide-react";
import { useContext } from "react";
import { CustomToastContext } from "../components/ToastProvider.jsx";

export default function Navbar({ user, onLogout }) {
  const { showToast } = useContext(CustomToastContext);

  const handleLogout = () => {
    onLogout();
    showToast("Logged out successfully!", "success");
  };

  return (
    <div className="flex justify-between items-center bg-white shadow p-4">
      <h1 className="text-xl font-bold">Welcome, {user?.name || "Admin"}</h1>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
}
