import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const ManageStudents = () => {

    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [noData, setNoData] = useState(false)
    // const [error, setError] = useState("")

    // const students = [
    //     { id: 1, name: "Alice Johnson", contact: "alice@example.com", class: "10th Grade", fees: "$2000" },
    //     { id: 2, name: "Bob Smith", contact: "bob@example.com", class: "9th Grade", fees: "$1800" },
    // ];

    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        setLoading(true)
        const fetchStudents = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/students/students`)
                setStudents(res.data)
                setNoData(res.data.length === 0)
            } catch (error) {
                console.log('Error fetching Students:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStudents()
    }, [])

    const handleDelete = async (studentId) => {
        if (window.confirm("Are you sure to delete this Student?")) {
            try {
                await axios.delete(`${apiUrl}/api/students/delete-student/${studentId}`)
                setStudents(students.filter(student => student._id !== studentId));
                toast.success("Student deleted successfully");
            } catch (error) {
                toast.error("Error Deleting Student", error)
            }
        }
    }


    return (
        <div>
            {/* Add Student Button */}
            <Link to='/add-students'>
                <button className="bg-blue-500 text-white py-2 px-4 rounded mb-6">Add Students</button>
            </Link>

            {/* Students Table */}
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Contact</th>
                        <th className="py-3 px-4 text-left">Class</th>
                        <th className="py-3 px-4 text-left">Fees</th>
                        <th className='py-3 px-4 text-left'>DOB</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                {loading ? <div>Loading...</div> : ""}
                {noData ? <div>No Classes as of now.</div> : ""}
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="border-b">
                            <td className="py-3 px-4">{student.fullname}</td>
                            <td className="py-3 px-4">{student.contact}</td>
                            <td className="py-3 px-4">{student.classAssigned}</td>
                            <td className="py-3 px-4">{student.feesPaid}</td>
                            <td className='py-3 px-4'>{new Date(student.dob).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                                <Link to={`/edit-student/${student._id}`} className="bg-green-500 text-white py-1 px-2 rounded mr-2">Edit</Link>
                                <button onClick={() => handleDelete(student._id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageStudents;
