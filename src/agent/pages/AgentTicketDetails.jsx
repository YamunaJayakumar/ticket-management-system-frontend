import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FiSend, FiArrowLeft, FiTrash2, FiClock, FiCheckCircle } from "react-icons/fi";
import {
  getAgentTicketDetailsAPI,
  updateAgentTicketStatusAPI,
  addAgentCommentAPI,
  deleteAgentCommentAPI,
  getStatusAPI
} from "../../services/AllAPI";

function AgentTicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, [id]);

  const fetchInitialData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      try {
        const ticketRes = await getAgentTicketDetailsAPI(id, reqHeader);
        if (ticketRes.status === 200) {
          setTicket(ticketRes.data);
        }

        const statusRes = await getStatusAPI(reqHeader);
        if (statusRes.status === 200) {
          setStatuses(statusRes.data);
        }
      } catch (err) {
        console.error("Error fetching ticket details:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  /* ---------- ADD COMMENT ---------- */
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      try {
        const result = await addAgentCommentAPI(id, { message: newComment }, reqHeader);
        if (result.status === 200) {
          setTicket(result.data);
          setNewComment("");
        }
      } catch (err) {
        console.error("Error adding comment:", err);
        alert("Failed to add comment");
      }
    }
  };

  /* ---------- UPDATE STATUS ---------- */
  const handleStatusChange = async (e) => {
    const newStatusId = e.target.value;
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      try {
        const result = await updateAgentTicketStatusAPI(id, { statusId: newStatusId }, reqHeader);
        if (result.status === 200) {
          setTicket(result.data);
        }
      } catch (err) {
        console.error("Error updating status:", err);
        alert("Failed to update status");
      }
    }
  };

  /* ---------- DELETE COMMENT ---------- */
  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      try {
        const result = await deleteAgentCommentAPI(id, commentId, reqHeader);
        if (result.status === 200) {
          setTicket(result.data);
        }
      } catch (err) {
        console.error("Error deleting comment:", err);
        alert("Failed to delete comment");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  if (!ticket) return <div className="p-8 text-center text-gray-500">Ticket not found</div>;

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
              <p className="text-xs font-mono text-gray-400">#{ticket._id}</p>
              <h1 className="text-2xl font-bold text-gray-900">{ticket.title}</h1>
              <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Priority: {ticket.priority?.name}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category: {ticket.category?.name}</span>
              </div>
            </div>

            {/* Status Change */}
            <div className="flex flex-col items-end">
              <label className="text-[10px] font-bold text-gray-400 mb-1 tracking-widest">CURRENT STATUS</label>
              <select
                value={ticket.status?._id}
                onChange={handleStatusChange}
                disabled={ticket.status?.name?.toLowerCase() === 'closed'}
                className={`px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-bold text-gray-700 focus:ring-2 focus:ring-teal-500/20 outline-none ${ticket.status?.name?.toLowerCase() === 'closed' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {statuses.map(s => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Comments Section */}
            <h3 className="text-sm font-bold text-gray-700 flex items-center">
              Comments ({ticket.comments?.length || 0})
            </h3>
            {ticket.comments?.map((comment) => (
              <div
                key={comment._id}
                className={`relative group p-4 rounded-xl ${comment.commentedBy?.role === "agent"
                  ? "bg-teal-50 border border-teal-100"
                  : "bg-gray-50 border border-gray-100"
                  }`}
              >
                {/* Delete Button (Agent only) */}
                {comment.commentedBy?.role === "agent" && ticket.status?.name?.toLowerCase() !== 'closed' && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-red-500 hover:bg-red-50 transition"
                    title="Delete comment"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                )}

                <div className="flex justify-between mb-1">
                  <span className="text-sm font-bold text-gray-700">
                    {comment.commentedBy?.name}
                    <span className="text-xs text-gray-400 ml-2">
                      ({comment.commentedBy?.role})
                    </span>
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>

                <p className="text-sm text-gray-700 pr-6">
                  {comment.message}
                </p>
              </div>
            ))}

            {/* Add Comment Box */}
            {ticket.status?.name?.toLowerCase() !== 'closed' ? (
              <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <h3 className="text-sm font-bold text-gray-700 mb-2">
                  Add a resolution step or comment
                </h3>

                <div className="flex items-end gap-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    placeholder="Type your response..."
                    className="flex-1 resize-none rounded-lg border border-gray-200 p-3 text-sm focus:ring-2 focus:ring-teal-500/20 focus:outline-none bg-gray-50"
                  />

                  <button
                    onClick={handleAddComment}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-md"
                  >
                    <FiSend className="w-4 h-4" />
                    Post
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 bg-amber-50 border border-amber-100 p-4 rounded-xl text-center">
                <p className="text-sm text-amber-700 font-medium">This ticket is closed. No further comments or status updates can be made.</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Reporter Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Reporter Information</h3>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold">
                  {ticket.createdBy?.name?.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{ticket.createdBy?.name}</div>
                  <div className="text-xs text-gray-500">{ticket.createdBy?.email}</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center text-[11px] text-gray-500">
                  <FiClock className="mr-2" /> Created {new Date(ticket.createdAt).toLocaleString()}
                </div>
                <div className="flex items-center text-[11px] text-gray-500">
                  <FiCheckCircle className="mr-2" /> {ticket.assignedTo ? "Assigned to You" : `Assigned to ${ticket.assignedTeam?.name} Team`}
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Activity Log</h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {ticket.activityLog?.slice().reverse().map((log, idx) => (
                  <div key={idx} className="relative pl-4 border-l-2 border-gray-100 pb-1">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-gray-200"></div>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">{log.message}</p>
                    <span className="text-[10px] text-gray-400">{new Date(log.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                  </div>
                ))}
                {(!ticket.activityLog || ticket.activityLog.length === 0) && (
                  <p className="text-xs text-gray-400 italic">No activity recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AgentTicketDetails;
