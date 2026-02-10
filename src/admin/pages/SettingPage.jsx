import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import StatusComponent from "../components/StatusComponent";
import PriorityComponent from "../components/PriorityComponent";
import SpecializationComponent from "../components/SpecializationComponent";
import AgentsComponent from "../components/AgentsComponent";
import TeamComponent from "../components/TeamComponent";
import CategoryComponent from "../components/CategoryComponent";
import UserManagementComponent from "../components/UserManagementComponent";
import { FiSettings, FiCheckCircle, FiActivity, FiZap, FiChevronRight, FiUsers, FiLayers, FiGrid } from "react-icons/fi";

function SettingPage() {
  const [activeTab, setActiveTab] = useState("agents");

  const tabs = [
    { id: "agents", label: "Agent Management", icon: <FiUsers />, description: "Configure and manage support roster" },
    { id: "teams", label: "Team Management", icon: <FiLayers />, description: "Organize agents into functional units" },
    { id: "categories", label: "Category Management", icon: <FiGrid />, description: "Define ticket classification types" },
    { id: "users", label: "User Management", icon: <FiUsers />, description: "Global participant directory" },
    { id: "status", label: "Status Management", icon: <FiCheckCircle />, description: "Configure ticket lifecycle states" },
    { id: "priority", label: "Priority Levels", icon: <FiActivity />, description: "Manage incident urgency tiers" },
    { id: "specializations", label: "Agent Specializations", icon: <FiZap />, description: "Define expert domain expertise" },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "agents": return <AgentsComponent />;
      case "teams": return <TeamComponent />;
      case "categories": return <CategoryComponent />;
      case "users": return <UserManagementComponent />;
      case "status": return <StatusComponent />;
      case "priority": return <PriorityComponent />;
      case "specializations": return <SpecializationComponent />;
      default: return <AgentsComponent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        {/* Settings Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col pt-8">
          <div className="px-6 mb-8">
            <h1 className="text-xl font-bold text-gray-900 flex items-center">
              <FiSettings className="mr-3 text-teal-600" /> Settings
            </h1>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Global Configuration</p>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-start p-4 rounded-2xl transition-all duration-200 group ${activeTab === tab.id
                  ? "bg-[#1e3a4c] text-white shadow-lg shadow-teal-900/10 active:scale-[0.98]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <div className={`p-2 rounded-xl mr-4 ${activeTab === tab.id ? "bg-teal-500/20 text-teal-400" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-500"}`}>
                  {React.cloneElement(tab.icon, { className: "w-5 h-5" })}
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{tab.label}</p>
                  <p className={`text-[11px] mt-0.5 truncate ${activeTab === tab.id ? "text-teal-200/60" : "text-gray-400"}`}>
                    {tab.description}
                  </p>
                </div>
                {activeTab === tab.id && <FiChevronRight className="w-4 h-4 ml-2 my-auto text-teal-400 animate-pulse" />}
              </button>
            ))}
          </nav>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100">
              <p className="text-[10px] uppercase font-bold text-teal-600 mb-1">System Version</p>
              <p className="text-xs font-semibold text-teal-900">v2.4.0-premium</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-8 lg:p-12 max-w-6xl">
            <div className="animate-fadeIn">
              <div className="mb-8">
                <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  <span>Configuration</span>
                  <span>/</span>
                  <span className="text-teal-600">{tabs.find(t => t.id === activeTab)?.label}</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                {renderTab()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
