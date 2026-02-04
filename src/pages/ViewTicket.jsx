import React from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';

function ViewTicket() {
  const navigate = useNavigate();

  return (
     <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSidebar />

       <div className="flex-1 p-6">
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
    
    
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                
                <h2 className="text-2xl font-semibold text-gray-800">
                  Tickets
                </h2>
              </div>
    
              <button
                onClick={() => navigate("/ticket/create")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                + Create Ticket
              </button>
            </div>
    
    
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    
              <select className="border rounded-md px-3 py-2">
                <option>Status (All)</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
    
              <select className="border rounded-md px-3 py-2">
                <option>Priority (All)</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
    
              <select className="border rounded-md px-3 py-2">
                <option>Sort By</option>
                <option>Created Date</option>
                <option>Last Updated</option>
                <option>Priority</option>
              </select>
    
              <button className="border rounded-md px-3 py-2 bg-gray-100 hover:bg-gray-200">
                Apply Filters
              </button>
            </div>
    
            {/* Tickets Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-left text-sm text-gray-600">
                    <th className="border-b px-4 py-3">Title</th>
                    <th className="border-b px-4 py-3">Priority</th>
                    <th className="border-b px-4 py-3">Status</th>
                    <th className="border-b px-4 py-3">Category</th>
                    <th className="border-b px-4 py-3">Created At</th>
                    <th className="border-b px-4 py-3">Action</th>
                  </tr>
                </thead>
    
                <tbody>
                  {/* Ticket Row */}
                  <tr className="text-sm hover:bg-gray-50">
                    <td className="border-b px-4 py-3">Login button not working</td>
                    <td className="border-b px-4 py-3">
                      <span className="text-orange-600 font-medium">High</span>
                    </td>
                    <td className="border-b px-4 py-3">
                      <span className="text-blue-600">Open</span>
                    </td>
                    <td className="border-b px-4 py-3">UI Issue</td>
                    <td className="border-b px-4 py-3">02 Feb 2026</td>
                    <td className="border-b px-4 py-3">
                      <button
                        onClick={() => navigate("/ticket/view")}
                        className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
    
                  <tr className="text-sm hover:bg-gray-50">
                    <td className="border-b px-4 py-3">API response timeout</td>
                    <td className="border-b px-4 py-3">
                      <span className="text-red-600 font-medium">Critical</span>
                    </td>
                    <td className="border-b px-4 py-3">
                      <span className="text-yellow-600">In Progress</span>
                    </td>
                    <td className="border-b px-4 py-3">Backend</td>
                    <td className="border-b px-4 py-3">01 Feb 2026</td>
                    <td className="border-b px-4 py-3">
                      <button
                        onClick={() => navigate("/tickets/2")}
                        className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
    
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTicket