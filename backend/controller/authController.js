import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, confirmPassword } = req.body;
        
        // check if password matches confirm password
        if(password !== confirmPassword){
            return res.status(400).json({ error: "Password do not match"});
        }


        const user = await User.findOne({username});

        // check if user already exists 
        if(user){
            res.status(400).json({error : "User already exists"});
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user object with hashed password
        const newUser = new User({
            firstName,
            lastName,
            username,
            email, 
            password: hashedPassword
        });

        if(newUser){

            generateCookie(newUser._id, res); // generate JWT token and set it in the response cookie
            await newUser.save(); // save to database

            res.status(201).json({
                _id: newUser._id,
                fullName: `${newUser.firstName} ${newUser.lastName}`,
                password: hashedPassword,
                email: newUser.email
            })
        } else {
            res.status(400).json({ error: "Invalid User Data" });
        }
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({ error: "Something Went Wrong..." });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if(!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user?.password || ""); // compare password with hashed password in database

        // check if user exists
        if(!isMatch) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // generate JWT token
        generateCookie(user._id, res); // if user is already logged in, generate a new token and update the old token in the database

        res.status(201).json({
            _id: user._id,
            fullName: `${user.firstName} ${user.lastName}`,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({ error: "Something Went Wrong..." });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("user", "", { maxAge: 0  }); // delete the token from the response
        res.status(200).json({ message: "Logged Out Successfully" }); // send a success message back to the client
    } catch (error) {
        console.log("Error in logout controller: ", error.message);
        res.status(500).json({ error: "Something Went Wrong..." });
    }
}