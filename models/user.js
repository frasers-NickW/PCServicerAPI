import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: { type: String, trim: true, default: null },
    last_name: { type: String, trim: true, default: null },
    email: { type: String, trim: true, unique: true },
    password: { type: String },
    token: { type: String },
})

const user = mongoose.model("user", userSchema);

export default user;