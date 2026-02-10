import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import { FiSend, FiArrowLeft, FiTrash2 } from "react-icons/fi";
/* ---------- DUMMY TICKET ---------- */
const dummyTicket = {
  _id: "TCKT001",
  title: "Unable to login to dashboard",
  description: "User reports login failure after password reset.",
  status: "Open",
  priority: "High",
  category: "Authentication",
  createdBy: "John Doe",
  createdAt: "2026-02-01T10:30:00Z",
  comments: [
    {
      id: 1,
      author: "John Doe",
      role: "User",
      message: "I cannot login after resetting my password.",
      time: "2026-02-01T10:35:00Z",
    },
    {
      id: 2,
      author: "Agent Alex",
      role: "Agent",
      message: "We are checking the issue. Please wait.",
      time: "2026-02-01T11:00:00Z",
    },
  ],
};

function AgentTicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(dummyTicket);
  const [newComment, setNewComment] = useState("");
  const [status, setStatus] = useState(ticket.status);

  /* ---------- ADD COMMENT ---------- */
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: "Agent Alex",
      role: "Agent",
      message: newComment,
      time: new Date().toISOString(),
    };

    setTicket((prev) => ({
      ...prev,
      comments: [...prev.comments, comment],
    }));
    setNewComment("");
  };

  /* ---------- UPDATE STATUS ---------- */
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setTicket((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };
//   --------------handle delete comment-------------------------
  const handleDeleteComment = (commentId) => {
  setTicket((prev) => ({
    ...prev,
    comments: prev.comments.filter((c) => c.id !== commentId),
  }));
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto p-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-500 hover:text-teal-600 mb-6"
        >
          <FiArrowLeft className="mr-1" /> Back to My Tickets
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-gray-400">#{id}</p>
              <h1 className="text-2xl font-bold text-gray-900">{ticket.title}</h1>
              <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
            </div>

            {/* Status Change */}
            <select
              value={status}
              onChange={handleStatusChange}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-bold text-gray-700 focus:ring-2 focus:ring-teal-500/20"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
        </div>

        {/* Comments Section */}
        {ticket.comments.map((comment) => (
  <div
    key={comment.id}
    className={`relative group p-4 rounded-xl ${
      comment.role === "Agent"
        ? "bg-teal-50 border border-teal-100"
        : "bg-gray-50 border border-gray-100"
    }`}
  >
    {/* Delete Button (Agent only) */}
    {comment.role === "Agent" && (
      <button
        onClick={() => handleDeleteComment(comment.id)}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-red-500 hover:bg-red-50 transition"
        title="Delete comment"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>
    )}

    <div className="flex justify-between mb-1">
      <span className="text-sm font-bold text-gray-700">
        {comment.author}
        <span className="text-xs text-gray-400 ml-2">
          ({comment.role})
        </span>
      </span>
      <span className="text-[10px] text-gray-400">
        {new Date(comment.time).toLocaleString()}
      </span>
    </div>

    <p className="text-sm text-gray-700 pr-6">
      {comment.message}
    </p>
  </div>
))}

{/* Add Comment Box */}
<div className="mt-6 bg-white rounded-xl border border-gray-200 p-4">
  <h3 className="text-sm font-bold text-gray-700 mb-2">
    Add a comment
  </h3>

  <div className="flex items-end gap-3">
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      rows={3}
      placeholder="Type your response..."
      className="flex-1 resize-none rounded-lg border border-gray-200 p-3 text-sm focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
    />

    <button
      onClick={handleAddComment}
      className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
    >
      <FiSend className="w-4 h-4" />
      Send
    </button>
  </div>
</div>

      </div>
    </div>
  );
}

export default AgentTicketDetails;
