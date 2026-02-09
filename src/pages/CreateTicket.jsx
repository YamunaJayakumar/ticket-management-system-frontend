import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiSend, FiInfo, FiTag, FiAlertCircle } from "react-icons/fi";
import { CreateTicketAPI, getCategoriesAPI, getPrioritiesAPI } from "../services/AllAPI";
import Navbar from "../components/Navbar";

function CreateTicket() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "", // will store _id
    category: "", // will store _id
  });

  // Dynamic dropdowns
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchPriorities();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await getCategoriesAPI(reqHeader);
      if (result.status === 200) setCategories(result.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const fetchPriorities = async () => {
    try {
      const token = localStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await getPrioritiesAPI(reqHeader);
      if (result.status === 200 && result.data.length > 0) {
        setPriorities(result.data);
        const defaultPriority = result.data.find(p => p.name === "Medium");
        setFormData(prev => ({ ...prev, priority: defaultPriority?._id || result.data[0]._id }));
      }
    } catch (err) {
      console.error("Failed to load priorities", err);
      setPriorities([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, category, priority } = formData;

    if (!title || !description || !category || !priority) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await CreateTicketAPI(formData, reqHeader);

      if (result?.status === 201) {
        alert("Ticket created successfully!");
        navigate("/ticket/list");
      } else {
        alert("Failed to create ticket");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Ticket</h1>
              <p className="text-sm text-gray-600 mt-1">Submit a new support request to our team</p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-500 hover:text-gray-700 font-medium transition"
            >
              <FiChevronLeft className="w-5 h-5 mr-1" />
              Back
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="mb-8 p-4 bg-teal-50 border border-teal-100 rounded-lg flex items-start space-x-3">
                <FiInfo className="text-teal-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-teal-800 font-medium">Auto-Assignment Active</p>
                  <p className="text-xs text-teal-700 mt-0.5">Your ticket will be initialy marked as <strong>Open</strong>. Our administrators will review and assign it to the appropriate agent shortly.</p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject / Title</label>
                  <input
                    name="title"
                    type="text"
                    placeholder="Brief summary of the issue"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</label>
                  <textarea
                    name="description"
                    rows="5"
                    placeholder="Provide as much detail as possible..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority Level</label>
                    <div className="relative">
                      <FiAlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition appearance-none"
                        required
                      >
                        <option value="">Select Priority</option>
                        {priorities.map(p => (
                          <option key={p._id} value={p._id}>{p.name}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                    <div className="relative">
                      <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition appearance-none"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(c => (
                          <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center space-x-2 px-8 py-2.5 rounded-lg font-medium shadow-sm transition ${loading ? "bg-gray-400 cursor-not-allowed text-white" : "bg-[#1e3a4c] hover:bg-[#2a4a5e] text-white"
                      }`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" />
                        <span>Submit Ticket</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
