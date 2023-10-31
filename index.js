import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jobsRoute from "./routes/jobs.js";
import userRoute from "./routes/users.js";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to Database");
    } catch (err) {
        console.log(err);
        throw(err);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDb disconnected");
})

app.get("/", (req, res) => {
    res.send("hello first request");
})
app.use(express.json());

app.use("/jobs", jobsRoute)
app.use("/users", userRoute)

app.listen(8800, () => {
    connect();
    console.log("Connected to Back-End")
})