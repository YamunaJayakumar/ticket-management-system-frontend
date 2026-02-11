import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiFilter, FiDownload, FiSearch, FiMoreVertical, FiCalendar, FiClock, FiUserPlus, FiLoader } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import { getTicketsListAPI, viewTicketAPI, getTeamsAPI, updateTicketAPI } from "../../services/AllAPI";

function TicketsPage() {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewTicket, setViewTicket] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [teams, setTeams] = useState([]);
    const [assigning, setAssigning] = useState(false);

    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchTickets(searchQuery);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const fetchTeams = async () => {
        try {
            const token = localStorage.getItem("token");
            const reqHeader = { Authorization: `Bearer ${token}` };
            const res = await getTeamsAPI(reqHeader);
            if (res.status === 200) setTeams(res.data);
        } catch (err) {
            console.error("Failed to fetch teams:", err);
        }
    };

    const fetchTickets = async (search = "") => {
        try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };
            const result = await getTicketsListAPI({ search }, headers);
            if (result.status === 200) {
                setTickets(result.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleViewTicket = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const reqHeader = { 'Authorization': `Bearer ${token}` };
            const result = await viewTicketAPI(id, reqHeader);
            if (result.status === 200) {
                setViewTicket(result.data);
            } else {
                alert("Error while fetching ticket");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    const handleQuickAssign = async (teamName) => {
        if (!viewTicket) return;
        setAssigning(true);
        try {
            const token = localStorage.getItem("token");
            const reqHeader = { Authorization: `Bearer ${token}` };
            const response = await updateTicketAPI(viewTicket._id, { assignedTeam: teamId }, reqHeader);
            if (response.status === 200) {
                setViewTicket(response.data);
                // Update the ticket in the list as well
                setTickets(prev => prev.map(t => t._id === viewTicket._id ? response.data : t));
            }
        } catch (err) {
            console.error(err);
            alert("Failed to assign team");
        } finally {
            setAssigning(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'open': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'in progress': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'resolved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'closed': return 'bg-gray-50 text-gray-600 border-gray-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getPriorityStyle = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'critical': return 'bg-rose-50 text-rose-600 border-rose-100';
            case 'high': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'medium': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'low': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    if (loading && tickets.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Ticket Console</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage and monitor all support tickets platform-wide</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                                <FiDownload className="w-4 h-4" />
                                <span>Export</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-[#1e3a4c] text-white rounded-lg hover:bg-[#2a4a5e] transition text-sm font-medium">
                                <FiFilter className="w-4 h-4" />
                                <span>Filter</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Table Header / Search */}
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="relative group flex-1 max-w-md">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search by ID, title, or user..."
                                    className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg w-full outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span>{tickets.length} Tickets Found</span>
                            </div>
                        </div>

                        {/* Table Content */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ticket</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Assignee</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Reporter</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Updated</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {tickets.length > 0 ? (
                                        tickets.map((ticket, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50/80 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm font-bold text-gray-900 mb-0.5 group-hover:text-teal-600 transition-colors">{ticket.title}</div>
                                                        <div className="text-[10px] text-gray-400 font-mono">#{ticket._id.slice(-8).toUpperCase()} • {ticket.category?.name || "No Category"}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getStatusStyle(ticket.status?.name)}`}>
                                                        {ticket.status?.name || "N/A"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getPriorityStyle(ticket.priority?.name)}`}>
                                                        {ticket.priority?.name || "N/A"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        {ticket.assignedTo ? (
                                                            <div className="flex items-center space-x-2">
                                                                <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-[10px] font-bold text-teal-700 shadow-sm">
                                                                    {ticket.assignedTo.name?.charAt(0)}
                                                                </div>
                                                                <span className="text-sm font-medium text-gray-700">{ticket.assignedTo.name}</span>
                                                            </div>
                                                        ) : ticket.assignedTeam ? (
                                                            <div className="flex items-center space-x-2">
                                                                <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-emerald-700 shadow-sm">
                                                                    T
                                                                </div>
                                                                <span className="text-sm font-bold text-emerald-600 italic">{ticket.assignedTeam.name}</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic">Unassigned</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-600">{ticket.createdBy?.name || "System"}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-[11px] text-gray-500 flex flex-col">
                                                        <span className="font-medium">{new Date(ticket.updatedAt).toLocaleDateString()}</span>
                                                        <span className="text-gray-400">{new Date(ticket.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => handleViewTicket(ticket._id)}
                                                        className="p-2 text-gray-400 hover:text-teal-500 hover:bg-teal-50 rounded-lg transition-all"
                                                    >
                                                        <FiEye className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center text-gray-500 italic">
                                                No tickets matching your criteria...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Ticket Modal */}
            {viewTicket && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-slideUp">
                        {/* Modal Header */}
                        <div className="px-8 py-6 bg-gray-50 border-b border-gray-100 flex items-start justify-between">
                            <div>
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-[10px] font-bold bg-teal-500 text-white px-2 py-0.5 rounded tracking-widest uppercase">Ticket</span>
                                    <span className="text-xs font-mono text-gray-400">#{viewTicket._id.toUpperCase()}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{viewTicket.title}</h2>
                            </div>
                            <button
                                onClick={() => setViewTicket(null)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                                    <FiMoreVertical className="mr-1 text-teal-500" /> Description
                                </h3>
                                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    {viewTicket.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Priority & Status</h3>
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityStyle(viewTicket.priority?.name)}`}>
                                            {viewTicket.priority?.name}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(viewTicket.status?.name)}`}>
                                            {viewTicket.status?.name}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Category</h3>
                                    <span className="text-sm font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
                                        {viewTicket.category?.name || "General"}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-50">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Assigned Team</h3>
                                    <div className="flex items-center space-x-2">
                                        <select
                                            className="text-sm font-bold text-gray-800 bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-teal-500/20 disabled:opacity-50"
                                            value={viewTicket.assignedTeam?._id || ""}
                                            onChange={(e) => handleQuickAssign(e.target.value)}
                                            disabled={assigning}
                                        >
                                            <option value="">Unassigned</option>
                                            {teams.map(team => (
                                                <option key={team._id} value={team._id}>{team.name}</option>
                                            ))}
                                        </select>
                                        {assigning && <FiLoader className="w-4 h-4 animate-spin text-teal-500" />}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Assigned To Agent</h3>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-xs font-bold text-teal-700">
                                            {viewTicket.assignedTo?.name?.charAt(0) || "?"}
                                        </div>
                                        <span className="text-sm font-bold text-gray-800">{viewTicket.assignedTo?.name || "Unassigned"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-50">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Reported By</h3>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                            {viewTicket.createdBy?.name?.charAt(0) || "S"}
                                        </div>
                                        <span className="text-sm font-bold text-gray-800">{viewTicket.createdBy?.name || "System"}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Timestamps</h3>
                                    <div className="space-y-1 text-[10px] text-gray-400">
                                        <div className="flex items-center"><FiCalendar className="mr-1.5" /> Created: {new Date(viewTicket.createdAt).toLocaleString()}</div>
                                        <div className="flex items-center"><FiClock className="mr-1.5" /> Updated: {new Date(viewTicket.updatedAt).toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end items-center space-x-3">
                            <button
                                onClick={() => setViewTicket(null)}
                                className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => navigate(`/ticket/${viewTicket._id}`)}
                                className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold rounded-xl transition shadow-sm"
                            >
                                Full Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TicketsPage;
