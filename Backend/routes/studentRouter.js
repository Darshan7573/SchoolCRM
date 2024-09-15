import express from 'express'
import Student from '../models/Student.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

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

        const payload = {
            userId: newStudent._id,
            username: newStudent.username,
            role: 'student'
        }

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })

        res.status(201).json({ message: 'Student added successfully', student: newStudent, token })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router