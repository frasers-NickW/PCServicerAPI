import mongoose from "mongoose";
const JobSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },        
        objectives: [{objective: String}]
    },
    { timestamps: true }
);

export default mongoose.model("Job", JobSchema);