import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import adminRoutes from './routes/adminRoutes.js'

const app = express()


app.use(express.json())
app.use(cors())

app.use('/api/admin', adminRoutes)

mongoose.connect('mongodb+srv://darshu7375:grRl4soFvMiMknwI@cluster0.nay0y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err))


app.listen(3000, () => {
    console.log('SERVER CONNECTED')
})

app.get('/', (req, res) => {
    res.send("Hello from server")
})