import express, { json } from 'express'
import Teacher from '../models/Teacher.js'


const router = express.Router()

router.post('/add-teacher', async (req, res) => {
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

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router