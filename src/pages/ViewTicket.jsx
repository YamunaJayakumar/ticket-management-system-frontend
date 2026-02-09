import React, { useEffect, useState } from "react";
import { FiFilter, FiCalendar, FiChevronLeft, FiChevronRight, FiClock, FiPlus, FiMoreVertical, FiSearch } from "react-icons/fi";
import { getTicketsListAPI } from "../services/AllAPI";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ViewTicket() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for filtering & pagination
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const reqHeader = { 'Authorization': `Bearer ${token}` };
      const res = await getTicketsListAPI(reqHeader);
      setTickets(res.data || []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
              <p className="text-sm text-gray-600 mt-1">View and manage all your support requests</p>
            </div>
            <button
              onClick={() => navigate("/ticket/create")}
              className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition flex items-center gap-2 font-medium"
            >
              <FiPlus /> Create Ticket
            </button>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Filters Bar */}
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 border bg-white rounded-lg px-3 py-1.5 min-w-[150px]">
                <FiFilter className="text-gray-400 w-4 h-4" />
                <select className="text-sm bg-transparent focus:outline-none w-full border-none p-0">
                  <option>Status (All)</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2 border bg-white rounded-lg px-3 py-1.5 min-w-[150px]">
                <select className="text-sm bg-transparent focus:outline-none w-full border-none p-0">
                  <option>Priority (All)</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

              <div className="flex items-center gap-2 border bg-white rounded-lg px-3 py-1.5 min-w-[150px]">
                <select className="text-sm bg-transparent focus:outline-none w-full border-none p-0">
                  <option>Sort By: Newest</option>
                  <option>Sort By: Oldest</option>
                  <option>Sort By: Priority</option>
                </select>
              </div>

              <div className="ml-auto relative">
                {/* <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /> */}
                <input
                  type="text"
                  placeholder="Find ticket..."
                  className="pl-9 pr-4 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-64"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4 border-b">Ticket Title</th>
                    <th className="px-6 py-4 border-b">Priority</th>
                    <th className="px-6 py-4 border-b">Status</th>
                    <th className="px-6 py-4 border-b">Category</th>
                    <th className="px-6 py-4 border-b">Created</th>
                    <th className="px-6 py-4 border-b text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500 mb-2"></div>
                          <span className="text-gray-500 text-sm">Loading tickets...</span>
                        </div>
                      </td>
                    </tr>
                  ) : tickets.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        No tickets found
                      </td>
                    </tr>
                  ) : (
                    tickets.map((ticket) => (
                      <tr key={ticket._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">#{ticket._id?.slice(-6).toUpperCase()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${ticket.priority?.name === "Low" ? "bg-green-50 text-green-700 border-green-100" :
                            ticket.priority?.name === "Medium" ? "bg-yellow-50 text-yellow-700 border-yellow-100" :
                              ticket.priority?.name === "High" ? "bg-orange-50 text-orange-700 border-orange-100" :
                                ticket.priority?.name === "Critical" ? "bg-red-50 text-red-700 border-red-100" :
                                  "bg-gray-50 text-gray-700 border-gray-100"
                            }`}>
                            {ticket.priority?.name || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${ticket.status?.name === "Open" ? "bg-blue-50 text-blue-700 border-blue-100" :
                            ticket.status?.name === "In Progress" ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                              ticket.status?.name === "Resolved" ? "bg-green-50 text-green-700 border-green-100" :
                                ticket.status?.name === "Closed" ? "bg-gray-50 text-gray-700 border-gray-100" :
                                  "bg-gray-50 text-gray-700 border-gray-100"
                            }`}>
                            {ticket.status?.name || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {ticket.category?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => navigate(`/ticket/${ticket._id}`)}
                            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm transition"
                          >
                            View Details
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
    </div>
  );
}

export default ViewTicket;