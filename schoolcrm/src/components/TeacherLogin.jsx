import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TeacherLogin = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const res = await axios.post('http://localhost:3000/api/teachers/login', formData)
            console.log(res.data, "response")
            if (res.data.token) {
                localStorage.setItem('token', res.data.token)
                toast.success('Login Successful')
                navigate(`/teacher/classes/${res.data.studentId}`)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error during login")
        }
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Teacher Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">User Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TeacherLogin