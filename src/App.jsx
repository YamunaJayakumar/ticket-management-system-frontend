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
import AgentsPage from "./admin/pages/AgentsPage"
import SettingPage from "./admin/pages/SettingPage"
import AssignTicketPage from "./admin/pages/AssignTicketPage"
import AgentForm from "./admin/pages/AgentForm"



function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/ticket/create" element={<CreateTicket />}></Route>
        <Route path="/ticket/list" element={<ViewTicket />}></Route>
        <Route path="/ticket/:id" element={<TicketDetails />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>

        {/* admin pages */}
        <Route path="/admin/dashboard" element={<DashboardAdmin />}></Route>

        <Route path="/admin/tickets" element={<TicketsPage />}></Route>

        <Route path="/admin/agents" element={<AgentsPage />}></Route>

        <Route path="/admin/settings" element={<SettingPage />}></Route>

        <Route path="/admin/assign" element={<AssignTicketPage />}></Route>

        <Route path="/admin/agent/add" element={<AgentForm />}></Route>

        <Route path="/admin/agent/edit/:id" element={<AgentForm />}></Route>



      </Routes></>
  )
}

export default App
