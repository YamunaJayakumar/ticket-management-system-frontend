import React, { useState, useEffect } from "react";
import { FiBarChart2, FiAlertTriangle, FiCheckCircle, FiClock } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import { getAgentDashboardAPI } from "../../services/AllAPI";

function AgentDashboard() {

  const [dashboardData, setDashboardData] = useState({
    totalTickets: 0,
    highPriority: 0,
    ticketByStatus: {},
    ticketsPerDay: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      try {
        const result = await getAgentDashboardAPI(reqHeader);
        if (result.status === 200) {
          setDashboardData(result.data);
        }
      } catch (err) {
        console.error("Error fetching agent dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100-80px)] mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Overview of tickets assigned to you and your resolution progress
            </p>
          </div>

          {/* ================= METRICS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {/* Assigned Tickets */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase">ASSIGNED</p>
                  <h2 className="text-4xl font-bold text-gray-900">
                    {dashboardData.totalTickets}
                  </h2>
                  <p className="text-xs text-gray-600 mt-2">
                    Tickets assigned to you
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FiBarChart2 className="text-white w-5 h-5" />
                </div>
              </div>
            </div>

            {/* High Priority */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase">HIGH PRIORITY</p>
                  <h2 className="text-4xl font-bold text-gray-900">
                    {dashboardData.highPriority}
                  </h2>
                  <p className="text-xs text-red-600 mt-2 flex items-center">
                    <FiAlertTriangle className="mr-1 w-3 h-3" />
                    Urgent tickets
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <FiAlertTriangle className="text-white w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Open */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase">OPEN</p>
                  <h2 className="text-4xl font-bold text-gray-900">
                    {dashboardData.ticketByStatus.Open}
                  </h2>
                  <p className="text-xs text-blue-600 mt-2">
                    Awaiting work
                  </p>
                </div>
                <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                  <FiClock className="text-white w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Resolved */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase">RESOLVED</p>
                  <h2 className="text-4xl font-bold text-gray-900">
                    {dashboardData.ticketByStatus.Resolved +
                      dashboardData.ticketByStatus.Closed}
                  </h2>
                  <p className="text-xs text-green-600 mt-2">
                    Completed tickets
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <FiCheckCircle className="text-white w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= LOWER SECTION ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Tickets by Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Tickets by Status
              </h3>

              {Object.entries(dashboardData.ticketByStatus).map(([status, count]) => {
                const percentage = (count / dashboardData.totalTickets) * 100;

                return (
                  <div key={status} className="mb-4">
                    <div className="flex justify-between text-sm">
                      <span>{status}</span>
                      <span className="font-semibold">{count}</span>
                    </div>

                    <div className="bg-gray-100 rounded-full h-1.5 mt-1">
                      <div
                        className={`h-1.5 rounded-full ${status === "Open"
                            ? "bg-blue-500"
                            : status === "In Progress"
                              ? "bg-yellow-500"
                              : status === "Resolved"
                                ? "bg-green-500"
                                : "bg-gray-400"
                          }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Activity Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-6">
                Tickets Activity (Last 7 Days)
              </h3>

              {dashboardData.ticketsPerDay.map((day) => {
                const max = Math.max(...dashboardData.ticketsPerDay.map(d => d.count));
                const width = (day.count / max) * 100;

                return (
                  <div key={day.date} className="flex items-center mb-4">
                    <span className="text-xs w-20 text-gray-600">{day.date}</span>

                    <div className="flex-1 mx-4">
                      <div className="bg-gray-50 rounded h-8 overflow-hidden">
                        <div
                          className="bg-blue-500 h-full flex items-center justify-end pr-2 text-white text-xs font-bold transition-all"
                          style={{ width: `${width}%` }}
                        >
                          {day.count}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentDashboard;
