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

        // Validate schedule (if provided)
        if (schedule && Array.isArray(schedule) && schedule.length > 0) {
            for (const entry of schedule) {
                if (!entry.subject || !entry.dayOfWeek || !entry.startTime || !entry.endTime) {
                    return res.status(400).json({ message: "Each schedule entry must have subject, dayOfWeek, startTime, and endTime" });
                }

                // Optionally, you can validate that the dayOfWeek is valid
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

export default router;
