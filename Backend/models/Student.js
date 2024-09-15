import mongoose, { mongo } from 'mongoose'
import bcrypt from 'bcryptjs'

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },

    classAssigned: {
        type: String,
        required: true
    },

    feesPaid: {
        type: Number,
        required: true,
        default: 0
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    }
}, { timestamps: true })

studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const Student = mongoose.model('Student', studentSchema)

export default Student