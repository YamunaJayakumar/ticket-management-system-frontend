import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FiUserPlus, FiCheck, FiLoader, FiAlertCircle } from "react-icons/fi";
import { getTeamsAPI, getTicketsListAPI, updateTicketAPI } from "../../services/AllAPI";

function AssignTicketPage() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState({});
  const [selectedTeam, setSelectedTeam] = useState({});
  const [assignedTickets, setAssignedTickets] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };

      const [teamsRes, ticketsRes] = await Promise.all([
        getTeamsAPI(reqHeader),
        getTicketsListAPI({ unassigned: true }, reqHeader)
      ]);

      if (teamsRes.status === 200) setTeams(teamsRes.data);
      if (ticketsRes.status === 200) {
        setTickets(ticketsRes.data);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (ticketId) => {
    const teamId = selectedTeam[ticketId];
    if (!teamId) {
      alert("Select a team first");
      return;
    }

    setAssigning({ ...assigning, [ticketId]: true });
    try {
      const token = localStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };

      const team = teams.find(t => t._id === teamId);
      const teamName = team ? team.name : "Team";

      const response = await updateTicketAPI(ticketId, { assignedTeam: teamId }, reqHeader);

      if (response.status === 200) {
        setAssignedTickets({
          ...assignedTickets,
          [ticketId]: teamName,
        });
        // Remove from list after a short delay
        setTimeout(() => {
          setTickets(prev => prev.filter(t => t._id !== ticketId));
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to assign ticket");
    } finally {
      setAssigning({ ...assigning, [ticketId]: false });
    }
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
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Dispatch to Team</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <FiLoader className="w-6 h-6 animate-spin text-teal-500 mx-auto mb-2" />
                        <span className="text-gray-500">Loading unassigned incidents...</span>
                      </td>
                    </tr>
                  ) : tickets.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <FiAlertCircle className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                        <span className="text-gray-500 italic">No unassigned tickets found</span>
                      </td>
                    </tr>
                  ) : (
                    tickets.map((ticket) => (
                      <tr key={ticket._id} className="hover:bg-gray-50/50 transition duration-150">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900 cursor-pointer hover:text-teal-600" onClick={() => navigate(`/ticket/${ticket._id}`)}>
                            {ticket.title}
                          </div>
                          <div className="text-[10px] text-gray-400 uppercase font-mono">{ticket.category?.name || "General"}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${ticket.priority?.name === 'Critical' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                            ticket.priority?.name === 'High' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                              'bg-amber-50 text-amber-600 border-amber-100'
                            }`}>
                            {ticket.priority?.name || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{ticket.createdBy?.name || "User"}</td>
                        <td className="px-6 py-4 text-gray-500 text-xs">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            {assignedTickets[ticket._id] ? (
                              <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg border border-emerald-100 animate-fadeIn">
                                <FiCheck className="w-4 h-4" />
                                <span className="text-xs font-bold">Assigned to {assignedTickets[ticket._id]}</span>
                              </div>
                            ) : (
                              <>
                                <select
                                  className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
                                  onChange={(e) =>
                                    setSelectedTeam({
                                      ...selectedTeam,
                                      [ticket._id]: e.target.value,
                                    })
                                  }
                                  value={selectedTeam[ticket._id] || ""}
                                  disabled={assigning[ticket._id]}
                                >
                                  <option value="">Choose Team</option>
                                  {teams.map((team) => (
                                    <option key={team._id} value={team._id}>
                                      {team.name}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  className="bg-[#1e3a4c] hover:bg-[#2a4a5e] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-2 disabled:opacity-50"
                                  onClick={() => handleAssign(ticket._id)}
                                  disabled={assigning[ticket._id] || !selectedTeam[ticket._id]}
                                >
                                  {assigning[ticket._id] ? (
                                    <FiLoader className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <FiUserPlus className="w-3.5 h-3.5" />
                                  )}
                                  <span>{assigning[ticket._id] ? "Assigning..." : "Assign"}</span>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
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
                {Object.entries(assignedTickets).map(([ticketId, teamName]) => (
                  <div key={ticketId} className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400 font-mono">INCIDENT-ASSIGNED</div>
                      <div className="text-sm font-bold text-gray-800">{teamName}</div>
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
