import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeacherClasses = () => {
    const { teacherId } = useParams()  // Extract teacherId from the route
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(teacherId)
        if (teacherId) {

            fetchClasses();
        }
        else {
            console.log('NO TEACHER')
        }
    }, [teacherId]);

    const fetchClasses = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:3000/api/classes/teacher/classes/${teacherId}`);
            console.log('Classes', response.data)
            setClasses(response.data);
        } catch (err) {
            console.log(err)
            setError('Unable to fetch classes for this teacher.', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Classes</h1>

                {loading && <p className="text-blue-500">Loading classes...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <div>
                    {classes.length > 0 ? (
                        classes.map((classItem) => (
                            <div key={classItem._id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {classItem.classname} - {classItem.year}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Teacher:</span> {classItem.teacherAssigned.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Student Limit:</span> {classItem.studentLimit}
                                </p>
                                <p className="text-sm font-semibold text-gray-600 mt-2">Schedule:</p>
                                {classItem.schedule.map((schedule, index) => (
                                    <div key={index} className="text-sm text-gray-600">
                                        <p>{schedule.subject} - {schedule.dayOfWeek}, {schedule.startTime} to {schedule.endTime}</p>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        !loading && <p className="text-gray-600">No classes found for this teacher.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherClasses;
