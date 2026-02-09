import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiX, FiCheck, FiActivity } from "react-icons/fi";
import { addstatusAPI, deleteStatusAPI, getStatusAPI, updatestatusAPI } from "../../services/AllAPI";

function StatusComponent() {
  const [statusData, setStatusData] = useState([]);
  const [newStatus, setNewStatus] = useState({ name: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    handleStatus();
  }, []);

  const token = localStorage.getItem("token");
  const reqHeader = token ? { 'Authorization': `Bearer ${token}` } : {};

  const handleStatus = async () => {
    try {
      const result = await getStatusAPI(reqHeader);
      if (result.status === 200) {
        setStatusData(result.data);
      } else {
        console.error("Failed to fetch status:", result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const reqBody = { name: newStatus.name };
    try {
      const result = await addstatusAPI(reqBody, reqHeader);
      if (result.status === 200) {
        setStatusData(prev => [...prev, result.data]);
        setShowAddModal(false);
        setNewStatus({ name: "" });
      } else {
        alert("Failed to create status");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const reqBody = { name: selectedStatus.name };
    try {
      const result = await updatestatusAPI(selectedStatus._id, reqBody, reqHeader);
      if (result.status === 200) {
        setShowModal(false);
        setSelectedStatus(null);
        handleStatus();
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this status?")) return;
    try {
      const result = await deleteStatusAPI(id, reqHeader);
      if (result.status === 200) {
        setStatusData(prev => prev.filter(item => item._id !== id));
      } else {
        alert("Error deleting status");
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
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Status Definitions</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl shadow-sm shadow-teal-700/10 flex items-center space-x-2 transition-all active:scale-95 text-sm font-bold"
        >
          <FiPlus className="w-4 h-4" />
          <span>New Status</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white border-b border-gray-100">
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status Label</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {statusData.map((item, index) => (
              <tr key={index} className="group hover:bg-teal-50/30 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-teal-500 shadow-sm shadow-teal-500/20"></div>
                    <span className="font-semibold text-gray-700 text-sm">{item.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setSelectedStatus(item);
                        setShowModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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
      {statusData.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
            <FiActivity className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-400 text-sm font-medium">No status labels defined yet.</p>
        </div>
      )}

      {/* Modals */}
      {(showAddModal || showModal) && (
        <div className="fixed inset-0 bg-[#0a0f1e]/40 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{showAddModal ? "New Status" : "Edit Status"}</h3>
              <button
                onClick={() => { setShowAddModal(false); setShowModal(false); }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-all"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={showAddModal ? handleCreate : handleUpdate} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Label Name</label>
                <input
                  type="text"
                  value={showAddModal ? newStatus.name : selectedStatus?.name || ""}
                  onChange={(e) =>
                    showAddModal
                      ? setNewStatus({ ...newStatus, name: e.target.value })
                      : setSelectedStatus({ ...selectedStatus, name: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder-gray-400 font-medium"
                  placeholder="e.g. In Progress"
                  required
                  autoFocus
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setShowModal(false); }}
                  className="flex-1 px-6 py-3.5 border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-2xl font-bold shadow-lg shadow-teal-500/20 transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  <FiCheck className="w-4 h-4" />
                  <span>{showAddModal ? "Create" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusComponent;
