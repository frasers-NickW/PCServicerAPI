import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async(req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All Inputs are required");
        }
    
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
            return res.status(409).send("User already exists, Please login");
        }
    
        //Encrypt Password
        const encryptedPassword = await bcrypt.hash(password, 10);
    
        const user = new User({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
    
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
    
        user.token = token;

        await user.save();        
    
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
    
}

export const loginUser = async(req, res, next) => {
    try {
        const {email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All inputs are required");
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create Token
            const token = jwt.sign(
                { user_id: user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2hr",
                }
            );

            user.token = token;

            res.status(200).send('User Login Successful');
        } else {
            res.status(400).send("Invalid Credentials");
        }        
    } catch (err) {
        console.log(err);
    }
}