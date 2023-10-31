import express from "express";
import { loginUser, registerUser } from "../controllers/user.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);

console.log('test test github');

export default router