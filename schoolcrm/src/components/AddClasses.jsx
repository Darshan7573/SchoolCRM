import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddClass = () => {
    const [name, setName] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [studentIds, setStudentIds] = useState([]);
    const [schedule, setSchedule] = useState([{ subject: "", dayOfWeek: "", startTime: "", endTime: "" }]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [year, setYear] = useState("")
    const [isEditMode, setIsEditMode] = useState(false)
    const [classId, setClassId] = useState("")

    const navigate = useNavigate();
    const { classesId } = useParams()

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/teachers/teachers");
                setTeachers(response.data);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            }
        };

        const fetchStudents = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/students/students");
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        const fetchClassData = async () => {
            if (classesId) {
                try {
                    const res = await axios.get(`http://localhost:3000/api/classes/classes/${classesId}`)
                    // console.log(res.data)
                    const classData = res.data
                    setName(classData.classname)
                    setYear(classData.year)
                    setTeacherId(classData.teacherAssigned)
                    setSchedule(classData.schedule)
                    setStudentIds(classData.students)
                    setClassId(classData._id)
                    setIsEditMode(true)
                } catch (error) {
                    console.error(error)
                    toast.error("Failed to fetch class data")
                }
            }
        }

        fetchTeachers();
        fetchStudents();
        fetchClassData()
    }, [classesId]);

    const handleStudentChange = (e) => {
        const { options } = e.target;
        const selectedIds = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);
        setStudentIds(selectedIds);
    };

    const handleScheduleChange = (index, field, value) => {
        const updatedSchedule = [...schedule];
        updatedSchedule[index][field] = value;
        setSchedule(updatedSchedule);
    };

    const handleAddSchedule = () => {
        setSchedule([...schedule, { subject: "", dayOfWeek: "", startTime: "", endTime: "" }]);
    };

    const handleRemoveSchedule = (index) => {
        const updatedSchedule = schedule.filter((_, i) => i !== index);
        setSchedule(updatedSchedule);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!studentIds || studentIds.length === 0) {
            setError("Please select at least one student")
            return
        }

        if (!name || !year) {
            setError("Classname and year are required")
            return
        }

        const classData = {
            classname: name,
            year,
            teacherAssigned: teacherId,
            students: studentIds,
            schedule
        };

        try {
            if (isEditMode) {
                await axios.patch(`http://localhost:3000/api/classes/classes-update`, {
                    classesId: classesId,
                    updateData: classData
                })
                setSuccess(true)
                toast.success('Class Updated')
            }
            else {
                await axios.post("http://localhost:3000/api/classes/add-class", classData);
                setSuccess(true);
                toast.success("Class Added");

            }

            // Clear form after successful submission
            setName("");
            setYear("");
            setTeacherId("");
            setStudentIds([]);
            setSchedule([{ subject: "", dayOfWeek: "", startTime: "", endTime: "" }]);

            navigate("/admin-dashboard");
        } catch (error) {
            setError(error.response?.data?.message || "Failed to add class");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? "Edit Class" : "Add New Class"}</h2>

            {success && <div className="mb-4 text-green-500">Class {isEditMode ? "updated" : "added"}successfully!</div>}
            {error && <div className="mb-4 text-red-500">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Class Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Class Name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Year</label>
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Class Year"
                        required
                    />
                </div>


                <div className="mb-4">
                    <label className="block text-gray-700">Teacher</label>
                    <select
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    >
                        <option value="">Select a teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                                {teacher.fullname}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Students</label>
                    <select
                        multiple
                        value={studentIds}
                        onChange={handleStudentChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    >
                        {students.map((student) => (

                            <option key={student._id} value={student._id}>
                                {student.fullname} - {`${student.classAssigned} Std`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Class Schedule</h3>
                    {schedule.map((entry, index) => (
                        <div key={index} className="mb-4 border p-4 rounded-lg">
                            <div className="mb-2">
                                <label className="block text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    value={entry.subject}
                                    onChange={(e) => handleScheduleChange(index, "subject", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="Subject"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-gray-700">Day of Week</label>
                                <input
                                    type="text"
                                    value={entry.dayOfWeek}
                                    onChange={(e) => handleScheduleChange(index, "dayOfWeek", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="Day of Week"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-gray-700">Start Time</label>
                                <input
                                    type="time"
                                    value={entry.startTime}
                                    onChange={(e) => handleScheduleChange(index, "startTime", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-gray-700">End Time</label>
                                <input
                                    type="time"
                                    value={entry.endTime}
                                    onChange={(e) => handleScheduleChange(index, "endTime", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>



                            {schedule.length > 1 && (
                                <button
                                    type="button"
                                    className="text-red-500 mt-2"
                                    onClick={() => handleRemoveSchedule(index)}
                                >
                                    Remove Schedule
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddSchedule}
                        className="text-blue-500 mb-4"
                    >
                        Add More Schedule
                    </button>
                </div>


                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    {isEditMode ? "Update Class" : 'Add Class'}
                </button>
            </form>
        </div>
    );
};

export default AddClass;
