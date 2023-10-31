import jobs from "../models/Jobs.js"

export const createJob = async(req, res, next) => {            
    const newJob = new jobs.job({
        name: req.body.name,
        status: req.body.status,
        type: req.body.type,
        description: req.body.description
    });                    

    const subJobItems = req.body.subJobs;          

    subJobItems.forEach((item) => {
        const newSubJob = new jobs.subJob({
            job: newJob._id,
            name: item.name,
            status: item.status,
            type: item.type,
            description: item.description,
        });
        
        newSubJob.save();
        newJob.subJobs.push(newSubJob._id)
    })                

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