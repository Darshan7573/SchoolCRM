import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
    classname: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true
    },
    teacherAssigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    studentLimit: {
        type: Number,
        default: 45,
    }
}, { timestamps: true })

const Class = mongoose.model('Class', classSchema)

export default Class