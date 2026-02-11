import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiBell, FiPlus, FiChevronDown, FiInfo, FiTrash2 } from "react-icons/fi";
import { getNotificationsAPI, markNotificationReadAPI, clearNotificationsAPI } from "../services/AllAPI";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [notifications, setNotifications] = React.useState([]);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [unreadCount, setUnreadCount] = React.useState(0);

  const role = user?.role?.toLowerCase();
  const isAdmin = role === "admin";
  const isAgent = role === "agent";
  const isUser = role === "user";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  /* ================= NOTIFICATIONS LOGIC ================= */
  React.useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); // Poll every 5s for better responsiveness
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await getNotificationsAPI({ Authorization: `Bearer ${token}` });
      if (res.status === 200) {
        setNotifications(res.data);
        setUnreadCount(res.data.filter(n => !n.isRead).length);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const markRead = async (id, ticketId) => {
    const token = localStorage.getItem("token");
    try {
      await markNotificationReadAPI(id, { Authorization: `Bearer ${token}` });
      fetchNotifications();
      if (ticketId) {
        // Navigate to ticket based on role
        if (isAdmin) navigate(`/admin/tickets`); // Or specific details if possible
        else if (isAgent) navigate(`/agent/tickets/details/${ticketId}`);
        else navigate(`/ticket/${ticketId}`);
        setShowNotifications(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const clearAll = async () => {
    const token = localStorage.getItem("token");
    try {
      await clearNotificationsAPI({ Authorization: `Bearer ${token}` });
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
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
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${isActive(link.path)
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
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-300 hover:bg-[#2a4a5e] rounded-md transition-colors"
            >
              <FiBell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[70] overflow-hidden animate-slideUp">
                <div className="px-5 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                  <button
                    onClick={clearAll}
                    className="text-[10px] font-bold text-gray-400 hover:text-rose-500 uppercase tracking-wider"
                  >
                    Clear All
                  </button>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-5 py-10 text-center">
                      <FiInfo className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 italic">No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n._id}
                        onClick={() => markRead(n._id, n.ticketId)}
                        className={`px-5 py-4 border-b border-gray-50 cursor-pointer hover:bg-teal-50/30 transition-colors relative ${!n.isRead ? "bg-teal-50/10" : ""}`}
                      >
                        {!n.isRead && (
                          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                        )}
                        <p className={`text-xs ${!n.isRead ? "text-gray-900 font-bold" : "text-gray-600"}`}>
                          {n.message}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

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
