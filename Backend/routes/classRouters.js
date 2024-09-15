import express from 'express'
import Class from '../models/Class.js'
import Teacher from '../models/Teacher.js'
import Student from '../models/Student.js'


const router = express.Router()

router.post('/add-class', async (req, res) => {
    const { classname, year, teacherAssigned, students, studentLimit } = req.body

    try {
        const existingClass = await Class.findOne({ classname, year })
        if (existingClass) {
            return res.status(400).json({ message: "Class with the same name and year already exists" })
        }

        const teacher = await Teacher.findById(teacherAssigned)
        if (!teacher) {
            return res.status(400).json({ message: "Assigned teacher does not exist" })
        }

        const studentIds = await Student.find({ _id: { $in: students } })
        if (studentIds.length !== students.length) {
            return res.status(400).json({ message: "Some student ID's are invalid" })
        }

        const newClass = new Class({
            classname,
            year,
            teacherAssigned,
            students,
            studentLimit
        })

        await newClass.save()

        res.status(201).json({ message: "Class added successfully", class: newClass })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router