import express from 'express'
import Student from '../models/Student.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

router.post('/add-student', async (req, res) => {
    const { fullname, username, password, contact, classAssigned, feesPaid, dob, gender } = req.body

    const normalizedUsername = (username || '').toLowerCase().trim()

    if (!normalizedUsername || !contact) {
        return res.status(400).json({ message: 'Username and contact are required' })
    }

    try {
        const existingStudent = await Student.findOne({ username: normalizedUsername })
        if (existingStudent) {
            return res.status(400).json({ message: 'Username already exists' })
        }

        const newStudent = new Student({
            fullname,
            username: normalizedUsername,
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
        console.error('Error details:', error); // Log the complete error details for debugging

        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0]; // Extract the field that caused the error
            const value = error.keyValue[field]; // Extract the value of the field

            // Respond with a detailed error message
            res.status(400).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists` });
        } else {
            // General error handling
            res.status(500).json({ error: error.message });
        }
    }
})

router.get('/students', async (req, res) => {
    try {
        const students = await Student.find()
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router