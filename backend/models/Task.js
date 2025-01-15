import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
    },
    dueDate: {
        type: Date
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;