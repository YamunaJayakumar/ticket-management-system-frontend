import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiUser, FiMail, FiCheckCircle, FiXCircle, FiUsers, FiActivity, FiBriefcase } from "react-icons/fi";
import { getAgentListAPI, removeAgentAPI } from "../../services/AllAPI";
import { useNavigate } from "react-router-dom";

function AgentsComponent() {
    const navigate = useNavigate();
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleGetAgentList();
    }, []);

    const handleGetAgentList = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        const reqHeader = { 'Authorization': `Bearer ${token}` };
        try {
            const result = await getAgentListAPI(reqHeader);
            if (result.status === 200) {
                setAgents(result.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this agent?")) return;

        const token = localStorage.getItem("token");
        const reqHeader = { 'Authorization': `Bearer ${token}` };
        try {
            const result = await removeAgentAPI(id, reqHeader);
            if (result.status === 200) {
                setAgents(agents.filter(a => a._id !== id));
            }
        } catch (err) {
            alert(err.response?.data || "Deletion failed");
        }
    };

    if (loading && agents.length === 0) {
        return (
            <div className="p-12 flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Search & Actions Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Workforce Roster</h3>
                <button
                    onClick={() => navigate('/admin/agent/add')}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl shadow-sm shadow-teal-700/10 flex items-center space-x-2 transition-all active:scale-95 text-sm font-bold"
                >
                    <FiPlus className="w-4 h-4" />
                    <span>New Agent</span>
                </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white border-b border-gray-100">
                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Agent Profile</th>
                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Assigned Team</th>
                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Domain Expertise</th>
                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Availability</th>
                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {agents?.length > 0 ? agents.map((item, index) => (
                            <tr key={item._id} className="group hover:bg-teal-50/30 transition-colors border-b border-gray-50">
                                <td className="px-8 py-5">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <div className="w-11 h-11 bg-teal-100 rounded-xl flex items-center justify-center font-bold text-teal-700 text-lg group-hover:scale-105 transition duration-300">
                                                {item?.name?.charAt(0) || "A"}
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${item.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-900 whitespace-nowrap">{item?.name}</div>
                                            <div className="text-xs text-gray-400 flex items-center mt-0.5 whitespace-nowrap">
                                                <FiMail className="mr-1 w-3 h-3" /> {item?.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center space-x-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
                                            <FiBriefcase className="w-4 h-4" />
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-tight ${item.teamName !== 'Unassigned' ? 'text-teal-600' : 'text-gray-400'}`}>
                                            {item.teamName}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    {item?.specializations?.length > 0 ? (
                                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                            {item.specializations.map((spec, i) => (
                                                <span key={i} className="px-2.5 py-1 text-[10px] font-bold bg-white text-gray-500 rounded-lg border border-gray-200 uppercase tracking-tighter">
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-[10px] italic text-gray-300">No specific expertise</span>
                                    )}
                                </td>
                                <td className="px-8 py-5">
                                    {item.isActive ? (
                                        <span className="inline-flex items-center px-3 py-1 text-[11px] font-bold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                                            <FiCheckCircle className="mr-1.5 w-3.5 h-3.5" /> Available
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-3 py-1 text-[11px] font-bold rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                                            <FiXCircle className="mr-1.5 w-3.5 h-3.5" /> On Break
                                        </span>
                                    )}
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => navigate(`/admin/agent/edit/${item?._id}`)}
                                            className="p-2.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
                                        >
                                            <FiEdit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="px-8 py-16 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                                            <FiUsers className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium">No agents found. Start building your team!</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AgentsComponent;
