import { Link } from 'react-router-dom'
import { FaSchool } from "react-icons/fa";

function Home() {
    return (
        <div className="flex h-screen">
            <div className="w-1/2 h-full">
                <img src="./hero image.png" alt="hero" className="mt-10" />
                <p className="text-center text-xl font-semibold text-gray-700 mt-4">Welcome to Our School Management System</p>
            </div>

            <div className="-1 /2 h-full flex flex-col justify-center px-12 bg-gray-50">
                <FaSchool className='text-[100px] text-blue-400 mb-4 ' />
                <h1 className="text-4xl font-bold text-gray-800 mb-6">School Management CRM</h1>
                <p>Manage your school efficiently with our all-in-one School CRM platform. Access student records, teacher data, class schedules, and more in a streamlined interface.
                </p>
                <Link to='/login' className="bg-blue-600 w-24 mt-6  text-white px-6 py-2 rounded-md text-lg hover:bg-blue-700 transition duration-300">Login</Link>
                <Link to='/sign-up' className='bg-red-600 w-24 mt-6 text-white px-6 py-2 rounded-md text-lg hover:bg-red-700 transition duration-300'>SignUp</Link>
                <p className="mt-6 text-gray-600 text-sm">(Only for admins)</p>
                <div className="mt-8 bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                    <p className="text-gray-700 mb-2"><strong>Address:</strong></p>
                    <p className="text-gray-600 mb-4">1234 School Lane, Education City, ED 56789</p>
                    <p className="text-gray-700 mb-2"><strong>Email:</strong></p>
                    <p className="text-gray-600 mb-4">contact@schoolmanagement.com</p>
                    <p className="text-gray-700 mb-2"><strong>Phone:</strong></p>
                    <p className="text-gray-600">+1 (123) 456-7890</p>
                </div>
            </div>
        </div >
    )
}

export default Home