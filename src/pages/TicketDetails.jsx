import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { viewTicketAPI } from '../services/AllAPI';
import jwtDecode from "jwt-decode";
function TicketDetails() {
  const { id } = useParams(); // get ticket ID from URL
  const navigate = useNavigate();

  // States
  const [ticket, setTicket] = useState(null);
  console.log(ticket);
   // null initially
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  let loggedInUser = null;

  if (token) {
   const decoded = jwtDecode(token);
    // Assuming your token has "userId" and "role"
    loggedInUser = { id: decoded.id, role: decoded.role };
  }

  console.log(loggedInUser);

  // Fetch ticket from backend
  const fetchTicket = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // if backend needs auth
      };

      const response = await viewTicketAPI(id, reqHeader);
      setTicket(response.data); // set ticket
      setStatus(response.data.status?.name || ""); // initialize status
      setPriority(response.data.priority?.name || ""); // initialize priority
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch ticket");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  // Check if user can update
  const canUpdate = loggedInUser.role === "Admin" || ticket?.assignedTo?._id === loggedInUser.id;

  const handleUpdate = () => {
    console.log("Updating ticket:", { status, priority });
    alert(`Ticket updated: Status = ${status}, Priority = ${priority}`);
    // Call backend API to update ticket here
  };

  if (loading) return <p>Loading ticket...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!ticket) return <p>No ticket found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{ticket.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              status:<span className="px-3 py-1 rounded-md text-blue-600 border border-blue-600 text-sm">{status}</span>
              priority:<span className="px-3 py-1 rounded-md text-orange-600 border border-orange-600 text-sm">{priority?priority:'N/A'}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/ticket/list')}
            className="border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            ← Back
          </button>
        </div>

        {/* Ticket Info */}
        <div className="border-t border-b py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><span className="font-semibold">Description:</span> {ticket.description}</p>
          <p><span className="font-semibold">Assigned To:</span> {ticket.assignedTo?.name || "Unassigned"}</p>
          <p><span className="font-semibold">Category:</span> {ticket.category?.name || "N/A"}</p>
          <p><span className="font-semibold">Created By:</span> {ticket.createdBy?.name || "N/A"}</p>
          <p><span className="font-semibold">Created At:</span> {ticket.createdAt}</p>
        </div>

        {/* Update Section */}
        {canUpdate && (
          <div className="border border-gray-200 p-4 rounded-md bg-gray-50 space-y-3">
            <h2 className="font-semibold text-gray-700 mb-2">Update Ticket</h2>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border rounded-md px-3 py-2"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="border rounded-md px-3 py-2"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <button
                onClick={handleUpdate}
                className="mt-2 md:mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        )}

        {/* Activity Timeline */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Activity Timeline</h2>
          <ul className="space-y-2">
            {ticket.activityLog?.map((log, idx) => (
              <li key={idx} className="bg-gray-50 px-3 py-2 rounded-md text-sm text-gray-700">
                {log.message} <span className="text-gray-400 text-xs">({log.timestamp})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Comments</h2>
          <ul className="space-y-2 mb-4">
            {ticket.comments?.map((c, idx) => (
              <li key={idx} className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-800">{c.comment}</p>
                <p className="text-xs text-gray-500 mt-1">
                  By {c.user} at {c.createdAt}
                </p>
              </li>
            ))}
          </ul>

          {/* Comment Form */}
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border rounded-md px-3 py-2"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Submit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TicketDetails;
