import Home from "./components/Home"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignUp from './pages/SignUp'
import AdminPage from "./pages/AdminPage"
import Admin from "./components/Admin"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/admin-sign-up" element={<AdminPage />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
