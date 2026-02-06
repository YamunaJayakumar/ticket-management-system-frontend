import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function StatusComponent() {
  const statusData = [
    { name: "Open", description: "Ticket is open" },
    { name: "In Progress", description: "Ticket is being worked on" },
  ];

  return (
    <div>
      {/* Add Button */}
      <div className="mb-4 text-right">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow flex items-center gap-2">
          Add Status
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {statusData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.description}</td>
                <td className="p-4 flex justify-center gap-4">
                  <button className="text-green-500 hover:text-green-600">
                    <FiEdit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-600">
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatusComponent;
