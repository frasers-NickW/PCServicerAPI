import mongoose from "mongoose";
import { Schema } from "mongoose";

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
        subJobs: [
            { type: Schema.Types.ObjectId, ref: "SubJob" }
        ]            
    },
    { timestamps: true }
);

const SubJobSchema = new mongoose.Schema({
    job: {
        type: Schema.Types.ObjectId, ref: "Job", required: true
    },
    name: {
        type: String,
        require: true    
    },
    status: {
        type: String,        
        require: true
    },
    type: {
        type: String,    
        require: true
    },
    description: {
        type: String,        
        require: true
    },    
})

const job = mongoose.model("Job", JobSchema);
const subJob = mongoose.model("SubJob", SubJobSchema);

export default {job, subJob};