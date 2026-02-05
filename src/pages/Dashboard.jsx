import React, { useEffect, useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import { getDashboardAPI } from "../services/AllAPI";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
     totalTickets: 0,
  highPriority: 0,
  ticketsByStatus: {},
  ticketsPerDay: []  
  })
  const [loading,setLoading]=useState(true)
  console.log(dashboardData)
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log
      const reqHeader =
        { ' Authorization': `Bearer ${token}` }

      const res = await getDashboardAPI(reqHeader);
      console.log(res.data);
      setDashboardData(res.data || {})

    } catch (err) {
      console.error("Failed to fetch dashboard:", err);
    }finally{
      setLoading(false)
    }
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

          <div className="bg-white p-4 rounded shadow my-1">
            <p className="text-gray-500">High Priority Tickets</p>
            <h2 className="text-2xl font-bold">
              {dashboardData.highPriority}
            </h2>
          </div>
        </div>

        {/* Tickets By Status */}
        {dashboardData.ticketByStatus &&
          Object.entries(dashboardData.ticketByStatus).map(([status, count]) => (
            <div key={status} className="bg-white p-4 rounded shadow text-center my-1">
              <p className="text-gray-500">{status}</p>
              <h2 className="text-2xl font-bold">{count}</h2>
            </div>
          ))
        }


        {/* Tickets Created Per Day */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-4">
            Tickets Created (Last 7 Days)
          </h3>

          {dashboardData.ticketsPerDay && dashboardData.ticketsPerDay.map((day) => (
            <div key={day.date} className="flex items-center mb-3 mt-5">
              <span className="w-20 text-sm text-gray-600">
                {day.date}
              </span>

              <div className="flex-1 bg-gray-200 rounded h-4 mx-2">
                <div
                  className="bg-blue-500 h-4 rounded"
                  style={{ width: `${day.count * 7}%` }}
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
