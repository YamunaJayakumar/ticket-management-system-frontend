import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AdminSidebar from "../components/AdminSidebar";

function AgentsPage() {
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
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded shadow flex items-center gap-2">
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
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">Agent A</td>
                  <td className="p-4">agentA@test.com</td>
                  <td className="p-4 flex justify-center gap-4">
                    <button className="text-green-500 hover:text-green-600">
                      <FiEdit size={20} />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">Agent B</td>
                  <td className="p-4">agentB@test.com</td>
                  <td className="p-4 flex justify-center gap-4">
                    <button className="text-green-500 hover:text-green-600">
                      <FiEdit size={20} />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">Agent C</td>
                  <td className="p-4">agentC@test.com</td>
                  <td className="p-4 flex justify-center gap-4">
                    <button className="text-green-500 hover:text-green-600">
                      <FiEdit size={20} />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentsPage;
