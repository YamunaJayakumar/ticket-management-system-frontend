import React from 'react'
import { Link } from "react-router-dom";
function DashboardSidebar() {
  return (
    <div>
     <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">TicketTool</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/dashboard"> Dashboard</Link>
        <Link to="/ticket/list"> Tickets</Link>
        <Link to={"/ticket/create"} > Create Ticket</Link>
         <Link to={"/profile"} >profile</Link>
        <Link >Logout</Link>  
      </nav>
    </div>
    </div>
  )
}

export default DashboardSidebar