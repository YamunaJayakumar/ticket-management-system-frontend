import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

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
    alert(
      `Ticket ${ticketId} assigned to ${selectedAgent[ticketId].name} (mock)`
    );
  };

  return (
     <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Assign Tickets</h1>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded shadow table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-4">Title</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4">Category</th>
                <th className="p-4">Created By</th>
                <th className="p-4">Created At</th>
                <th className="p-4 text-center">Assign</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{ticket.title}</td>
                  <td className="p-4">{ticket.priority}</td>
                  <td className="p-4">{ticket.status}</td>
                  <td className="p-4">{ticket.category}</td>
                  <td className="p-4">{ticket.createdBy}</td>
                  <td className="p-4">{ticket.createdAt}</td>
                  <td className="p-4 text-center">
                    <select
                      className="border px-2 py-1 rounded mr-2"
                      onChange={(e) =>
                        setSelectedAgent({
                          ...selectedAgent,
                          [ticket.id]: agents.find(
                            (a) => a.id === e.target.value
                          ),
                        })
                      }
                      value={selectedAgent[ticket.id]?.id || ""}
                    >
                      <option value="">Select Agent</option>
                      {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => handleAssign(ticket.id)}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show assigned tickets (mock) */}
        {Object.keys(assignedTickets).length > 0 && (
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Assigned Tickets (Preview)</h2>
            <ul className="list-disc list-inside">
              {Object.entries(assignedTickets).map(([ticketId, agent]) => (
                <li key={ticketId}>
                  Ticket {ticketId} → {agent.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignTicketPage;
