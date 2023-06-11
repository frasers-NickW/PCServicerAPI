import Job from "../models/Jobs.js";

export const createJob = async(req, res, next) => {
    const newJob = new Job(req.body);

    try {
        const savedJob = await newJob.save()
        res.status(200).json(savedJob);
    } catch (err) {
        next(err);
    }
}

export const updateJob = async(req, res, next) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true}
        );
        res.status(200).json(updatedJob);
    } catch (err) {
        next(err);
    }
}

export const deleteJob = async (req, res, next) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedJob);
    } catch (err) {
        next(err);
    }
}

export const getJob = async(req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json(job);
    } catch (err) {
        next(err);
    }
}

export const getAllJobs = async(req, res, next) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        next(err);
    }
}