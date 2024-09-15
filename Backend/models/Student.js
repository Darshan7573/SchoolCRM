import mongoose, { mongo } from 'mongoose'
import bcrypt from 'bcryptjs'

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    usernam: {
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
        unique: true,
        trim: true
    },
    classAssigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    feesPaid: {
        type: Number,
        required: true
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

studentSchema.pre('save', async (next) => {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const Student = mongoose.model('Student', studentSchema)

export default Student