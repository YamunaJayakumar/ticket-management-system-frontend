import React, { useEffect, useState } from "react";
import { FiBarChart2, FiAlertTriangle, FiCheckCircle, FiClock } from "react-icons/fi";
import { getDashboardAPI } from "../services/AllAPI";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalTickets: 0,
    highPriority: 0,
    ticketByStatus: {},
    ticketsPerDay: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("This Month");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const reqHeader = { 'Authorization': `Bearer ${token} ` };
      const res = await getDashboardAPI(reqHeader);
      setDashboardData(res.data || {});
    } catch (err) {
      console.error("Failed to fetch dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Personal Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Overview of your active incidents and resolution progress</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Tickets */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">TOTAL TICKETS</p>
                  <h2 className="text-4xl font-bold text-gray-900">{dashboardData.totalTickets}</h2>
                  <p className="text-xs text-gray-600 mt-2">All time requests</p>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FiBarChart2 className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* High Priority Tickets */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">HIGH PRIORITY</p>
                  <h2 className="text-4xl font-bold text-gray-900">{dashboardData.highPriority}</h2>
                  <p className="text-xs text-red-600 mt-2 flex items-center">
                    <FiAlertTriangle className="mr-1 w-3 h-3" /> Urgent attention
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <FiAlertTriangle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Open Tickets */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">OPEN TICKETS</p>
                  <h2 className="text-4xl font-bold text-gray-900">{dashboardData.ticketByStatus?.Open || 0}</h2>
                  <p className="text-xs text-blue-600 mt-2">Currently being processed</p>
                </div>
                <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                  <FiClock className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Resolved/Closed Tickets */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">RESOLVED</p>
                  <h2 className="text-4xl font-bold text-gray-900">
                    {(dashboardData.ticketByStatus?.Closed || 0) + (dashboardData.ticketByStatus?.Resolved || 0)}
                  </h2>
                  <p className="text-xs text-green-600 mt-2">Successfully completed</p>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <FiCheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Tickets by Status */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Tickets by Status</h3>
                  <span className="text-xs text-gray-500">{dashboardData.totalTickets} total</span>
                </div>
                <div className="space-y-4">
                  {Object.entries(dashboardData.ticketByStatus || {}).map(([status, count]) => {
                    const percentage = (count / dashboardData.totalTickets) * 100;
                    return (
                      <div key={status} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">{status}</span>
                          <span className="font-semibold text-gray-900">{count}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className={`h - 1.5 rounded - full ${status === "Open" ? "bg-blue-500" :
                              status === "In Progress" ? "bg-yellow-500" :
                                status === "Closed" ? "bg-green-500" : "bg-gray-500"
                              } `}
                            style={{ width: `${percentage}% ` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Help & Support Card */}
              <div className="bg-gradient-to-br from-[#1e3a4c] to-[#2a4a5e] rounded-lg shadow-sm p-6 text-white">
                <h3 className="font-semibold mb-2">Need help?</h3>
                <p className="text-sm text-gray-300 mb-4">Check our knowledge base or create a priority ticket for urgent issues.</p>
                <button
                  onClick={() => navigate("/ticket/create")}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition text-sm font-medium"
                >
                  Contact Support
                </button>
              </div>
            </div>

            {/* Middle/Right Column - Tickets Created (Last 7 Days) */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Tickets Activity</h3>
                  <p className="text-xs text-gray-600 mt-1">Number of tickets created in the last 7 days</p>
                </div>
                <span className="text-xs text-gray-500">Last 7 Days</span>
              </div>

              <div className="space-y-6 mt-6">
                {dashboardData.ticketsPerDay?.map((day) => {
                  const maxCount = Math.max(...dashboardData.ticketsPerDay.map(d => d.count), 5);
                  const width = (day.count / maxCount) * 100;

                  return (
                    <div key={day.date} className="flex items-center">
                      <span className="text-xs font-medium text-gray-600 w-24">{day.date}</span>
                      <div className="flex-1 mx-4">
                        <div className="relative h-8 bg-gray-50 rounded-md overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500 rounded-r-md flex items-center justify-end pr-2"
                            style={{ width: `${width}% ` }}
                          >
                            {day.count > 0 && <span className="text-[10px] font-bold text-white">{day.count}</span>}
                          </div>
                        </div>
                      </div>
                      {day.count === 0 && <span className="text-xs text-gray-400">0</span>}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center space-x-8 mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <span className="text-xs font-medium text-gray-600">Daily Volume</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500 italic">
                  <span>Updates every 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
