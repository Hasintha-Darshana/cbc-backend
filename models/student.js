import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
    {
        name: String,
        age: Number,
        subject: String,
        email : String
    }
)

const Student = mongoose.model("students", studentSchema);

export default Student;