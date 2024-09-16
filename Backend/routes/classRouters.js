import express from 'express';
import Class from '../models/Class.js';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';

const router = express.Router();

router.post('/add-class', async (req, res) => {
    const { classname, year, teacherAssigned, students, studentLimit, schedule, teacherId } = req.body;

    try {
        // Check if a class with the same name and year already exists
        const existingClass = await Class.findOne({ classname, year });
        if (existingClass) {
            return res.status(400).json({ message: "Class with the same name and year already exists" });
        }

        // Validate teacher assignment
        const teacher = await Teacher.findById(teacherAssigned);
        if (!teacher) {
            return res.status(400).json({ message: "Assigned teacher does not exist" });
        }

        // Validate students
        if (!students || !Array.isArray(students)) {
            return res.status(400).json({ message: 'Students list is invalid or missing' })
        }

        const studentIds = await Student.find({ _id: { $in: students } });
        if (studentIds.length !== students.length) {
            return res.status(400).json({ message: "Some student ID's are invalid" });
        }

        if (schedule && Array.isArray(schedule) && schedule.length > 0) {
            for (const entry of schedule) {
                if (!entry.subject || !entry.dayOfWeek || !entry.startTime || !entry.endTime) {
                    return res.status(400).json({ message: "Each schedule entry must have subject, dayOfWeek, startTime, and endTime" });
                }

                const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                if (!validDays.includes(entry.dayOfWeek)) {
                    return res.status(400).json({ message: `Invalid dayOfWeek: ${entry.dayOfWeek}` });
                }
            }
        }

        // Create new class
        const newClass = new Class({
            classname,
            year,
            teacherAssigned: teacherId,
            students,
            studentLimit,
            schedule // Save the schedule data
        });

        // Save the class to the database
        await newClass.save();

        res.status(201).json({ message: "Class added successfully", class: newClass });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/student/classes/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;

        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        const classes = await Class.find({ students: studentId }).populate('teacherAssigned');

        if (classes.length === 0) {
            return res.status(404).json({ message: 'No classes found for this student' });
        }

        res.status(200).json(classes);
    } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).json({ error: error.message });
    }
});


router.get('/teacher/classes/:teacherId', async (req, res) => {
    try {
        const { teacherId } = req.params;

        if (!teacherId) {
            return res.status(404).json({ message: "No classes found for this Teacher" })
        }
        // Find all classes where the teacher is assigned
        const classDetails = await Class.find({ teacherAssigned: teacherId })
            // .populate('teacherAssigned') // Populate teacher details
            .populate('students');       // Populate student details

        if (classDetails.length === 0) {
            return res.status(404).json({ message: 'No classes found for this teacher' });
        }

        res.status(200).json(classDetails);
    } catch (error) {
        console.error('Error fetching class details:', error);
        res.status(500).json({ error: error.message });
    }
});



router.get('/classes', async (req, res) => {
    try {
        const classes = await Class.find()
        res.status(200).json(classes)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})


router.get('/classes/:classId', async (req, res) => {
    const { classId } = req.params
    try {
        const classData = await Class.findById(classId)
        if (!classData) {
            return res.status(404).json({ message: "Class not found" })
        }
        res.status(200).json(classData)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

router.patch('/classes-update/:classId', async (req, res) => {
    const { classId } = req.params
    const { updateData } = req.body
    try {
        const updatedClasses = await Class.findByIdAndUpdate(
            classId,
            { $set: updateData },
            { new: true, runValidators: true }
        )
        if (!updatedClasses) {
            res.status(404).json({ message: "Class not found" })
        }

        res.status(200).json({
            message: "Successfully Updated",
            updatedClasses
        })
    } catch (error) {
        console.log('Error Updating the Clas:', error)
        res.status(404).json({ error: error.message })
    }
})

router.patch('/classes-update-schedule', async (req, res) => {
    const { classesId, newSchedule } = req.body;

    try {
        const updatedClass = await Class.findByIdAndUpdate(
            classesId,
            { $set: { schedule: newSchedule } },  // Replace the schedule array
            { new: true, runValidators: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        res.status(200).json({
            message: "Schedule successfully updated",
            updatedClass
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.patch('/classes-update-schedule-item', async (req, res) => {
    const { classesId, scheduleIndex, updatedScheduleItem } = req.body;

    try {
        const classData = await Class.findById(classesId);

        if (!classData) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Check if the schedule index is valid
        if (scheduleIndex < 0 || scheduleIndex >= classData.schedule.length) {
            return res.status(400).json({ message: "Invalid schedule index" });
        }

        // Update the specific schedule entry
        classData.schedule[scheduleIndex] = { ...classData.schedule[scheduleIndex], ...updatedScheduleItem };

        // Save the updated class
        await classData.save();

        res.status(200).json({
            message: "Schedule item successfully updated",
            classData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/classes/:id', async (req, res) => {
    try {
        const classId = req.params.id;
        const result = await Class.findByIdAndDelete(classId);

        if (!result) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
        console.error('Error deleting class:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


export default router;
