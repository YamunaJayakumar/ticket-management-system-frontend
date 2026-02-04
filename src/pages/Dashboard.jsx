import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";

function Dashboard() {
  const dashboardData = {
    totalTickets: 27,
    highPriority: 6,
    ticketsByStatus: {
      Open: 12,
      "In Progress": 8,
      Resolved: 5,
      Closed: 2,
    },
    ticketsPerDay: [
      { date: "Jan 28", count: 3 },
      { date: "Jan 29", count: 6 },
      { date: "Jan 30", count: 2 },
      { date: "Jan 31", count: 4 },
      { date: "Feb 01", count: 5 },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">Total Tickets</p>
            <h2 className="text-2xl font-bold">
              {dashboardData.totalTickets}
            </h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">High Priority Tickets</p>
            <h2 className="text-2xl font-bold">
              {dashboardData.highPriority}
            </h2>
          </div>
        </div>

        {/* Tickets By Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(dashboardData.ticketsByStatus).map(
            ([status, count]) => (
              <div
                key={status}
                className="bg-white p-4 rounded shadow text-center"
              >
                <p className="text-gray-500">{status}</p>
                <h2 className="text-2xl font-bold">{count}</h2>
              </div>
            )
          )}
        </div>

        {/* Tickets Created Per Day */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-4">
            Tickets Created (Last 7 Days)
          </h3>

          {dashboardData.ticketsPerDay.map((day) => (
            <div key={day.date} className="flex items-center mb-3">
              <span className="w-20 text-sm text-gray-600">
                {day.date}
              </span>

              <div className="flex-1 bg-gray-200 rounded h-4 mx-2">
                <div
                  className="bg-blue-500 h-4 rounded"
                  style={{ width: `${day.count * 15}%` }}
                />
              </div>

              <span className="text-sm font-medium">
                {day.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
