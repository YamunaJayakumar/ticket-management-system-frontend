import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { FiUserPlus, FiCheck } from "react-icons/fi";

function AssignTicketPage() {
  // Sample tickets (unassigned)
  const tickets = [
    {
      id: 1,
      title: "Login button not working",
      priority: "High",
      status: "Open",
      category: "Bug",
      createdBy: "Admin",
      createdAt: "2026-02-06 10:00",
    },
    {
      id: 2,
      title: "Add dark mode",
      priority: "Medium",
      status: "Open",
      category: "Feature",
      createdBy: "Admin",
      createdAt: "2026-02-06 11:00",
    },
  ];

  // Sample agents
  const agents = [
    { id: "a1", name: "Agent A" },
    { id: "a2", name: "Agent B" },
    { id: "a3", name: "Agent C" },
  ];

  const [selectedAgent, setSelectedAgent] = useState({});
  const [assignedTickets, setAssignedTickets] = useState({});

  const handleAssign = (ticketId) => {
    if (!selectedAgent[ticketId]) {
      alert("Select an agent first");
      return;
    }
    setAssignedTickets({
      ...assignedTickets,
      [ticketId]: selectedAgent[ticketId],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">Workforce Dispatch</h1>
            <p className="text-sm text-gray-500 mt-1">Allocate unassigned incidents to available support agents</p>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Incident</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Reporter</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Dispatch to Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50/50 transition duration-150">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{ticket.title}</div>
                        <div className="text-[10px] text-gray-400 uppercase font-mono">{ticket.category}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${ticket.priority === 'High' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{ticket.createdBy}</td>
                      <td className="px-6 py-4 text-gray-500">{ticket.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          {assignedTickets[ticket.id] ? (
                            <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg border border-emerald-100">
                              <FiCheck className="w-4 h-4" />
                              <span className="text-xs font-bold">Assigned to {assignedTickets[ticket.id].name}</span>
                            </div>
                          ) : (
                            <>
                              <select
                                className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                                onChange={(e) =>
                                  setSelectedAgent({
                                    ...selectedAgent,
                                    [ticket.id]: agents.find((a) => a.id === e.target.value),
                                  })
                                }
                                value={selectedAgent[ticket.id]?.id || ""}
                              >
                                <option value="">Choose Agent</option>
                                {agents.map((agent) => (
                                  <option key={agent.id} value={agent.id}>
                                    {agent.name}
                                  </option>
                                ))}
                              </select>
                              <button
                                className="bg-[#1e3a4c] hover:bg-[#2a4a5e] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-2"
                                onClick={() => handleAssign(ticket.id)}
                              >
                                <FiUserPlus className="w-3.5 h-3.5" />
                                <span>Assign</span>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Log / Preview */}
          {Object.keys(assignedTickets).length > 0 && (
            <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 border-l-4 border-l-emerald-500 animate-slideUp">
              <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center">
                <FiCheck className="mr-2 text-emerald-500" /> Recent Assignments
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(assignedTickets).map(([ticketId, agent]) => (
                  <div key={ticketId} className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400">TICKET-00{ticketId}</div>
                      <div className="text-sm font-bold text-gray-800">{agent.name}</div>
                    </div>
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                      <FiCheck className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignTicketPage;
