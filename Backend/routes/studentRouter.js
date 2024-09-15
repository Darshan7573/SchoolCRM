import express from 'express'
import Student from '../models/Student.js'

const router = express.Router()

router.post('/add-student', async (req, res) => {
    const { fullname, username, password, contact, classAssigned, feesPaid, dob, gender } = req.body
    try {
        const existingStudent = await Student.findOne({ username })
        if (existingStudent) {
            return res.status(400).json({ message: 'Username already exists' })
        }

        const newStudent = new Student({
            fullname,
            username,
            password,
            contact,
            classAssigned,
            feesPaid,
            gender,
            dob
        })

        await newStudent.save()

        res.status(201).json({ message: 'Student added successfully', student: newStudent })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router