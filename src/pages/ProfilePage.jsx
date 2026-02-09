import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiSave, FiRefreshCcw, FiShield } from "react-icons/fi";
import Navbar from '../components/Navbar';

function ProfilePage() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = loggedInUser.role?.toLowerCase() === "admin";

  const [user, setUser] = useState({
    name: loggedInUser.name || "User",
    email: loggedInUser.email || "user@example.com",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    alert(`Profile updated successfully!`);
  };

  const handleReset = () => {
    setUser({
      name: loggedInUser.name || "User",
      email: loggedInUser.email || "user@example.com",
      password: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Account Settings</h1>
            <p className="text-gray-500 mt-2 font-medium">Manage your professional identity and security preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Avatar & Role */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 text-center flex flex-col items-center">
                <div className="relative group">
                  <div className="w-32 h-32 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-teal-500/20 mb-6 transition-transform group-hover:scale-105">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-100 text-teal-600">
                    <FiShield className="w-5 h-5" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 truncate w-full px-2">{user.name}</h2>
                <div className={`mt-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${isAdmin ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-teal-50 text-teal-600 border border-teal-100'
                  }`}>
                  {isAdmin ? 'System Administrator' : 'Support Desk User'}
                </div>
                <p className="text-gray-400 text-sm mt-4 font-medium italic">Internal Workforce ID: #USR-{Math.floor(1000 + Math.random() * 9000)}</p>
              </div>

              <div className="bg-[#1e3a4c] rounded-3xl p-8 text-white shadow-xl shadow-gray-200 overflow-hidden relative">
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl"></div>
                <h3 className="text-sm font-bold text-teal-400 uppercase tracking-widest mb-4">Security Notice</h3>
                <p className="text-sm text-gray-300 leading-relaxed font-medium">
                  Authentication keys expire every 24 hours. Ensure your backup email is verified for recovery.
                </p>
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8 lg:p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                      <div className="relative group">
                        <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                          className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all font-semibold text-gray-800"
                          placeholder="Full Name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                      <div className="relative group">
                        <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all font-semibold text-gray-800"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Security Credentials</label>
                    <div className="relative group">
                      <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all font-semibold text-gray-800"
                        placeholder="••••••••••••"
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 italic px-1">Leave field blank if you do not wish to refresh your password</p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={handleReset}
                    className="flex items-center space-x-2 px-6 py-3 text-gray-500 hover:text-gray-900 font-bold transition-all active:scale-95"
                  >
                    <FiRefreshCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-2xl font-bold shadow-lg shadow-teal-500/20 transition-all active:scale-95"
                  >
                    <FiSave className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
