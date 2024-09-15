import { Link } from 'react-router-dom'

const ManageClasses = () => {
    const classes = [
        {
            id: 1,
            className: "10th Grade",
            teacher: "John Doe",
            students: ["Alice Johnson", "Bob Smith"],
        },
        {
            id: 2,
            className: "9th Grade",
            teacher: "Jane Smith",
            students: ["Charlie Brown", "Eve Adams"],
        },
    ];

    return (
        <div>
            <Link to='/add-classes'>
                <button className="bg-blue-500 text-white py-2 px-4 rounded mb-6">Add Classes</button>
            </Link>

            {/* Classes Table */}
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Class Name</th>
                        <th className="py-3 px-4 text-left">Assigned Teacher</th>
                        <th className="py-3 px-4 text-left">Students</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classItem) => (
                        <tr key={classItem.id} className="border-b">
                            <td className="py-3 px-4">{classItem.className}</td>
                            <td className="py-3 px-4">{classItem.teacher}</td>
                            <td className="py-3 px-4">
                                {classItem.students.map((student, index) => (
                                    <div key={index}>{student}</div>
                                ))}
                            </td>
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

export default ManageClasses;
