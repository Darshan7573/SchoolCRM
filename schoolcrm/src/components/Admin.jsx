import { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:3000/api/admin/login', formData);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                toast.success('Login successful');
                navigate('/admin-dashboard');
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Error during login');
            setError(err.response?.data?.message || 'Error during login');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <FaUserShield className="text-4xl text-blue-600 mb-4 mx-auto" />
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
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
                <ToastContainer />
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

export default AdminLogin;
