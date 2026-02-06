import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import AdminSidebar from "../components/AdminSidebar";
import { getTicketsListAPI, viewTicketAPI } from "../../services/AllAPI";

function TicketsPage() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewTicket, setViewTicket] = useState(null)
    console.log(tickets)
    console.log(viewTicket)


    useEffect(() => {
        fetchTickets()
    }, [])
    const fetchTickets = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };

            const result = await getTicketsListAPI(headers)
            if (result.status == 200) {
                setTickets(result.data)

            } else {
                console.log(result)
            }

        } catch (err) {
            console.log(err)

        } finally {
            setLoading(false)
        }

    }
    const handleViewTicket = async (id) => {
        try {
            const token = localStorage.getItem("token")
            const reqHeader = {
                'Authorization': `Bearer ${token}`
            }
            const result = await viewTicketAPI(id, reqHeader)
            if (result.status == 200) {
                setViewTicket(result.data)
            } else {
                console.log(result.data)
                alert("error while fetching")
            }

        } catch (err) {
            console.log(err)
            alert("something went wrong")
        }

    }


    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main content */}
            <div className="flex-1 bg-gray-100 p-6">
                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded shadow table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-4">Title</th>
                                <th className="p-4">Priority</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Assigned To</th>
                                <th className="p-4">Created By</th>
                                <th className="p-4">Created At</th>
                                <th className="p-4">Updated At</th>
                                <th className="p-4 text-center">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.length > 0 ? (
                                tickets.map((ticket, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{ticket.title}</td>
                                        <td className="p-4"><span
                                            className="inline-block px-3 py-1 rounded-full text-white font-semibold text-sm"
                                            style={{ backgroundColor: ticket.priority?.color || "#ccc" }}
                                        >{ticket.priority?.name || "N/A"}</span></td>
                                        <td className="p-4 text-center " ><span
                                            className="inline-block px-3 py-1 rounded-full text-white font-semibold text-sm"
                                            style={{ backgroundColor: ticket.status?.color || "#ccc" }}
                                        >
                                            {ticket.status?.name || "N/A"}
                                        </span></td>
                                        <td className="p-4">{ticket.category?.name || "N/A"}</td>
                                        <td className="p-4">{ticket.assignedTo || "Unassigned"}</td>
                                        <td className="p-4">{ticket.createdBy.name}</td>
                                        <td className="p-4">{new Date(ticket.createdAt).toLocaleString()}</td>
                                        <td className="p-4">{new Date(ticket.updatedAt).toLocaleString()}</td>
                                        <td className="p-4 text-center">
                                            <button
                                                className="text-blue-500 hover:text-blue-600"
                                                onClick={() => handleViewTicket(ticket._id)}
                                            >
                                                <FiEye size={18} title="View" />
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center p-4">
                                        {loading ? "Loading..." : "No tickets found"}
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
                {/* modal here */}
                {viewTicket && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-lg w-120">
                            <h2 className="text-xl font-bold mb-2">{viewTicket.title}</h2>
                            <p className="mb-2">{viewTicket.description}</p>
                            <p>
                                <strong>Priority:</strong><span className="inline-block px-3 py-1 rounded-full text-white font-semibold text-sm"
                                            style={{ backgroundColor: viewTicket.priority?.color || "#ccc" }}> {viewTicket.priority?.name}</span> |{" "}
                                <strong>Status:</strong> <span className="inline-block px-3 py-1 rounded-full text-white font-semibold text-sm"
                                            style={{ backgroundColor: viewTicket.status?.color || "#ccc" }}>{viewTicket.status?.name}</span> |{" "}
                                <strong>Category:</strong> {viewTicket.category?.name}
                            </p>
                            <p>
                                <strong>Assigned To:</strong> {viewTicket.assignedTo?.name || "Unassigned"} |{" "}
                                <strong>Created By:</strong> {viewTicket.createdBy?.name}
                            </p>
                            <p>
                                <strong>Created At:</strong> {new Date(viewTicket.createdAt).toLocaleString()} |{" "}
                                <strong>Updated At:</strong> {new Date(viewTicket.updatedAt).toLocaleString()}
                            </p>
                            <button
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => setViewTicket(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}



            </div>
        </div>

    );
}

export default TicketsPage;
