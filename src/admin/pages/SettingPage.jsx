import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import StatusComponent from "../components/StatusComponent";
import PriorityComponent from "../components/PriorityComponent";
import CategoryComponent from "../components/CategoryComponent";

function SettingPage() {
  const [activeTab, setActiveTab] = useState("status");

  const renderTab = () => {
    if (activeTab === "status") return <StatusComponent />;
    if (activeTab === "priority") return <PriorityComponent />;
    if (activeTab === "category") return <CategoryComponent />;
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          {["status", "priority", "category"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t-lg border-b-2 ${
                activeTab === tab
                  ? "border-blue-500 font-bold text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Render the active tab component */}
        {renderTab()}
      </div>
    </div>
  );
}

export default SettingPage;
