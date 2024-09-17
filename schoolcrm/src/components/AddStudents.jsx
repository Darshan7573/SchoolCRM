import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'

const AddStudent = () => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [classAssigned, setClassAssigned] = useState("");
    const [feesPaid, setFeesPaid] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false)

    const navigate = useNavigate();
    const { studentId } = useParams()

    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        if (studentId) {
            setIsEditMode(true)
            const fetchStudent = async () => {
                try {
                    const res = await axios.get(`${apiUrl}/api/students/student/${studentId}`)
                    const student = res.data
                    setFullname(student.fullname)
                    setUsername(student.username)
                    setPassword("")
                    setContact(student.contact)
                    setDob(student.dob)
                    setGender(student.gender)
                    setFeesPaid(student.feesPaid)
                    setClassAssigned(student.classAssigned)
                } catch (error) {
                    setError("Error fetching student data", error)
                    toast.error('Error fetching student data')
                }
            }
            fetchStudent()
        }
    }, [studentId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous errors
        setSuccess(false); // Reset success state

        const normalizedUsername = username.toLowerCase()

        const newStudent = {
            fullname,
            username: normalizedUsername,
            password,
            contact,
            classAssigned,
            feesPaid,
            dob,
            gender
        };

        try {
            if (isEditMode) {
                await axios.patch(`${apiUrl}/api/students/student-update`, {
                    studentId,
                    updatedData: newStudent
                })
                setSuccess(true)
                toast.success("Student Updated Successfully")
            } else {
                await axios.post(`${apiUrl}/api/students/add-student`, newStudent);
                setSuccess(true)
                toast.success('Added Successfully')
            }

            // Clear the form after submission
            setFullname("");
            setUsername("");
            setPassword("");
            setContact("");
            setClassAssigned("");
            setFeesPaid("");
            setDob("");
            setGender("");

            // Redirect to the ManageStudents page after success
            navigate("/admin-dashboard");
        } catch (error) {
            // Set the error message
            setError(error.response?.data?.message || "Failed to add student");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Student' : 'Add New Student'}</h2>

            {/* Display success message */}
            {success && <div className="mb-4 text-green-500">{isEditMode ? 'Student Updated Successfully' : 'Student added successfully!'}</div>}

            {/* Display error message */}
            {error && <div className="mb-4 text-red-500">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Full Name</label>
                    <input
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Student's Full Name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Username"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Password"
                        required
                    />
                </div>


                <div className="mb-4">
                    <label className="block text-gray-700">Contact Info</label>
                    <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Contact Information"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Class Assigned</label>
                    <input
                        type="text"
                        value={classAssigned}
                        onChange={(e) => setClassAssigned(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Class Assigned"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Fees Paid</label>
                    <input
                        type="number"
                        value={feesPaid}
                        onChange={(e) => setFeesPaid(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Fees Paid"
                        required
                    />
                </div>

                {isEditMode ? "" : <div className="mb-4">
                    <label className="block text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>}


                <div className="mb-4">
                    <label className="block text-gray-700">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    {isEditMode ? 'Update Student' : 'Add Student'}
                </button>
            </form>
        </div>
    );
};

export default AddStudent;
