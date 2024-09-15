import { useState } from "react";
import ManageClasses from "../components/ManageClasses"
import ManageStudents from "../components/ManageStudents"
import ManageTeachers from "../components/ManageTeachers"

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState("manageTeachers");

    return (
        <div className="flex h-screen">
            <aside className="w-1/4 bg-gray-800 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <button
                                onClick={() => setActiveSection("manageTeachers")}
                                className={`${activeSection === "manageTeachers" ? "text-blue-400" : ""
                                    } hover:text-gray-300`}
                            >
                                Manage Teachers
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                onClick={() => setActiveSection("manageStudents")}
                                className={`${activeSection === "manageStudents" ? "text-blue-400" : ""
                                    } hover:text-gray-300`}
                            >
                                Manage Students
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                onClick={() => setActiveSection("manageClasses")}
                                className={`${activeSection === "manageClasses" ? "text-blue-400" : ""
                                    } hover:text-gray-300`}
                            >
                                Manage Classes
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                onClick={() => setActiveSection("analytics")}
                                className={`${activeSection === "analytics" ? "text-blue-400" : ""
                                    } hover:text-gray-300`}
                            >
                                View Analytics
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="w-3/4 bg-gray-100 p-6">
                {activeSection === "manageTeachers" && <ManageTeachers />}
                {activeSection === "manageStudents" && <ManageStudents />}
                {activeSection === "manageClasses" && <ManageClasses />}
                {/* {activeSection === "analytics" && <Analytics />} */}
            </div>
        </div>
    );
};


export default AdminDashboard