import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { FiClock, FiUser, FiTag, FiMessageSquare, FiActivity, FiArrowLeft, FiMoreVertical, FiPaperclip, FiCheck } from "react-icons/fi";
import { viewTicketAPI, updateTicketAPI, getTeamsAPI, getPrioritiesAPI, getStatusAPI, getAgentListAPI } from '../services/AllAPI';

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // States
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTeam, setAssignedTeam] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [teams, setTeams] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [allAgents, setAllAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  let loggedInUser = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      loggedInUser = { id: decoded.id, role: decoded.role };
    } catch (e) {
      console.error("Failed to decode token", e);
    }
  }

  const fetchTicket = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await viewTicketAPI(id, reqHeader);
      setTicket(response.data);
      setStatus(response.data.status?._id || "");
      setPriority(response.data.priority?._id || "");
      setAssignedTeam(response.data.assignedTeam || "");
      setAssignedTo(response.data.assignedTo?._id || "");
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch ticket");
      setLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${localStorage.getItem("token")}` };
      const [teamsRes, prioritiesRes, statusesRes, agentsRes] = await Promise.all([
        getTeamsAPI(reqHeader),
        getPrioritiesAPI(reqHeader),
        getStatusAPI(reqHeader),
        getAgentListAPI(reqHeader)
      ]);
      if (teamsRes.status === 200) setTeams(teamsRes.data);
      if (prioritiesRes.status === 200) setPriorities(prioritiesRes.data);
      if (statusesRes.status === 200) setStatuses(statusesRes.data);
      if (agentsRes.status === 200) setAllAgents(agentsRes.data);
    } catch (err) {
      console.error("Failed to fetch dropdown data", err);
    }
  };

  useEffect(() => {
    fetchTicket();
    if (loggedInUser?.role?.toLowerCase() === "admin") {
      fetchDropdownData();
    }
  }, [id]);

  const canUpdate = loggedInUser?.role?.toLowerCase() === "admin" || ticket?.assignedTo?._id === loggedInUser?.id;

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const reqBody = {
        status,
        priority,
        assignedTeam,
        assignedTo: assignedTo || null
      };
      const response = await updateTicketAPI(id, reqBody, reqHeader);
      if (response.status === 200) {
        setTicket(response.data);
        alert("Ticket updated successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update ticket");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (s) => {
    switch (s?.toLowerCase()) {
      case 'open': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in progress': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'closed': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (p) => {
    switch (p?.toLowerCase()) {
      case 'critical': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-8 text-center">
          <div className="inline-block p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar />

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs & Actions */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => navigate('/ticket/list')}
              className="group flex items-center text-gray-500 hover:text-gray-800 transition font-medium"
            >
              <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition" />
              Back to Tickets
            </button>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-md border border-transparent hover:border-gray-200 transition">
                <FiMoreVertical />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Ticket Info & Comments */}
            <div className="lg:col-span-2 space-y-8">
              {/* Ticket Head */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-2 block">Ticket #{ticket._id?.slice(-6).toUpperCase()}</span>
                      <h1 className="text-3xl font-bold text-gray-900 leading-tight">{ticket.title}</h1>
                      <div className="flex items-center space-x-4 mt-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status?.name)}`}>
                          {ticket.status?.name}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(ticket.priority?.name)}`}>
                          {ticket.priority?.name || 'Not Set'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                      <FiTag className="mr-2" /> Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-100 text-lg">
                      {ticket.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                    <FiMessageSquare className="mr-2 text-teal-500" />
                    Conversation
                  </h3>

                  <div className="space-y-6 mb-8">
                    {ticket.comments?.length > 0 ? (
                      ticket.comments.map((c, idx) => (
                        <div key={idx} className="flex space-x-4 animate-fadeIn">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                              {c.user?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-bold text-gray-900">@{c.user}</span>
                                <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</span>
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed">{c.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <FiMessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No messages yet. Start the conversation!</p>
                      </div>
                    )}
                  </div>

                  {/* Comment Input */}
                  <div className="relative group">
                    <textarea
                      rows="3"
                      placeholder="Type your message here..."
                      className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition resize-none text-gray-700"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-teal-500 transition">
                        <FiPaperclip />
                      </button>
                      <button className="bg-[#1e3a4c] hover:bg-[#2a4a5e] text-white px-4 py-1.5 rounded-lg text-sm font-medium transition shadow-sm">
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Meta Info & Activity */}
            <div className="space-y-8">
              {/* Ticket Details Box */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900">Ticket Details</h3>
                </div>
                <div className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Reporter</span>
                    <span className="text-sm font-bold text-gray-800">{ticket.createdBy?.name || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Assignee</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-xs font-bold text-teal-700">
                        {ticket.assignedTo?.name?.charAt(0) || "?"}
                      </div>
                      <span className="text-sm font-bold text-gray-800">{ticket.assignedTo?.name || "Unassigned"}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Category</span>
                    <span className="text-sm font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded">{ticket.category?.name || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Assigned Team</span>
                    <span className="text-sm font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded border border-teal-100">{ticket.assignedTeam || "Unassigned"}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Created</span>
                    <span className="text-sm text-gray-600 flex items-center"><FiClock className="mr-1.5 w-3 h-3" /> {new Date(ticket.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Activity Log */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 flex items-center">
                    <FiActivity className="mr-2 text-teal-500" />
                    Activity Log
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {ticket.activityLog?.length > 0 ? (
                        ticket.activityLog.map((log, idx) => (
                          <li key={idx}>
                            <div className="relative pb-8">
                              {idx !== ticket.activityLog.length - 1 && (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-100" aria-hidden="true" />
                              )}
                              <div className="relative flex space-x-3">
                                <div>
                                  <span className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center ring-8 ring-white">
                                    <FiActivity className="h-4 w-4 text-teal-500" />
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div>
                                    <p className="text-xs text-gray-600">{log.message}</p>
                                  </div>
                                  <div className="text-right text-[10px] whitespace-nowrap text-gray-400">
                                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p className="text-xs text-gray-400 italic">No activity recorded yet.</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Admin Update Action */}
              {canUpdate && (
                <div className="bg-[#1e3a4c] rounded-xl shadow-lg p-6 text-white overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition duration-500">
                    <FiActivity className="w-24 h-24" />
                  </div>
                  <h3 className="font-bold mb-4 relative z-10 flex items-center">
                    <FiCheck className="mr-2 text-teal-400" />
                    Manage Ticket
                  </h3>
                  <div className="space-y-4 relative z-10">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-teal-400 mb-1 block tracking-widest">Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full bg-[#2a4a5e] border-none rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500 transition cursor-pointer"
                      >
                        {statuses.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-teal-400 mb-1 block tracking-widest">Priority</label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full bg-[#2a4a5e] border-none rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500 transition cursor-pointer"
                      >
                        {priorities.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                      </select>
                    </div>

                    {loggedInUser?.role?.toLowerCase() === "admin" && (
                      <>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-teal-400 mb-1 block tracking-widest">Assign Team</label>
                          <select
                            value={assignedTeam}
                            onChange={(e) => {
                              setAssignedTeam(e.target.value);
                              setAssignedTo(""); // Reset agent when team changes
                            }}
                            className="w-full bg-[#2a4a5e] border-none rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500 transition cursor-pointer"
                          >
                            <option value="">Unassigned</option>
                            {teams.map((team, idx) => (
                              <option key={idx} value={team.name}>{team.name}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase text-teal-400 mb-1 block tracking-widest">Assign Individual Agent</label>
                          <select
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            className="w-full bg-[#2a4a5e] border-none rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500 transition cursor-pointer"
                            disabled={!assignedTeam}
                          >
                            <option value="">Select Agent</option>
                            {allAgents
                              .filter(agent => agent.teamName === assignedTeam)
                              .map(agent => (
                                <option key={agent._id} value={agent._id}>
                                  {agent.name}
                                </option>
                              ))}
                          </select>
                          {!assignedTeam && <p className="text-[9px] text-teal-400/50 mt-1 italic">Select a team first</p>}
                        </div>
                      </>
                    )}

                    <button
                      onClick={handleUpdate}
                      disabled={updating}
                      className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-500 text-white font-bold py-2.5 rounded-lg text-sm transition shadow-md flex items-center justify-center space-x-2 mt-2"
                    >
                      {updating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                          <span>Updating...</span>
                        </>
                      ) : (
                        <span>Save Changes</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
