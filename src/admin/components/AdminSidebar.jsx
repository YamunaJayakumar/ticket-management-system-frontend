import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiSettings,
  FiCheckSquare,
  FiLogOut,
} from "react-icons/fi";

function AdminSidebar() {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiHome /> },
    { name: "Tickets", path: "/admin/tickets", icon: <FiFileText /> },
    { name: "Agents", path: "/admin/agents", icon: <FiUsers /> },
    { name: "Settings", path: "/admin/settings", icon: <FiSettings /> },
    { name: "Assign Tickets", path: "/admin/assign", icon: <FiCheckSquare /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-md flex flex-col">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold text-blue-600 border-b">
        Admin Panel
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-100 transition ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-4 py-2 rounded text-red-500 hover:bg-red-100 w-full">
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
