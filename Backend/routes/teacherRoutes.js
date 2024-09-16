import express, { json } from 'express'
import Teacher from '../models/Teacher.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

router.post('/add-teachers', async (req, res) => {
    const { fullname, username, password, contact, salary } = req.body

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
            // classAssigned
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


router.get('/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find()
        res.status(200).json(teachers)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/teachers-update', async (req, res) => {

    const { teacherId, updateData } = req.body
    console.log(req.body)

    try {
        const updateTeachers = await Teacher.findByIdAndUpdate(
            { _id: teacherId },
            { $set: updateData },
            { new: true, runValidators: true }
        )

        if (!updateTeachers) {
            res.status(404).json({ message: "Teacher not found" })
        }

        res.status(200).json({
            message: "Teacher updated successfully",
            updateTeachers
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router