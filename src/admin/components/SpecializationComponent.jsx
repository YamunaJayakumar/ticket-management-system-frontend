import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiX, FiCheck, FiZap, FiActivity } from "react-icons/fi";
import { addSpecializationsAPI, getSpecializationsAPI, toggleSpecializationAPI } from "../../services/AllAPI";

function SpecializationComponent() {
  const [specData, setSpecData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSpec, setNewSpec] = useState({ name: "", description: "" });

  useEffect(() => {
    handleFetchSpecs();
  }, []);

  const token = localStorage.getItem("token");
  const reqHeader = token ? { 'Authorization': `Bearer ${token}` } : {};

  const handleFetchSpecs = async () => {
    try {
      const result = await getSpecializationsAPI(reqHeader);
      if (result.status === 200) {
        setSpecData(result.data);
      } else {
        console.error("Failed to fetch specializations:", result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleSpec = async (id) => {
    try {
      const result = await toggleSpecializationAPI(id, reqHeader);
      if (result.status === 200) {
        setSpecData(prev => prev.map(spec => spec._id === id ? result.data : spec));
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const reqBody = { name: newSpec.name, description: newSpec.description };
    try {
      const result = await addSpecializationsAPI(reqBody, reqHeader);
      if (result.status === 200) {
        setSpecData(prev => [...prev, result.data]);
        setShowAddModal(false);
        setNewSpec({ name: "", description: "" });
      } else {
        alert("Failed to create specialization");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-white">
      {/* Search & Actions Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Agent Specializations</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl shadow-sm shadow-teal-700/10 flex items-center space-x-2 transition-all active:scale-95 text-sm font-bold"
        >
          <FiPlus className="w-4 h-4" />
          <span>New Specialization</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white border-b border-gray-100">
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Expertise Name</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Domain Description</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {specData.map((item, index) => (
              <tr key={item._id} className={`group hover:bg-teal-50/30 transition-colors ${!item.isActive ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${item.isActive ? 'bg-teal-50 text-teal-600' : 'bg-gray-100 text-gray-400'}`}>
                      <FiZap className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-gray-700 text-sm">{item.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-gray-500 text-sm line-clamp-1 max-w-xs">{item.description}</span>
                </td>
                <td className="px-8 py-5 text-center">
                  <button
                    onClick={() => handleToggleSpec(item._id)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${item.isActive
                      ? "bg-teal-100 text-teal-700 hover:bg-teal-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${item.isActive ? 'bg-teal-500' : 'bg-gray-400'}`}></div>
                    {item.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {specData.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
            <FiActivity className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-400 text-sm font-medium">No specializations defined yet.</p>
        </div>
      )}

      {/* Add Specialization Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0a0f1e]/40 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">New Specialization</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-all"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Expertise Name</label>
                  <input
                    type="text"
                    value={newSpec.name}
                    onChange={(e) => setNewSpec({ ...newSpec, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder-gray-400 font-medium"
                    placeholder="e.g. Infrastructure Security"
                    required
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Domain Description</label>
                  <textarea
                    value={newSpec.description}
                    onChange={(e) => setNewSpec({ ...newSpec, description: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder-gray-400 font-medium min-h-[100px]"
                    placeholder="e.g. Expertise in network security, firewall management, and incident response..."
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3.5 border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-2xl font-bold shadow-lg shadow-teal-500/20 transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Add Specialization</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpecializationComponent;
