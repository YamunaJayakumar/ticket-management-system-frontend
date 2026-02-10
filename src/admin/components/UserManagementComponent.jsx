import React, { useEffect, useState } from "react";
import { FiUsers, FiMail, FiShield, FiCheckCircle, FiXCircle, FiCalendar, FiSearch, FiInfo } from "react-icons/fi";
import { getAllUsersAPI } from "../../services/AllAPI";

function UserManagementComponent() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await getAllUsersAPI(reqHeader);
            if (response.status === 200) {
                setUsers(response.data);
            }
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex flex-wrap items-center justify-between bg-gray-50/50 gap-4">
                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center">
                        <FiUsers className="mr-2" /> User Roster
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Monitor and manage all application participants</p>
                </div>

                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Stats Summary (Optional/Nice to have) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 pb-0">
                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><FiShield /></div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-blue-500">Admins</p>
                        <p className="text-lg font-bold text-blue-900">{users.filter(u => u.role === 'admin').length}</p>
                    </div>
                </div>
                <div className="bg-teal-50/50 border border-teal-100 p-4 rounded-2xl flex items-center space-x-4">
                    <div className="p-3 bg-teal-100 text-teal-600 rounded-xl"><FiUsers /></div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-teal-500">Agents</p>
                        <p className="text-lg font-bold text-teal-900">{users.filter(u => u.role === 'agent').length}</p>
                    </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex items-center space-x-4">
                    <div className="p-3 bg-gray-100 text-gray-500 rounded-xl"><FiUsers /></div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-gray-500">Regular Users</p>
                        <p className="text-lg font-bold text-gray-900">{users.filter(u => u.role === 'user').length}</p>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="p-8">
                <div className="overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">User Identity</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Applied Role</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Date Joined</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
                                        <p className="text-gray-400 mt-4 font-medium">Loading user data...</p>
                                    </td>
                                </tr>
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-full bg-[#1e3a4c] flex items-center justify-center text-white text-sm font-bold shadow-md">
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 leading-none">{user.name}</p>
                                                    <p className="text-xs text-gray-400 mt-1.5 flex items-center">
                                                        <FiMail className="mr-1" /> {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${user.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                                                    user.role === 'agent' ? 'bg-teal-100 text-teal-700' :
                                                        'bg-gray-100 text-gray-600'
                                                }`}>
                                                <FiShield className="mr-1.5 w-3 h-3" /> {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <FiCalendar className="mr-2 opacity-50" />
                                                {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg ${user.isActive !== false ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                {user.isActive !== false ? <FiCheckCircle className="w-3 h-3" /> : <FiXCircle className="w-3 h-3" />}
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{user.isActive !== false ? "Active" : "Inactive"}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mx-auto mb-4">
                                            <FiSearch className="w-8 h-8" />
                                        </div>
                                        <p className="text-gray-400 font-medium font-bold">No users match your search criteria.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Info */}
            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/30 flex items-center space-x-2">
                <FiInfo className="text-blue-400 w-4 h-4" />
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Admin visibility only. Sensitive data is masked.</p>
            </div>
        </div>
    );
}

export default UserManagementComponent;
