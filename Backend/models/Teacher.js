import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const teacherSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    classAssigned: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to Class model
        ref: 'Class',
    },
    salary: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher
