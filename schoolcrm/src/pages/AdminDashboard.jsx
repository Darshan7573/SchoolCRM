import { useState } from "react";
import ManageClasses from "../components/ManageClasses";
import ManageStudents from "../components/ManageStudents";
import ManageTeachers from "../components/ManageTeachers";
import ClassStudentChart from "../components/ClassStudentChart";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState("manageTeachers");
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-1/4 bg-gray-800 text-white p-6 flex flex-col">
                <h2 onClick={handleClick} className="text-2xl font-bold mb-6 cursor-pointer">Admin Dashboard</h2>
                <nav className="flex-grow">
                    <ul>
                        <li className="mb-4">
                            <button
                                onClick={() => setActiveSection("manageTeachers")}
                                className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === "manageTeachers" ? "text-blue-400 bg-gray-700" : ""}`}
                            >
                                Manage Teachers
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                onClick={() => setActiveSection("manageStudents")}
                                className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === "manageStudents" ? "text-blue-400 bg-gray-700" : ""}`}
                            >
                                Manage Students
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                onClick={() => setActiveSection("manageClasses")}
                                className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === "manageClasses" ? "text-blue-400 bg-gray-700" : ""}`}
                            >
                                Manage Classes
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                onClick={() => setActiveSection("analytics")}
                                className={`w-full text-left p-2 rounded hover:bg-gray-700 ${activeSection === "analytics" ? "text-blue-400 bg-gray-700" : ""}`}
                            >
                                View Analytics
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="w-3/4 bg-gray-100 p-6 overflow-auto">
                {activeSection === "manageTeachers" && <ManageTeachers />}
                {activeSection === "manageStudents" && <ManageStudents />}
                {activeSection === "manageClasses" && <ManageClasses />}
                {activeSection === "analytics" && <ClassStudentChart />}
            </main>
        </div>
    );
};

export default AdminDashboard;
