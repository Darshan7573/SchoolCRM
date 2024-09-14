import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="flex h-screen">
            <div className="w-1/2 h-full">
                <img src="./hero image.png" alt="hero" className="mt-10" />
            </div>

            <div className="-1 /2 h-full flex flex-col justify-center px-12 bg-gray-50">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">School Management CRM</h1>
                <p>Manage your school efficiently with our all-in-one School CRM platform. Access student records, teacher data, class schedules, and more in a streamlined interface.
                </p>
                <Link to='/login' className="bg-blue-600 w-24 mt-6  text-white px-6 py-2 rounded-md text-lg hover:bg-blue-700 transition duration-300">Login</Link>
            </div>
        </div >
    )
}

export default Home