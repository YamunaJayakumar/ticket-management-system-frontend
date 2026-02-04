import React, { useState } from 'react'
import DashboardSidebar from '../components/DashboardSidebar';

function ProfilePage() {
  // Static data for UI
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    alert(`Profile Updated!\nName: ${user.name}\nEmail: ${user.email}`);
  };

  const handleReset = () => {
    setUser({ name: "John Doe", email: "john@example.com", password: "" });
  };

  return (
     <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSidebar />
        <div className="flex-1 p-6">
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
              <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        
                {/* Header */}
                <h1 className="text-2xl font-bold text-gray-800 text-center">My Profile</h1>
        
                {/* Name */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
        
                {/* Email */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
        
                {/* Password */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">New Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="border rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
        
                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
        
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage