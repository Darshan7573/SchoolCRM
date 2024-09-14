import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl p-6">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
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
        </div>
    );
};

export default LoginPage;
