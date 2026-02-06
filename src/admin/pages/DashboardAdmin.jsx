import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

const fakeDashboardData = {
  totalTickets: 12,
  highPriority: 3,
  ticketsByStatus: {
    Open: 5,
    "In Progress": 4,
    Closed: 3
  },
  ticketsPerDay: [
    { date: "2026-02-01", count: 2 },
    { date: "2026-02-02", count: 1 },
    { date: "2026-02-03", count: 3 },
    { date: "2026-02-04", count: 2 },
    { date: "2026-02-05", count: 2 },
    { date: "2026-02-06", count: 2 },
    { date: "2026-02-07", count: 0 },
  ],
};

const fakeAgents = [
  { id: "A001", name: "Agent A", email: "agentA@test.com", activeTickets: 2 },
  { id: "A002", name: "Agent B", email: "agentB@test.com", activeTickets: 1 },
  { id: "A003", name: "Agent C", email: "agentC@test.com", activeTickets: 0 },
];
function DashboardAdmin() {
    const [dashboardData, setDashboardData] = useState(fakeDashboardData);
  const [agents, setAgents] = useState(fakeAgents);
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
       <AdminSidebar/>
      {/* Main Content */}
      <div className="flex-1 p-6">
        {activePage === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded shadow">
                <p className="text-gray-500">Total Tickets</p>
                <h2 className="text-2xl font-bold">{dashboardData.totalTickets}</h2>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <p className="text-gray-500">High Priority Tickets</p>
                <h2 className="text-2xl font-bold">{dashboardData.highPriority}</h2>
              </div>
              {Object.entries(dashboardData.ticketsByStatus).map(([status, count]) => (
                <div key={status} className="bg-white p-4 rounded shadow text-center">
                  <p className="text-gray-500">{status}</p>
                  <h2 className="text-2xl font-bold">{count}</h2>
                </div>
              ))}
            </div>

            {/* Tickets Created Per Day */}
            <div className="bg-white p-4 rounded shadow mb-6">
              <h3 className="font-bold mb-4">Tickets Created (Last 7 Days)</h3>
              {dashboardData.ticketsPerDay.map((day) => (
                <div key={day.date} className="flex items-center mb-3">
                  <span className="w-20 text-sm text-gray-600">{day.date}</span>
                  <div className="flex-1 bg-gray-200 rounded h-4 mx-2">
                    <div className="bg-blue-500 h-4 rounded" style={{ width: `${day.count * 10}%` }} />
                  </div>
                  <span className="text-sm font-medium">{day.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePage === "agents" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Agents</h1>
            <table className="w-full table-auto bg-white rounded shadow">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Active Tickets</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id} className="border-b">
                    <td className="p-2">{agent.name}</td>
                    <td className="p-2">{agent.email}</td>
                    <td className="p-2">{agent.activeTickets}</td>
                    <td className="p-2">
                      <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Agent</button>
          </div>
        )}

        {activePage === "settings" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold mb-2">Statuses</h3>
                <ul>
                  {Object.keys(dashboardData.ticketsByStatus).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold mb-2">Priorities</h3>
                <ul>
                  {["Low", "Medium", "High"].map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold mb-2">Categories</h3>
                <ul>
                  {["Bug", "Feature", "Task"].map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Add Status / Priority / Category
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardAdmin