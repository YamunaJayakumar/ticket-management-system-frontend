import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import AdminSidebar from "../components/AdminSidebar";
import { getTicketsListAPI, viewTicketAPI } from "../../services/AllAPI";

function TicketsPage() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewTicket,setViewTicket]=useState("")
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
    const handleViewTicket =async(id)=>{
        try{
            const token = localStorage.getItem("token")
            const reqHeader ={
                'Authorization':`Bearer ${token}`
            }
            const result = await viewTicketAPI(id,reqHeader)
            if(result.status ==200){
                setViewTicket(result.data)
            }else{
                console.log(result.data)
                alert("error while fetching")
            }

        }catch(err)
        {
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
                                        <td className="p-4">{ticket.priority?.name || "N/A"}</td>
                                        <td className="p-4">{ticket.status?.name || "N/A"}</td>
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


            </div>
        </div>

    );
}

export default TicketsPage;
