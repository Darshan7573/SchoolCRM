import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true)
    const [noData, setNoData] = useState(false)

    const apiUrl = import.meta.env.VITE_API_URL

    const handleDelete = async (classId) => {
        if (window.confirm("Are you sure you want to delete this class?")) {
            try {
                await axios.delete(`${apiUrl}/api/classes/classes/${classId}`);
                setClasses(classes.filter(classItem => classItem._id !== classId));
                fetchClasses()
                toast.success("Class deleted successfully");
            } catch (error) {
                toast.error("Error deleting class", error);
            }
        }
    };


    const fetchClasses = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${apiUrl}/api/classes/classes`);
            if (Array.isArray(res.data)) {
                setClasses(res.data);
                setNoData(res.data.length === 0)
            } else {
                console.error('Unexpected response format:', res.data);
            }
        } catch (error) {
            console.error('Error fetching Classes:', error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchClasses();

    }, []);

    return (
        <div>
            <Link to='/add-classes'>
                <button className="bg-blue-500 text-white py-2 px-4 rounded mb-6">Add Classes</button>
            </Link>

            {/* Classes Table */}
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Class Name</th>
                        <th className="py-3 px-4 text-left">Year</th>
                        <th className="py-3 px-4 text-left">Student Count</th>
                        <th className="py-3 px-4 text-left">Schedule</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                {loading ? <div>Loading...</div> : ""}
                {noData ? <div>No Classes as of now.</div> : ""}
                <tbody>
                    {classes.map((classItem) => (
                        <tr key={classItem._id} className="border-b">
                            <td className="py-3 px-4">{classItem.classname}</td>
                            <td className="py-3 px-4">{classItem.year}</td>
                            {/* <td className="py-3 px-4">
                                {classItem.students && Array.isArray(classItem.students) ? classItem.students.length : 'N/A'}
                            </td> */}
                            <td className="py-3 px-4">{classItem.students.length}</td>
                            <td className="py-3 px-4">
                                {classItem.schedule.map((scheduleItem, index) => (
                                    <div key={index}>
                                        <div>{scheduleItem.subject}</div>
                                        <div>{scheduleItem.dayOfWeek}</div>
                                        <div>{scheduleItem.startTime} - {scheduleItem.endTime}</div>
                                    </div>
                                ))}
                            </td>
                            <td className="py-3 px-4">
                                <Link to={`/edit-classes/${classItem._id}`} className="bg-green-500 text-white py-1 px-2 rounded mr-2">Edit</Link>
                                <button onClick={() => handleDelete(classItem._id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageClasses;
