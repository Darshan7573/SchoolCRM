import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTeacher = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    // const [classAssigned, setClassAssigned] = useState("");
    const [salary, setSalary] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous errors
        setSuccess(false); // Reset success state

        const newTeacher = {
            fullname: name,
            username,
            password,
            contact,
            // classAssigned,
            salary,
        };

        try {
            const response = await axios.post("http://localhost:3000/api/teachers/add-teachers", newTeacher);

            // Handle success
            setSuccess(true);
            console.log("Teacher Added:", response.data);

            // Clear the form after submission
            setName("");
            setUsername("");
            setPassword("");
            setContact("");
            // setClassAssigned("");
            setSalary("");

            // Redirect to the ManageTeachers page after success
            navigate("/admin-dashboard");
        } catch (error) {
            // Set the error message
            setError(error.response?.data?.message || "Failed to add teacher");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Teacher</h2>

            {/* Display success message */}
            {success && <div className="mb-4 text-green-500">Teacher added successfully!</div>}

            {/* Display error message */}
            {error && <div className="mb-4 text-red-500">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Teacher's Full Name"
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

                {/* <div className="mb-4">
                    <label className="block text-gray-700">Class Assigned</label>
                    <input
                        type="text"
                        value={classAssigned}
                        onChange={(e) => setClassAssigned(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Class Assigned"
                        required
                    />
                </div> */}

                <div className="mb-4">
                    <label className="block text-gray-700">Salary</label>
                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Salary"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add Teacher
                </button>
            </form>
        </div>
    );
};

export default AddTeacher;
