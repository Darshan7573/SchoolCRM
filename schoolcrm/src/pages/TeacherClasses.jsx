import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const TeacherClasses = () => {

    const navigate = useNavigate()


    const { teacherId } = useParams()

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/classes/teacher/classes/${teacherId}`); //66e8742f4934a5f146edefd0 Replace with actual teacher ID or dynamic value
                setClasses(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []); // Dependency array is empty to run only on component mount

    if (loading) return <div className="p-4 text-center">Loading...</div>;
    if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                onClick={() => navigate(-1)} // Go back to the previous page
            >
                Go Back
            </button>
            <h1 className="text-3xl font-bold mb-6 text-center">Classes for Teacher</h1>
            {classes.length === 0 ? (
                <p className="text-center text-gray-500">No classes found for this teacher.</p>
            ) : (
                <ul className="space-y-6">
                    {classes.map((cls) => (
                        <li key={cls._id} className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
                            <h2 className="text-2xl font-semibold mb-2">{cls.classname} - Year {cls.year}</h2>
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold mb-1">Schedule:</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    {cls.schedule.map((sched) => (
                                        <li key={sched._id} className="text-gray-700">
                                            {sched.subject} on {sched.dayOfWeek} from {sched.startTime} to {sched.endTime}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold mb-1">Students:</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    {cls.students.map(student => (
                                        <li key={student._id} className="text-gray-700">
                                            {student.fullname} (Username: {student.username})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-sm text-gray-500">
                                Student Limit: {cls.studentLimit}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TeacherClasses;
