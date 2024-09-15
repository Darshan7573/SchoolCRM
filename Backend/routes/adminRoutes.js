import express from 'express'
import Admin from '../models/Admin.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const router = express.Router()

dotenv.config()


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email })
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" })
        }

        const newAdmin = new Admin({
            name,
            email,
            password,
        })

        await newAdmin.save()

        const token = jwt.sign({ id: newAdmin._id, role: newAdmin.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.status(201).json({
            message: 'Admin registered successfully',
            token
        })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong', error
        })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        });
    }
});

export default router