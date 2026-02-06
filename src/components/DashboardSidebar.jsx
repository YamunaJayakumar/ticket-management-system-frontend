import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiHome, FiClipboard, FiUser, FiPlusSquare } from "react-icons/fi"; // FiClipboard replaces FiTicket

function DashboardSidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Tickets", icon: <FiClipboard />, path: "/ticket/list" }, // Updated icon
    { name: "Create Ticket", icon: <FiPlusSquare />, path: "/ticket/create" },
    { name: "Profile", icon: <FiUser />, path: "/profile" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col shadow-lg">
      {/* App Title */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-center text-blue-400">TicketTool</h1>
      </div>

      {/* User Info + Logout */}
      {user && (
        <div className="p-6 border-b border-gray-700 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2 text-xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-400 capitalize">{user.role}</p>
          <button
            onClick={handleLogout}
            className="mt-3 flex items-center gap-2 text-red-400 hover:text-red-500 transition-colors"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-4 gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 hover:text-blue-400 transition-colors"
          >
            {item.icon} <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default DashboardSidebar;
