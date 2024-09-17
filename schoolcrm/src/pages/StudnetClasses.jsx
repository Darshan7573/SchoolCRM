import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StudentClasses = () => {

    const navigate = useNavigate()

    const { studentId } = useParams(); // Get studentId from URL parameters
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        console.log('Student Id', studentId)
        if (studentId) {
            fetchStudentClasses();
        }
    }, [studentId]);

    const fetchStudentClasses = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${apiUrl}/api/classes/student/classes/${studentId}`);

            setClasses(response.data);
        } catch (error) {
            setError('Failed to fetch classes');
            toast.error('Failed to fetch classes: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Your Classes</h1>

            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                onClick={() => navigate(-1)} // Go back to the previous page
            >
                Go Back
            </button>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(classes) && classes.length > 0 ? (
                    classes.map((cls) => (
                        <div
                            key={cls._id}
                            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                        >
                            <h2 className="text-xl font-semibold mb-2">{cls.classname}</h2>
                            <p className="text-gray-700 mb-1">Year: {cls.year}</p>
                            <p className="text-gray-700 mb-1">Student Limit: {cls.studentLimit}</p>
                            <p className="text-gray-700 mb-1">
                                Schedule: {cls.schedule.length > 0 ? 'Scheduled' : 'Not Scheduled'}
                            </p>
                            {cls.schedule.map((schedule, index) => (
                                <div key={index} className="mt-2 p-2 border-t border-gray-300">
                                    <p className="text-gray-800 font-medium">{schedule.subject}</p>
                                    <p className="text-gray-600">Day: {schedule.dayOfWeek}</p>
                                    <p className="text-gray-600">Time: {schedule.startTime} - {schedule.endTime}</p>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No classes found</p>
                )}
            </div>
        </div>
    );
};

export default StudentClasses;
