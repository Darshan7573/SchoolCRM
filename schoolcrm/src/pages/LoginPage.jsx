import { Link, useNavigate } from 'react-router-dom'
import { FaUserShield, FaUserGraduate } from 'react-icons/fa';
import { FaUserPen } from "react-icons/fa6";

const LoginPage = () => {

    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center min-h-screen  bg-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl p-6">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <FaUserShield className="text-4xl text-blue-600 mb-4 mx-auto" />
                    <h2 className="text-2xl font-bold mb-4">Admin</h2>
                    <p className="text-gray-600 mb-4">
                        Access the administrative tools and manage the system.
                    </p>
                    <Link
                        to="/admin"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Login as Admin
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <FaUserGraduate className="text-4xl text-blue-600 mb-4 mx-auto" />
                    <h2 className="text-2xl font-bold mb-4">Student</h2>
                    <p className="text-gray-600 mb-4">
                        Access your courses, grades, and schedules.
                    </p>
                    <Link
                        to="/student-login"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Login as Student
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <FaUserPen className="text-4xl text-blue-600 mb-4 mx-auto" />
                    <h2 className="text-2xl font-bold mb-4">Teacher</h2>
                    <p className="text-gray-600 mb-4">
                        Manage your classes, assignments, and grades.
                    </p>
                    <Link
                        to="/teacher-login"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Login as Teacher
                    </Link>
                </div>
            </div>
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
            >
                Go Back
            </button>
        </div>
    );
};

export default LoginPage;
