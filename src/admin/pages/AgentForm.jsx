import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { FiUser, FiMail, FiLock, FiStar, FiCheck, FiX, FiArrowLeft, FiActivity } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { addAgentAPI, getAgentDetailsAPI, updateAgentAPI, getSpecializationsAPI, getTeamsAPI, addMemberToTeamAPI } from '../../services/AllAPI';

function AgentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [agent, setAgent] = useState({
    name: "",
    email: "",
    password: '',
    specializations: [],
    isActive: true,
    teamId: ""
  });

  const [specOptions, setSpecOptions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const specRes = await getSpecializationsAPI(reqHeader);
      if (specRes.status === 200) {
        setSpecOptions(specRes.data.map(s => typeof s === 'string' ? s : s.name));
      }

      const teamsRes = await getTeamsAPI(reqHeader);
      if (teamsRes.status === 200) {
        setTeams(teamsRes.data);
      }

      if (isEditMode) {
        const agentRes = await getAgentDetailsAPI(id, reqHeader);
        if (agentRes.status === 200) {
          const data = agentRes.data;
          setAgent({
            name: data.name,
            email: data.email,
            password: '', // Don't show password
            specializations: data.specializations || [],
            isActive: data.isActive,
            teamId: data.teamId || ""
          });
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpecToggle = (spec) => {
    setAgent(prev => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      let result;
      if (isEditMode) {
        result = await updateAgentAPI(id, agent, reqHeader);
      } else {
        result = await addAgentAPI(agent, reqHeader);
      }

      if (result.status === 200) {
        const agentId = isEditMode ? id : result.data._id;

        // Handle team assignment if changed
        if (agent.teamId) {
          await addMemberToTeamAPI(agent.teamId, agentId, reqHeader);
        }

        navigate('/admin/settings');
      }
    } catch (err) {
      alert(err.response?.data || "Operation failed");
    }
  };

  if (loading && !agent.name && isEditMode) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar />

      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/admin/settings')}
            className="flex items-center space-x-2 text-gray-500 hover:text-teal-600 transition mb-6 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Agents</span>
          </button>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-8 py-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{isEditMode ? "Edit Agent" : "New Agent Registration"}</h1>
                <p className="text-xs text-gray-500 mt-1">Configure user profile, expertise, and team assignment</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600">
                <FiUser className="w-6 h-6" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                    <FiUser className="mr-2 text-teal-500" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Carter"
                    value={agent.name}
                    onChange={(e) => setAgent({ ...agent, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                    <FiMail className="mr-2 text-teal-500" /> Professional Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@tnrdesk.com"
                    value={agent.email}
                    onChange={(e) => setAgent({ ...agent, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                  <FiLock className="mr-2 text-teal-500" /> {isEditMode ? "New Password (Leave blank to keep current)" : "Initial Password"}
                </label>
                <input
                  type="password"
                  required={!isEditMode}
                  placeholder="••••••••••••"
                  value={agent.password}
                  onChange={(e) => setAgent({ ...agent, password: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                  <FiActivity className="mr-2 text-teal-500" /> Team Assignment
                </label>
                <select
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                  value={agent.teamId}
                  onChange={(e) => setAgent({ ...agent, teamId: e.target.value })}
                >
                  <option value="">No Team / Unassigned</option>
                  {teams.map(team => (
                    <option key={team._id} value={team._id}>{team.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                  <FiStar className="mr-2 text-teal-500" /> Domain Expertise
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  {specOptions.map((option, idx) => (
                    <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-teal-500 checked:border-teal-500 transition-all cursor-pointer"
                          checked={agent.specializations.includes(option)}
                          onChange={() => handleSpecToggle(option)}
                        />
                        <FiCheck className="absolute w-3.5 h-3.5 text-white left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{option}</span>
                    </label>
                  ))}
                  {specOptions.length === 0 && <p className="text-[11px] text-gray-400 col-span-2 text-center p-2">No specializations defined in settings yet.</p>}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-teal-50/30 rounded-2xl border border-teal-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-teal-100 flex items-center justify-center text-teal-600">
                    <FiCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Immediate Availability</div>
                    <div className="text-xs text-gray-500">Allow agent to receive automatic assignments</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={agent.isActive}
                    onChange={(e) => setAgent({ ...agent, isActive: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/settings')}
                  className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1e3a4c] hover:bg-[#2a4a5e] text-white px-8 py-2.5 rounded-xl shadow-md transition flex items-center space-x-2 font-bold group"
                >
                  <span>{isEditMode ? "Update Profile" : "Deploy Agent"}</span>
                  <FiCheck className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentForm;
