import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import { getTicketsListAPI } from '../services/AllAPI';


function ViewTicket() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(tickets);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await getTicketsListAPI(reqHeader);

      if (result.status === 200) {
        setTickets(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSidebar />

      <div className="flex-1 p-6">
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">


            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">

                <h2 className="text-2xl font-semibold text-gray-800">
                  Tickets
                </h2>
              </div>

              <button
                onClick={() => navigate("/ticket/create")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                + Create Ticket
              </button>
            </div>


            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

              <select className="border rounded-md px-3 py-2">
                <option>Status (All)</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>

              <select className="border rounded-md px-3 py-2">
                <option>Priority (All)</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>

              <select className="border rounded-md px-3 py-2">
                <option>Sort By</option>
                <option>Created Date</option>
                <option>Last Updated</option>
                <option>Priority</option>
              </select>

              <button className="border rounded-md px-3 py-2 bg-gray-100 hover:bg-gray-200">
                Apply Filters
              </button>
            </div>

            {/* Tickets Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-left text-sm text-gray-600">
                    <th className="border-b px-4 py-3">Title</th>
                    <th className="border-b px-4 py-3">Priority</th>
                    <th className="border-b px-4 py-3">Status</th>
                    <th className="border-b px-4 py-3">Category</th>
                    <th className="border-b px-4 py-3">Created At</th>
                    <th className="border-b px-4 py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-6">
                        Loading tickets...
                      </td>
                    </tr>
                  ) : tickets.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-6">
                        No tickets found
                      </td>
                    </tr>
                  ) : (
                    tickets.map((ticket) => (
                      <tr key={ticket._id} className="text-sm hover:bg-gray-50">
                        <td className="border-b px-4 py-3">{ticket.title}</td>
                        <td className="border-b px-4 py-3">
                          <span
                            className={`font-medium px-2 py-1 rounded-full text-white text-xs ${ticket.priority?.name === "Low"
                              ? "bg-green-500"
                              : ticket.priority?.name === "Medium"
                                ? "bg-yellow-500"
                                : ticket.priority?.name === "High"
                                  ? "bg-orange-500"
                                  : ticket.priority?.name === "Critical"
                                    ? "bg-red-600"
                                    : "bg-gray-400"
                              }`}
                          >
                            {ticket.priority?.name || "N/A"}
                          </span>
                        </td>
                       {/* status */}
                        <td className="border-b px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-white text-xs ${ticket.status?.name === "Open"
                              ? "bg-blue-500"
                              : ticket.status?.name === "In Progress"
                                ? "bg-indigo-500"
                                : ticket.status?.name === "Resolved"
                                  ? "bg-green-500"
                                  : ticket.status?.name === "Closed"
                                    ? "bg-gray-600"
                                    : "bg-gray-400"
                              }`}
                          >
                            {ticket.status?.name || "N/A"}
                          </span>
                        </td>
                       {/* category */}
                        <td className="border-b px-4 py-3">
                          {ticket.category?.name || "N/A"}
                        </td>


                        {/* Created At */}
                        <td className="border-b px-4 py-3">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </td>


                        <td className="border-b px-4 py-3">
                          <button
                            onClick={() => navigate(`/ticket/${ticket._id}`)}
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 text-sm"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>


              </table>
            </div>

          </div>
        </div>
      </div>
    </div >
  )
}

export default ViewTicket