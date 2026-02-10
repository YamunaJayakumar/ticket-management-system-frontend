import React, { useState, useEffect } from "react";
import { FiBarChart2, FiAlertTriangle, FiCheckCircle, FiClock, FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getDashboardAPI } from "../../services/AllAPI";

function DashboardAdmin() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("This Month");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };
      const response = await getDashboardAPI(reqHeader);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <FiLoader className="w-10 h-10 text-teal-500 animate-spin" />
      </div>
    );
  }

  if (!dashboardData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Executive Overview</h1>
            <p className="text-sm text-gray-500 mt-1">Real-time operational intelligence and SLA monitoring</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Open Tickets */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">OPEN TICKETS</p>
                  <h2 className="text-4xl font-bold text-gray-900">{dashboardData.openTickets}</h2>
                  <p className="text-xs text-gray-600 mt-2">{dashboardData.activeTickets} active</p>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FiBarChart2 className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Total Incidents */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">TOTAL INCIDENTS</p>
                  <h2 className="text-4xl font-bold text-gray-900">{dashboardData.totalIncidents}</h2>
                  <p className="text-xs text-gray-600 mt-2">All time</p>
                </div>
                <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                  <FiAlertTriangle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Critical Incidents */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">CRITICAL INCIDENTS</p>
                  <h2 className="text-4xl font-bold text-gray-900">{dashboardData.criticalIncidents}</h2>
                  <p className="text-xs text-green-600 mt-2 flex items-center">
                    <span className="mr-1">✓</span> All clear
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <FiAlertTriangle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* SLA Breaches */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">SLA BREACHES</p>
                  <h2 className="text-4xl font-bold text-gray-900">{dashboardData.slaBreaches}</h2>
                  <p className="text-xs text-green-600 mt-2">100% compliant</p>
                </div>
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <FiClock className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* On Schedule */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">ON SCHEDULE</p>
                  <h2 className="text-4xl font-bold text-gray-900">{dashboardData.onSchedule}</h2>
                </div>
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <FiCheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">SYSTEM HEALTH</p>
                  <h2 className="text-4xl font-bold text-gray-900">{dashboardData.systemHealth}%</h2>
                  <p className="text-xs text-green-600 mt-2">Optimal</p>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <FiCheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Incidents by Status & Priority */}
            <div className="space-y-6">
              {/* Incidents by Status */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Incidents by Status</h3>
                  <span className="text-xs text-gray-500">{dashboardData.totalIncidents} total</span>
                </div>
                <p className="text-xs text-gray-600 mb-4">Current distribution</p>
                <div className="space-y-3">
                  {Object.entries(dashboardData.incidentsByStatus).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{status}</span>
                      <span className="text-sm font-semibold text-gray-900">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Incidents by Priority */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Incidents by Priority</h3>
                  <span className="text-xs text-gray-500">{dashboardData.totalIncidents} total</span>
                </div>
                <p className="text-xs text-gray-600 mb-4">Breakdown by priority level</p>
                <div className="space-y-3">
                  {Object.entries(dashboardData.incidentsByPriority).map(([priority, count]) => (
                    <div key={priority} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{priority}</span>
                      <span className="text-sm font-semibold text-gray-900">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Column - Weekly Volume */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Weekly Volume</h3>
                  <p className="text-xs text-gray-600 mt-1">Incoming vs Resolved volume</p>
                </div>
                <span className="text-xs text-gray-500">Last 7 Days</span>
              </div>

              {/* Chart Area */}
              <div className="space-y-4 mt-6">
                {dashboardData.weeklyVolume.map((day) => {
                  const incomingValues = dashboardData.weeklyVolume.map(v => v.incoming);
                  const resolvedValues = dashboardData.weeklyVolume.map(v => v.resolved);
                  const maxValue = Math.max(...incomingValues, ...resolvedValues, 5);
                  const incomingWidth = (day.incoming / maxValue) * 100;
                  const resolvedWidth = (day.resolved / maxValue) * 100;

                  return (
                    <div key={day.day} className="space-y-1">
                      {/* Day Label */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-700 w-12">{day.day}</span>
                        <div className="flex-1 mx-3">
                          {/* Incoming Bar */}
                          <div className="mb-1">
                            <div className="flex items-center">
                              <div
                                className="bg-blue-500 h-6 rounded-r transition-all duration-300 hover:bg-blue-600 flex items-center justify-end pr-2"
                                style={{ width: `${incomingWidth}%` }}
                              >
                                {day.incoming > 5 && (
                                  <span className="text-xs font-semibold text-white">{day.incoming}</span>
                                )}
                              </div>
                              {day.incoming <= 5 && (
                                <span className="text-xs font-semibold text-gray-700 ml-2">{day.incoming}</span>
                              )}
                            </div>
                          </div>
                          {/* Resolved Bar */}
                          <div>
                            <div className="flex items-center">
                              <div
                                className="bg-green-500 h-6 rounded-r transition-all duration-300 hover:bg-green-600 flex items-center justify-end pr-2"
                                style={{ width: `${resolvedWidth}%` }}
                              >
                                {day.resolved > 5 && (
                                  <span className="text-xs font-semibold text-white">{day.resolved}</span>
                                )}
                              </div>
                              {day.resolved <= 5 && (
                                <span className="text-xs font-semibold text-gray-700 ml-2">{day.resolved}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center space-x-8 mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-xs font-medium text-gray-700">Incoming Tickets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-xs font-medium text-gray-700">Resolved Tickets</span>
                </div>
              </div>
            </div>

            {/* Right Column - SLA Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-gray-900">SLA Performance</h3>
                <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">Manage SLAs</button>
              </div>

              {/* SLA Compliance Rate */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">SLA Compliance Rate</span>
                  <span className="text-xs text-red-600">↓4%</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">{dashboardData.slaCompliance}%</span>
                  <span className="text-xs text-gray-500 ml-2">(1 of 22 met)</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Breached */}
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <FiAlertTriangle className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">Breached</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.breached}</p>
                  <p className="text-xs text-gray-500">Incidents: {dashboardData.breachedIncidents}</p>
                </div>

                {/* At Risk */}
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <FiClock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">At Risk</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.atRisk}</p>
                  <p className="text-xs text-gray-500">About to exceed plan</p>
                </div>

                {/* SLA Achieved */}
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <FiCheckCircle className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">SLA Achieved</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.slaAchieved}</p>
                  <p className="text-xs text-gray-500">On track</p>
                </div>

                {/* Avg Resolution */}
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <FiClock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">Avg Resolution</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.avgResolution}</p>
                  <p className="text-xs text-gray-500">Avg average time</p>
                </div>
              </div>

              {/* View Breached Button */}
              <button className="w-full bg-[#1e3a4c] hover:bg-[#2a4a5e] text-white py-3 px-4 rounded-lg transition text-sm font-medium">
                View Breached ({dashboardData.slaBreaches})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;