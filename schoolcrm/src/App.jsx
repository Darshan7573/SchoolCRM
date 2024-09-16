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
import { ToastContainer } from "react-toastify"
import StudentLogin from "./components/StudentLogin"
import TeacherLogin from "./components/TeacherLogin"
import StudnetClasses from "./pages/StudnetClasses"
import TeacherClasses from "./pages/TeacherClasses"

function App() {
  return (
    <div>
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
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-classes/:studentId" element={<StudnetClasses />} />
        <Route path='teacher/classes/:teacherId' element={<TeacherClasses />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/edit-teacher/:studentId" element={<AddTeacher />} />
        <Route path="/edit-student/:studentId" element={<AddStudenst />} />
        <Route path="/edit-classes/:classesId" element={<AddClass />} />
      </Routes>
      <ToastContainer />
    </div>


  )
}

export default App
