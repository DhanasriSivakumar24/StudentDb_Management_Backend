const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentName:
    {
        type: String,
        unique:true,
        required: true,
    },
    department:{
        type: String,
        unique:true,
        required: true,
    },
    studentRollNo:{
        type: Number,
        unique:true,
        required: true,
    }
})

const Student = mongoose.model("Student",studentSchema);

module.exports = Student;