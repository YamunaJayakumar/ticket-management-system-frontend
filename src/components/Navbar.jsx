import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiBell, FiPlus, FiChevronDown } from "react-icons/fi";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isAdmin = user.role?.toLowerCase() === "admin";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const navLinks = isAdmin
        ? [
            { name: "Dashboard", path: "/admin/dashboard" },
            { name: "Ticket Console", path: "/admin/tickets" },
            { name: "Workforce Dispatch", path: "/admin/assign" },
        ]
        : [
            { name: "Dashboard", path: "/dashboard" },
            { name: "My Tickets", path: "/ticket/list" },
            { name: "Profile", path: "/profile" },
        ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-[#1e3a4c] shadow-lg sticky top-0 z-50">
            <div className="px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Left Side - Logo & Nav */}
                    <div className="flex items-center space-x-8">
                        {/* Logo */}
                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => navigate(isAdmin ? "/admin/dashboard" : "/dashboard")}
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-white font-bold text-lg">TnRDesk</span>
                        </div>

                        {/* Nav Links */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => navigate(link.path)}
                                    className={`px-3 py-2 rounded-md transition text-sm font-medium ${isActive(link.path)
                                        ? "text-white bg-[#2a4a5e]"
                                        : "text-gray-300 hover:text-white hover:bg-[#2a4a5e]"
                                        }`}
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Search, Notifications, User */}
                    <div className="flex items-center space-x-4">
                        {/* Create New Button */}
                        {!isAdmin && (
                            <button
                                onClick={() => navigate("/ticket/create")}
                                className={`hidden md:flex items-center space-x-1 px-3 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition text-sm font-medium ${isActive("/ticket/create") ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={isActive("/ticket/create")}
                            >
                                <FiPlus className="w-4 h-4" />
                                <span>New Ticket</span>
                            </button>
                        )}

                        {/* Search (Typically for Admin or general use) */}
                        <div className="relative hidden lg:block">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 bg-[#2a4a5e] text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm w-48 lg:w-64"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 text-gray-300 hover:text-white hover:bg-[#2a4a5e] rounded-md transition">
                            <FiBell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User Profile Dropdown */}
                        <div className="relative group border-l border-[#2a4a5e] pl-4 ml-2">
                            <div className="flex items-center space-x-3 cursor-pointer py-1">
                                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-xs font-semibold text-white leading-none">{user?.name || "User"}</p>
                                    <p className="text-gray-400 text-[10px] mt-1">{isAdmin ? "Administrator" : "User Account"}</p>
                                </div>
                                <FiChevronDown className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
                            </div>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 mt-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-[60] transform translate-y-2 group-hover:translate-y-0">
                                {isAdmin && (
                                    <>
                                        <button
                                            onClick={() => navigate("/admin/settings")}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center space-x-2 transition"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>Settings</span>
                                        </button>
                                        <div className="border-t border-gray-100 my-1"></div>
                                    </>
                                )}
                                <button
                                    onClick={() => navigate(isAdmin ? "/admin/dashboard" : "/dashboard")}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center space-x-2 transition"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span>Dashboard</span>
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center space-x-2 transition font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
