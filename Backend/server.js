import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import adminRoutes from './routes/adminRoutes.js'
import teacherRoutes from './routes/teacherRoutes.js'
import studentRoutes from './routes/studentRouter.js'
import classRoutes from './routes/classRouters.js'

const app = express()


app.use(express.json())
app.use(cors())

app.use('/api/admin', adminRoutes)
app.use('/api/teachers', teacherRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/classes', classRoutes)

mongoose.connect('mongodb+srv://darshu7375:grRl4soFvMiMknwI@cluster0.nay0y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err))


app.listen(3000, () => {
    console.log('SERVER CONNECTED')
})

app.get('/', (req, res) => {
    res.send("Hello from server")
})