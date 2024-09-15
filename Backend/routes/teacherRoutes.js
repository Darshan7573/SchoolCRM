import express, { json } from 'express'
import Teacher from '../models/Teacher.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

router.post('/add-teachers', async (req, res) => {
    const { fullname, username, password, contact, salary, classAssigned } = req.body

    try {
        const existingTeacher = await Teacher.findOne({ username })
        if (existingTeacher) {
            return res.status(400).json({ message: 'Username already exists' })
        }

        const newTeacher = new Teacher({
            fullname,
            username,
            password,
            contact,
            salary,
            classAssigned
        })

        await newTeacher.save();

        const payload = {
            userId: newTeacher._id,
            username: newTeacher.username,
            role: 'teacher'
        }

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })

        res.status(201).json({
            message: 'Techer added successfully',
            token
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router