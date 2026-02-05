import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateTicketAPI, getCategoriesAPI, getPrioritiesAPI } from "../services/AllAPI";

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
        setPriorities(result.data); // store full objects with _id and name
        // Set default priority to Medium if exists
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
        console.error(result);
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Create New Ticket</h2>
        </div>

        <div className="mb-4 text-sm text-gray-600 bg-blue-50 border border-blue-200 p-3 rounded">
          Ticket will be created with <strong>Status: Open</strong>. Assignment will be handled by Admin.
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            name="title"
            type="text"
            placeholder="Enter ticket title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            name="description"
            rows="4"
            placeholder="Describe the issue in detail"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Priority */}
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md px-3 py-2"
            required
          >
            <option value="">Select priority</option>
            {priorities.map(p => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md px-3 py-2"
            required
          >
            <option value="">Select category</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2 rounded-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              {loading ? "Creating..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
