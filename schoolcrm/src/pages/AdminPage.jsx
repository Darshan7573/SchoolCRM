import { useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {

    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [successfull, setSuccessfull] = useState('')

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessfull('');
        try {
            const res = await axios.post('http://localhost:3000/api/admin/signup', formData);
            if (res.data.message) {
                toast.success(res.data.message)
                setSuccessfull(res.data.message);
            }
            else {
                toast.success('Registration successful')
                setSuccessfull("Registration Successfull")
            }
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                navigate('/admin')
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message || 'Error during signup');
            setError(err.response.data.message || 'Error during signup');
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
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
                    {successfull && <p className="text-green-500 mb-4">{successfull}</p>}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminPage