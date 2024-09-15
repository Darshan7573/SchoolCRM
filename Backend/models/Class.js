import mongoose from 'mongoose';

const classScheduleSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        trim: true
    },
    dayOfWeek: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] // Ensure only valid days are entered
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

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
        default: 45
    },
    schedule: [classScheduleSchema] // Add an array of schedules
}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);

export default Class;
