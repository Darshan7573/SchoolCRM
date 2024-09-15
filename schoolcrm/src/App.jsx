import Home from "./components/Home"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignUp from './pages/SignUp'
import AdminPage from "./pages/AdminPage"
import AdminLogin from "./components/Admin"
import AdminDashboard from "./pages/AdminDashboard"
import AddTeacher from "./components/AddTeacher"
import AddStudenst from "./components/AddStudents"
import AddClass from "./components/AddClasses"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/admin-sign-up" element={<AdminPage />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/add-teacher" element={<AddTeacher />} />
      <Route path="/add-students" element={<AddStudenst />} />
      <Route path="/add-classes" element={<AddClass />} />
    </Routes>
  )
}

export default App
