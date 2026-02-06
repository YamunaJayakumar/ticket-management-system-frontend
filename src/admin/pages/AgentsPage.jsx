import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AdminSidebar from "../components/AdminSidebar";
import { getAgentListAPI } from "../../services/AllAPI";
import { useNavigate } from "react-router-dom";

function AgentsPage() {
    const navigate = useNavigate()
    const [agent, setAgent] = useState()
    console.log(agent)
    useEffect(() => {
        handleGetAgentList()

    }, [])
    const handleGetAgentList = async () => {
        const token = localStorage.getItem("token")

        const reqHeader = {
            'Authorization': `Bearer ${token}`
        }
        console.log(reqHeader)
        try {
            const result = await getAgentListAPI(reqHeader)
            console.log(result)
            if (result.status == 200) {
                setAgent(result.data)

            } else {
                console.log(result.data)
                alert("failed")
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
                <div className="w-full max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-center">Agents</h1>

                    {/* Add Agent Button */}
                    <div className="mb-6 text-right">
                        <button onClick={() => navigate('/admin/agent/add')} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded shadow flex items-center gap-2">
                            Add Agent
                        </button>
                    </div>

                    {/* Agents Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded shadow table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Skills</th>
                                    <th className="p-4">Availablitity</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Row 1 */}
                                {
                                    agent?.length > 0 ? agent.map((item, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="p-4">{item?.name}</td>
                                            <td className="p-4">{item?.email}</td>
                                            <td className="p-4">
                                                {item?.skills?.length > 0 ? (
                                                    <ul className="list-disc ml-4">
                                                        {item.skills.map((skill, i) => (
                                                            <li key={i}>{skill}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <span className="text-gray-400">No skills</span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {item.isActive ? (
                                                    <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                                                        Available
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                                                        Unavailable
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 flex justify-center gap-4">
                                                <button onClick={() => navigate(`/admin/agent/edit/${item?._id}`)} className="text-green-500 hover:text-green-600">
                                                    <FiEdit size={20} />
                                                </button>
                                                <button className="text-red-500 hover:text-red-600">
                                                    <FiTrash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                        : <tr>
                                            <td>loading</td>
                                        </tr>


                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgentsPage;
