import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TicketDetails() {
  const navigate = useNavigate();

  // Sample logged-in user (replace with auth context / JWT)
  const loggedInUser = { id: "user123", role: "User" };

  const ticket = {
    id: "ticket123",
    title: "Login button not working",
    status: "Open",
    priority: "High",
    description: "The login button on the homepage does not trigger any action.",
    assignedTo: { id: "user123", name: "John Doe" },
    createdBy: { id: "user456", name: "Alice" },
    category: "UI Issue",
    createdAt: "2026-02-02",
    activityLog: [
      { message: "Ticket created", timestamp: "2026-02-02 10:00 AM" },
      { message: "Assigned to John Doe", timestamp: "2026-02-02 11:00 AM" },
      { message: "Status changed to Open", timestamp: "2026-02-02 11:30 AM" },
    ],
    comments: [
      { user: "Alice", comment: "Please fix this asap.", createdAt: "2026-02-02 12:00 PM" },
      { user: "John Doe", comment: "Looking into it.", createdAt: "2026-02-02 12:30 PM" },
    ],
  };

  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);
  const canUpdate = loggedInUser.role === "Admin" || ticket.assignedTo.id === loggedInUser.id;

  const handleUpdate = () => {
    console.log("Updating ticket:", { status, priority });
    alert(`Ticket updated: Status = ${status}, Priority = ${priority}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{ticket.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="px-3 py-1 rounded-md text-blue-600 border border-blue-600 text-sm">{status}</span>
              <span className="px-3 py-1 rounded-md text-orange-600 border border-orange-600 text-sm">{priority}</span>
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
          <p><span className="font-semibold">Assigned To:</span> {ticket.assignedTo.name}</p>
          <p><span className="font-semibold">Category:</span> {ticket.category}</p>
          <p><span className="font-semibold">Created By:</span> {ticket.createdBy.name}</p>
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
            {ticket.activityLog.map((log, idx) => (
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
            {ticket.comments.map((c, idx) => (
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
