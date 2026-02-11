import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiX, FiCheck, FiGrid, FiUsers } from "react-icons/fi";
import { getCategoriesAPI, addCategoriesAPI, updateCategoriesAPI, deleteCategoryAPI, getTeamsAPI } from "../../services/AllAPI";

function CategoryComponent() {
  const [categories, setCategories] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", assignedTeam: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      const catRes = await getCategoriesAPI(reqHeader);
      if (catRes.status === 200) setCategories(catRes.data);

      const teamRes = await getTeamsAPI(reqHeader);
      if (teamRes.status === 200) {
        setTeams(teamRes.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        assignedTeam: category.assignedTeam?._id || "",
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "", assignedTeam: "" });
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      if (editingCategory) {
        const result = await updateCategoriesAPI(editingCategory._id, formData, reqHeader);
        if (result.status === 200) {
          setCategories(categories.map((c) => (c._id === editingCategory._id ? result.data : c)));
          setShowModal(false);
        }
      } else {
        const result = await addCategoriesAPI(formData, reqHeader);
        if (result.status === 200) {
          setCategories([...categories, result.data]);
          setShowModal(false);
        }
      }
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      const result = await deleteCategoryAPI(id, reqHeader);
      if (result.status === 200) {
        setCategories(categories.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center">
            <FiGrid className="mr-2" /> Ticket Categories
          </h3>
          <p className="text-xs text-gray-400 mt-1">Classify and assign incoming requests to specific teams</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl shadow-sm shadow-teal-700/10 flex items-center space-x-2 transition-all active:scale-95 text-sm font-bold"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Table */}
      <div className="p-8">
        <div className="overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Category Name</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Assigned Team</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Description</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((category) => (
                <tr key={category._id} className="group hover:bg-teal-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                        <FiGrid className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-gray-900">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-indigo-50 rounded-md flex items-center justify-center text-indigo-500">
                        <FiUsers className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{category.assignedTeam?.name || "Unassigned"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-500 truncate max-w-[200px] block">{category.description || "No description provided"}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenModal(category)}
                        className="p-2 text-gray-400 hover:text-teal-600 hover:bg-white rounded-xl shadow-sm transition-all"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-white rounded-xl shadow-sm transition-all"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300">
                        <FiGrid className="w-8 h-8" />
                      </div>
                      <p className="text-gray-400 font-medium font-bold">No categories found. Start by adding one!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-modalIn">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600">
                  <FiGrid className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{editingCategory ? "Edit Category" : "Add Category"}</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Login Issue, Technical Support"
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-teal-500/20 focus:bg-white rounded-2xl outline-none transition-all duration-200 text-gray-900 font-medium placeholder:text-gray-300"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Assign Team</label>
                <div className="relative">
                  <select
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-teal-500/20 focus:bg-white rounded-2xl outline-none transition-all duration-200 text-gray-900 font-medium appearance-none"
                    value={formData.assignedTeam}
                    onChange={(e) => setFormData({ ...formData, assignedTeam: e.target.value })}
                  >
                    <option value="">Select a team</option>
                    {teams.map((team) => (
                      <option key={team._id} value={team._id}>{team.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <FiUsers className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
                <textarea
                  rows="3"
                  placeholder="What is this category for?"
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-teal-500/20 focus:bg-white rounded-2xl outline-none transition-all duration-200 text-gray-900 font-medium placeholder:text-gray-300 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
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
                <span>{editingCategory ? "Update Category" : "Add Category"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryComponent;
