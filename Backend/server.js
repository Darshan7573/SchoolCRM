import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import adminRoutes from './routes/adminRoutes.js'
import teacherRoutes from './routes/teacherRoutes.js'
import studentRoutes from './routes/studentRouter.js'
import classRoutes from './routes/classRouters.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const mongooseUrl = process.env.MONGOOSE_URL;


app.use(express.json())
app.use(cors())

app.use('/api/admin', adminRoutes)
app.use('/api/teachers', teacherRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/classes', classRoutes)

mongoose.connect(mongooseUrl)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err))


app.listen(3000, () => {
    console.log('SERVER CONNECTED')
})

app.get('/', (req, res) => {
    res.send("Hello from server")
})