import { Link } from 'react-router-dom'

const ManageStudents = () => {
    const students = [
        { id: 1, name: "Alice Johnson", contact: "alice@example.com", class: "10th Grade", fees: "$2000" },
        { id: 2, name: "Bob Smith", contact: "bob@example.com", class: "9th Grade", fees: "$1800" },
    ];

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
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="border-b">
                            <td className="py-3 px-4">{student.name}</td>
                            <td className="py-3 px-4">{student.contact}</td>
                            <td className="py-3 px-4">{student.class}</td>
                            <td className="py-3 px-4">{student.fees}</td>
                            <td className="py-3 px-4">
                                <button className="bg-green-500 text-white py-1 px-2 rounded mr-2">Edit</button>
                                <button className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageStudents;
