import { useState } from "react";

const AddTeacher = () => {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [classAssigned, setClassAssigned] = useState("");
    const [salary, setSalary] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTeacher = {
            id: Math.random(),
            name,
            contact,
            class: classAssigned,
            salary,
        };
        // Ideally, you would send the new teacher data to the backend here.
        console.log("Teacher Added:", newTeacher);

        // Clear form after submission
        setName("");
        setContact("");
        setClassAssigned("");
        setSalary("");
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Teacher</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Teacher's Name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Contact</label>
                    <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Contact Info"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Class</label>
                    <input
                        type="text"
                        value={classAssigned}
                        onChange={(e) => setClassAssigned(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Assigned Class"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Salary</label>
                    <input
                        type="text"
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
