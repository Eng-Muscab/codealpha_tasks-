import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  List,
  CreditCard,
  Table,
  Calendar,
  Box,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import Navbar from "./Navbar.jsx";
import { useState } from "react";

export default function SidebarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/", icon: <Home size={20} /> },
    { name: "Menu", path: "/menu", icon: <List size={20} /> },
    { name: "Orders", path: "/orders", icon: <CreditCard size={20} /> },
    { name: "Tables", path: "/tables", icon: <Table size={20} /> },
    {
      name: "Reservations",
      path: "/reservations",
      icon: <Calendar size={20} />,
    },
    { name: "Inventory", path: "/inventory", icon: <Box size={20} /> },
  ];

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <aside
        className={`bg-gray-800 text-white p-4 flex flex-col fixed md:static h-full z-20 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 w-64`}
      >
        <div className="flex justify-between items-center md:hidden mb-4">
          <span className="font-bold text-xl">Admin</span>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-2 mt-4 md:mt-0">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon} <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <Navbar user={{ name: "Admin" }} onLogout={handleLogout} />
        <div className="md:hidden p-2 bg-gray-100">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-gray-800 text-white rounded"
          >
            <MenuIcon size={20} />
          </button>
        </div>
        <main className="flex-1 bg-gray-100 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
