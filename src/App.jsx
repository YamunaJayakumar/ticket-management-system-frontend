import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import CreateTicket from "./pages/CreateTicket"
import ViewTicket from "./pages/ViewTicket"
import TicketDetails from "./pages/TicketDetails"
import ProfilePage from "./pages/ProfilePage"
import TicketsPage from "./admin/pages/TicketsPage"
import DashboardAdmin from "./admin/pages/DashboardAdmin"
import SettingPage from "./admin/pages/SettingPage"
import AssignTicketPage from "./admin/pages/AssignTicketPage"
import AgentForm from "./admin/pages/AgentForm"
import AgentDashboard from "./agent/pages/AgentDashboard"
import MyTickets from "./agent/pages/MyTickets"
import AgentTicketDetails from "./agent/pages/AgentTicketDetails"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <>
      <Routes>
        {/* public pages */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>

        {/* user pages */}
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["user", "admin", "agent"]}><Dashboard /></ProtectedRoute>}></Route>
        <Route path="/ticket/create" element={<ProtectedRoute allowedRoles={["user"]}><CreateTicket /></ProtectedRoute>}></Route>
        <Route path="/ticket/list" element={<ProtectedRoute allowedRoles={["user"]}><ViewTicket /></ProtectedRoute>}></Route>
        <Route path="/ticket/:id" element={<ProtectedRoute allowedRoles={["user", "admin", "agent"]}><TicketDetails /></ProtectedRoute>}></Route>
        <Route path="/profile" element={<ProtectedRoute allowedRoles={["user", "admin", "agent"]}><ProfilePage /></ProtectedRoute>}></Route>

        {/* admin pages */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><DashboardAdmin /></ProtectedRoute>}></Route>
        <Route path="/admin/tickets" element={<ProtectedRoute allowedRoles={["admin"]}><TicketsPage /></ProtectedRoute>}></Route>
        <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={["admin"]}><SettingPage /></ProtectedRoute>}></Route>
        <Route path="/admin/assign" element={<ProtectedRoute allowedRoles={["admin"]}><AssignTicketPage /></ProtectedRoute>}></Route>
        <Route path="/admin/agent/add" element={<ProtectedRoute allowedRoles={["admin"]}><AgentForm /></ProtectedRoute>}></Route>
        <Route path="/admin/agent/edit/:id" element={<ProtectedRoute allowedRoles={["admin"]}><AgentForm /></ProtectedRoute>}></Route>

        {/* agent pages */}
        <Route path="/agent/dashboard" element={<ProtectedRoute allowedRoles={["agent"]}><AgentDashboard /></ProtectedRoute>}></Route>
        <Route path="/agent/tickets" element={<ProtectedRoute allowedRoles={["agent"]}><MyTickets /></ProtectedRoute>}></Route>
        <Route path="/agent/tickets/details/:id" element={<ProtectedRoute allowedRoles={["agent", "admin"]}><AgentTicketDetails /></ProtectedRoute>}></Route>
      </Routes>
    </>
  )
}

export default App
