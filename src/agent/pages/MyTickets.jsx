import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEye,
  FiSearch,
  FiCalendar,
  FiClock,
  FiMoreVertical
} from "react-icons/fi";
import Navbar from "../../components/Navbar";

/* ------------------ DUMMY DATA ------------------ */
const dummyTickets = [
  {
    _id: "TCKT001",
    title: "Unable to login to dashboard",
    description: "User reports login failure after password reset.",
    status: { name: "Open" },
    priority: { name: "High" },
    category: { name: "Authentication" },
    assignedTo: { name: "Agent Alex" },
    createdBy: { name: "John Doe" },
    createdAt: "2026-02-01T10:30:00Z",
    updatedAt: "2026-02-02T09:45:00Z",
  },
  {
    _id: "TCKT002",
    title: "Payment not reflected",
    description: "Payment done but order still pending.",
    status: { name: "In Progress" },
    priority: { name: "Medium" },
    category: { name: "Billing" },
    assignedTo: { name: "Agent Alex" },
    createdBy: { name: "Priya Sharma" },
    createdAt: "2026-02-03T14:20:00Z",
    updatedAt: "2026-02-04T11:10:00Z",
  },
  {
    _id: "TCKT003",
    title: "App crashes on launch",
    description: "Mobile app crashes immediately after opening.",
    status: { name: "Resolved" },
    priority: { name: "Critical" },
    category: { name: "Mobile App" },
    assignedTo: { name: "Agent Alex" },
    createdBy: { name: "System" },
    createdAt: "2026-02-05T08:10:00Z",
    updatedAt: "2026-02-05T16:40:00Z",
  },
];

/* ------------------ STYLES ------------------ */
const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "open":
      return "bg-blue-50 text-blue-600 border-blue-100";
    case "in progress":
      return "bg-amber-50 text-amber-600 border-amber-100";
    case "resolved":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "closed":
      return "bg-gray-50 text-gray-600 border-gray-100";
    default:
      return "bg-gray-50 text-gray-600 border-gray-100";
  }
};

const getPriorityStyle = (priority) => {
  switch (priority?.toLowerCase()) {
    case "critical":
      return "bg-rose-50 text-rose-600 border-rose-100";
    case "high":
      return "bg-orange-50 text-orange-600 border-orange-100";
    case "medium":
      return "bg-amber-50 text-amber-600 border-amber-100";
    case "low":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    default:
      return "bg-gray-50 text-gray-600 border-gray-100";
  }
};

function MyTickets() {
  const navigate = useNavigate();
  const [tickets] = useState(dummyTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewTicket, setViewTicket] = useState(null);

  const filteredTickets = tickets.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Tickets</h1>
            <p className="text-sm text-gray-500 mt-1">
              Tickets assigned to you for action and resolution
            </p>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <div className="relative max-w-md w-full">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your tickets..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <span className="text-sm text-gray-500">
                {filteredTickets.length} Tickets
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Ticket</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Priority</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Reporter</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Updated</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="hover:bg-gray-50 transition group"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900 group-hover:text-teal-600">
                          {ticket.title}
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono">
                          #{ticket._id} • {ticket.category?.name}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getStatusStyle(ticket.status?.name)}`}>
                          {ticket.status?.name}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getPriorityStyle(ticket.priority?.name)}`}>
                          {ticket.priority?.name}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {ticket.createdBy?.name}
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-[11px] text-gray-500">
                          <div>{new Date(ticket.updatedAt).toLocaleDateString()}</div>
                          <div>{new Date(ticket.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setViewTicket(ticket)}
                          className="p-2 text-gray-400 hover:text-teal-500 hover:bg-teal-50 rounded-lg"
                        >
                          <FiEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b bg-gray-50 flex justify-between">
              <div>
                <span className="text-xs font-mono text-gray-400">#{viewTicket._id}</span>
                <h2 className="text-xl font-bold text-gray-900">{viewTicket.title}</h2>
              </div>
              <button onClick={() => setViewTicket(null)}>✕</button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-gray-700 bg-gray-50 p-4 rounded-xl">
                {viewTicket.description}
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Status</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(viewTicket.status?.name)}`}>
                    {viewTicket.status?.name}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Priority</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityStyle(viewTicket.priority?.name)}`}>
                    {viewTicket.priority?.name}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-gray-400 space-y-1">
                <div className="flex items-center"><FiCalendar className="mr-1" /> Created: {new Date(viewTicket.createdAt).toLocaleString()}</div>
                <div className="flex items-center"><FiClock className="mr-1" /> Updated: {new Date(viewTicket.updatedAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => navigate("/agent/tickets/details")}
                className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-sm font-bold"
                
              >
                Open Full Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTickets;
