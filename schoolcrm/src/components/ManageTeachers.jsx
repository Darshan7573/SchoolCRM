import { Link } from 'react-router-dom'

const ManageTeachers = () => {

    const teachers = [
        { id: 1, name: "John Doe", contact: "john@example.com", class: "10th Grade", salary: "$5000" },
        { id: 2, name: "Jane Smith", contact: "jane@example.com", class: "9th Grade", salary: "$4500" },
    ];

    return (
        <>
            <div>
                <Link to='/add-teacher'>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded mb-6">Add Teacher</button>
                </Link>

                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Contact</th>
                            <th className="py-3 px-4 text-left">Class</th>
                            <th className="py-3 px-4 text-left">Salary</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher.id} className="border-b">
                                <td className="py-3 px-4">{teacher.name}</td>
                                <td className="py-3 px-4">{teacher.contact}</td>
                                <td className="py-3 px-4">{teacher.class}</td>
                                <td className="py-3 px-4">{teacher.salary}</td>
                                <td className="py-3 px-4">
                                    <button className="bg-green-500 text-white py-1 px-2 rounded mr-2">Edit</button>
                                    <button className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    );
};
export default ManageTeachers;
