import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import CreateTicket from "./pages/CreateTicket"
import ViewTicket from "./pages/ViewTicket"
import TicketDetails from "./pages/TicketDetails"
import ProfilePage from "./pages/ProfilePage"


function App() {
 

  return (
    <>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/ticket/create" element={<CreateTicket/>}></Route>
      <Route path="/ticket/list" element={<ViewTicket/>}></Route>
      <Route path="/ticket/:id" element={<TicketDetails/>}></Route>
      <Route path="/profile" element={<ProfilePage/>}></Route>
     </Routes></>
  )
}

export default App
