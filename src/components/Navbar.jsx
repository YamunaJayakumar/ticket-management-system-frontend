import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiBell, FiPlus, FiChevronDown } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const role = user?.role?.toLowerCase();
  const isAdmin = role === "admin";
  const isAgent = role === "agent";
  const isUser = role === "user";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  /* ================= ROLE-BASED NAV LINKS ================= */

  const navLinks = isAdmin
    ? [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Ticket Console", path: "/admin/tickets" },
        { name: "Workforce Dispatch", path: "/admin/assign" },
      ]
    : isAgent
    ? [
        { name: "Dashboard", path: "/agent/dashboard" },
        { name: "My Tickets", path: "/agent/tickets" },
      ]
    : [
        { name: "Dashboard", path: "/dashboard" },
        { name: "My Tickets", path: "/ticket/list" },
        { name: "Profile", path: "/profile" },
      ];

  const homePath = isAdmin
    ? "/admin/dashboard"
    : isAgent
    ? "/agent/dashboard"
    : "/dashboard";

  const roleLabel = isAdmin
    ? "Administrator"
    : isAgent
    ? "Support Agent"
    : "User Account";

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#1e3a4c] shadow-lg sticky top-0 z-50">
      <div className="px-6 py-3 flex items-center justify-between">

        {/* ================= LEFT ================= */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate(homePath)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="text-white font-bold text-lg">TnRDesk</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive(link.path)
                    ? "bg-[#2a4a5e] text-white"
                    : "text-gray-300 hover:bg-[#2a4a5e] hover:text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center space-x-4">

          {/* Create Ticket – ONLY USER */}
          {isUser && (
            <button
              onClick={() => navigate("/ticket/create")}
              className="hidden md:flex items-center space-x-1 px-3 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md text-sm"
            >
              <FiPlus />
              <span>New Ticket</span>
            </button>
          )}

          {/* Search */}
          <div className="relative hidden lg:block">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-[#2a4a5e] text-white rounded-md text-sm focus:outline-none"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-300 hover:bg-[#2a4a5e] rounded-md">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="relative group border-l border-[#2a4a5e] pl-4 ml-2">
  {/* Trigger */}
  <div
    className="
      flex items-center space-x-3 cursor-pointer
      py-1 px-2 rounded-md
      transition-all duration-200
      hover:bg-[#2a4a5e]
    "
  >
    <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
      {user?.name?.charAt(0)?.toUpperCase() || "U"}
    </div>

    <div className="hidden sm:block text-left">
      <p className="text-xs font-semibold text-white leading-none">
        {user?.name || "User"}
      </p>
      <p className="text-gray-400 text-[10px] mt-1">
        {roleLabel}
      </p>
    </div>

    <FiChevronDown className="w-3 h-3 text-gray-400 transition group-hover:text-white" />
  </div>

  {/* Dropdown – SAME AS BEFORE */}
  <div
    className="
      absolute right-0 mt-2 w-48
      bg-white rounded-xl shadow-xl
      border border-gray-100 py-2
      opacity-0 invisible
      group-hover:opacity-100 group-hover:visible
      transition-all duration-200
      transform translate-y-2 group-hover:translate-y-0
      z-[60]
    "
  >
    {isAdmin && (
      <>
        <button
          onClick={() => navigate('/admin/settings')}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition"
        >
          Settings
        </button>
        <div className="border-t border-gray-100 my-1" />
      </>
    )}

    <button
      onClick={() => navigate(homePath)}
      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition"
    >
      Dashboard
    </button>

    <div className="border-t border-gray-100 my-1" />

    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition font-medium"
    >
      Logout
    </button>
  </div>
</div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
