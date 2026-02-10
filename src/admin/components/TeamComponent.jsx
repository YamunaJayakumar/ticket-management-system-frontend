import React, { useState, useEffect } from "react";
import { FiPlus, FiEdit, FiTrash2, FiUsers, FiGrid, FiChevronRight, FiX, FiCheck, FiInfo, FiUserPlus } from "react-icons/fi";
import { getAgentListAPI, getCategoriesAPI, getTeamsAPI, addTeamAPI, updateTeamAPI, deleteTeamAPI, addMemberToTeamAPI } from "../../services/AllAPI";

function TeamComponent() {
    const [teams, setTeams] = useState([]);
    const [agents, setAgents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showMemberModal, setShowMemberModal] = useState(false);
    const [editingTeam, setEditingTeam] = useState(null);
    const [selectedTeamForMember, setSelectedTeamForMember] = useState(null);
    const [expandedTeam, setExpandedTeam] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "", selectedAgents: [], selectedCategories: [] });
    const [selectedMember, setSelectedMember] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        const reqHeader = { Authorization: `Bearer ${token}` };
        try {
            const agentRes = await getAgentListAPI(reqHeader);
            if (agentRes.status === 200) setAgents(agentRes.data);

            const catRes = await getCategoriesAPI(reqHeader);
            if (catRes.status === 200) {
                const catData = Array.isArray(catRes.data) ? catRes.data.map(c => typeof c === 'string' ? c : c.name) : [];
                setCategories(catData);
            }

            const teamRes = await getTeamsAPI(reqHeader);
            if (teamRes.status === 200) setTeams(teamRes.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    const handleOpenModal = (team = null) => {
        if (team) {
            setEditingTeam(team);
            setFormData({
                name: team.name,
                description: team.description,
                selectedAgents: team.members?.map(m => m._id) || [],
                selectedCategories: team.categories || []
            });
        } else {
            setEditingTeam(null);
            setFormData({ name: "", description: "", selectedAgents: [], selectedCategories: [] });
        }
        setShowModal(true);
    };

    const handleOpenAddMemberModal = (team) => {
        setSelectedTeamForMember(team);
        setSelectedMember("");
        setShowMemberModal(true);
    };

    const handleAddMember = async () => {
        if (!selectedMember || !selectedTeamForMember) return;

        const token = localStorage.getItem("token");
        const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};

        try {
            const result = await addMemberToTeamAPI(selectedTeamForMember._id, selectedMember, reqHeader);
            if (result.status === 200) {
                setTeams(teams.map(t => t._id === selectedTeamForMember._id ? result.data : t));
                setShowMemberModal(false);
            }
        } catch (err) {
            console.error("Error adding member:", err);
        }
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        const reqHeader = { Authorization: `Bearer ${token}` };

        try {
            const payload = {
                ...formData,
                members: formData.selectedAgents // Map selectedAgents to members for backend
            };

            if (editingTeam) {
                const result = await updateTeamAPI(editingTeam._id, payload, reqHeader);
                if (result.status === 200) {
                    setTeams(teams.map(t => t._id === editingTeam._id ? result.data : t));
                    setShowModal(false);
                }
            } else {
                const result = await addTeamAPI(payload, reqHeader);
                if (result.status === 200) {
                    setTeams([...teams, result.data]);
                    setShowModal(false);
                }
            }
        } catch (err) {
            console.error("Error saving team:", err);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        const reqHeader = { Authorization: `Bearer ${token}` };
        try {
            const result = await deleteTeamAPI(id, reqHeader);
            if (result.status === 200) {
                setTeams(teams.filter(t => t._id !== id));
            }
        } catch (err) {
            console.error("Error deleting team:", err);
        }
    };

    return (
        <div className="bg-white">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center">
                        <FiUsers className="mr-2" /> Organizational Units
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Manage departmental teams and their specific ticket responsibilities</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl shadow-sm shadow-teal-700/10 flex items-center space-x-2 transition-all active:scale-95 text-sm font-bold"
                >
                    <FiPlus className="w-4 h-4" />
                    <span>Create Team</span>
                </button>
            </div>

            {/* Team Cards Grid */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {teams.map((team) => (
                    <div key={team._id} className="flex flex-col">
                        <div className={`group relative bg-white rounded-3xl border ${expandedTeam === team._id ? 'border-teal-200 ring-4 ring-teal-50' : 'border-gray-200'} p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 z-10`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 ${team.color || 'bg-teal-500'} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                        <FiUsers className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{team.name}</h4>
                                        <div className="flex items-center text-xs text-gray-400 font-medium">
                                            <span className="flex items-center mr-3"><FiUsers className="mr-1" /> {team.members?.length || 0} Agents</span>
                                            <span className="flex items-center"><FiGrid className="mr-1" /> {team.categories?.length || 0} Categories</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenModal(team)}
                                        className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
                                    >
                                        <FiEdit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(team._id)}
                                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2">
                                {team.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-50 mb-6">
                                {team.categories?.map((cat, i) => (
                                    <span key={i} className="px-2.5 py-1 text-[10px] font-bold bg-teal-50/50 text-teal-700 rounded-lg border border-teal-100/50 uppercase tracking-tighter">
                                        {cat}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleOpenAddMemberModal(team)}
                                    className="flex-1 py-3 rounded-2xl bg-teal-50 text-teal-600 text-xs font-bold hover:bg-teal-100 transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <FiUserPlus className="w-4 h-4" />
                                    <span>Add Member</span>
                                </button>
                                <button
                                    onClick={() => setExpandedTeam(expandedTeam === team._id ? null : team._id)}
                                    className={`w-12 py-3 rounded-2xl transition-all duration-300 flex items-center justify-center group/btn ${expandedTeam === team._id ? 'bg-[#1e3a4c] text-white rotate-90' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                >
                                    <FiChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Expanded Members List */}
                        {expandedTeam === team._id && (
                            <div className="px-6 py-4 mx-4 -mt-6 bg-gray-50/80 backdrop-blur-sm border-x border-b border-gray-100 rounded-b-[2rem] animate-fadeIn">
                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Active Roster</p>
                                    {team.members?.map((member, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-2xl border border-gray-100/50 shadow-sm transition-transform hover:scale-[1.01]">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center font-bold text-teal-700 text-xs text-balance">
                                                    {member.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-gray-900">{member.name}</div>
                                                    <div className="text-[10px] text-gray-400">{member.email}</div>
                                                </div>
                                            </div>
                                            <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${member.status || 'Available' === 'Available' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                {member.status || 'Available'}
                                            </div>
                                        </div>
                                    ))}
                                    {(!team.members || team.members.length === 0) && (
                                        <div className="p-4 text-center text-xs text-gray-400 italic">No members assigned to this team yet.</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Team Edit/Create Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-modalIn">
                        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600">
                                    <FiUsers className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{editingTeam ? "Edit Team" : "Create Team"}</h3>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-2xl transition-colors">
                                <FiX className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Team Identity</label>
                                <input
                                    type="text"
                                    placeholder="e.g. IT Infrastructure"
                                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-teal-500/20 focus:bg-white rounded-2xl outline-none transition-all duration-200 text-gray-900 font-medium placeholder:text-gray-300"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Operational Goal</label>
                                <textarea
                                    rows="3"
                                    placeholder="Describe this team's focus areas..."
                                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-teal-500/20 focus:bg-white rounded-2xl outline-none transition-all duration-200 text-gray-900 font-medium placeholder:text-gray-300 resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Team Members</label>
                                    <div className="relative">
                                        <select
                                            multiple
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-teal-500/20 text-sm font-medium h-32"
                                            value={formData.selectedAgents}
                                            onChange={(e) => {
                                                const selected = Array.from(e.target.selectedOptions, option => option.value);
                                                setFormData({ ...formData, selectedAgents: selected });
                                            }}
                                        >
                                            {agents
                                                .filter(agent => {
                                                    // Show agent if:
                                                    // 1. They are already in the team we are editing (so we don't accidentally remove them)
                                                    // 2. They are not in ANY other team
                                                    const isInThisTeam = editingTeam?.members?.some(m => m._id === agent._id);
                                                    const isInOtherTeam = teams.some(t => t._id !== editingTeam?._id && t.members?.some(m => m._id === agent._id));
                                                    return isInThisTeam || !isInOtherTeam;
                                                })
                                                .map(agent => (
                                                    <option key={agent._id} value={agent._id}>{agent.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Assigned Categories</label>
                                    <div className="relative">
                                        <select
                                            multiple
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-teal-500/20 text-sm font-medium h-32"
                                            value={formData.selectedCategories}
                                            onChange={(e) => {
                                                const selected = Array.from(e.target.selectedOptions, option => option.value);
                                                setFormData({ ...formData, selectedCategories: selected });
                                            }}
                                        >
                                            {categories.map((cat, i) => (
                                                <option key={i} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-400 italic">Hold Ctrl/Cmd to select multiple agents or categories. Only unassigned agents are shown.</p>
                        </div>

                        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-2xl shadow-lg shadow-teal-900/10 flex items-center space-x-2 transition-all active:scale-95 text-sm font-bold"
                            >
                                <FiCheck className="w-4 h-4" />
                                <span>{editingTeam ? "Update Team" : "Create Team"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Add Member Modal */}
            {showMemberModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-modalIn">
                        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600">
                                    <FiUserPlus className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Add Member</h3>
                            </div>
                            <button onClick={() => setShowMemberModal(false)} className="p-2 hover:bg-gray-100 rounded-2xl transition-colors">
                                <FiX className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <div className="p-8 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Select Agent</label>
                                <div className="relative">
                                    <select
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-teal-500/20 focus:bg-white rounded-2xl outline-none transition-all duration-200 text-gray-900 font-medium appearance-none"
                                        value={selectedMember}
                                        onChange={(e) => setSelectedMember(e.target.value)}
                                    >
                                        <option value="">Select an agent</option>
                                        {agents
                                            .filter(agent => {
                                                // Only show agents who are not assigned to ANY team
                                                return !teams.some(t => t.members?.some(m => m._id === agent._id));
                                            })
                                            .map(agent => (
                                                <option key={agent._id} value={agent._id}>{agent.name}</option>
                                            ))}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <FiChevronRight className="w-4 h-4 rotate-90" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end">
                            <button
                                onClick={handleAddMember}
                                disabled={!selectedMember}
                                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-200 text-white py-3 rounded-2xl shadow-lg shadow-teal-900/10 flex items-center justify-center space-x-2 transition-all active:scale-95 text-sm font-bold"
                            >
                                <FiCheck className="w-4 h-4" />
                                <span>Assign to {selectedTeamForMember?.name}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TeamComponent;
