import Home from "./components/Home"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignUp from './pages/SignUp'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  )
}

export default App
