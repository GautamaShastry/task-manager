// user profile management

import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password"); // exclude password field
        if(!user) return res.status(404).json({ error: "User not found" }); 
        {/* well user may have authenticated already but, could have been deleted manually in the database(rare) */}

        res.status(200).json({
            _id: user._id,
            fullName: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
        });
    } catch (error) {
        console.log("Error in get user profile: ", error.message);
        res.status(500).json({ error: "Something Went Wrong..." });
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if(!user) return res.status(404).json({ error: "User not found" });

        user.firstName = req.body.firstName || user.firstName; // if no new value is provided, keep the existing one
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.username = req.body.username || user.username;

        // update the password
        if(req.body.password) {
            const { password, confirmPassword } = req.body;
            if(password!== confirmPassword){
                return res.status(400).json({ error: "Password do not match"});
            }
            if(password.length < 6) {
                return res.status(400).json({ error: "Password must be at least 6 characters long"});
            }
            // hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }
        
        const updatedUser = await user.save(); // save the updated user in the database

        res.status(200).json({
            _id: updatedUser._id,
            fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            username: updatedUser.username
        });
    } catch (error) {
        console.log("Error in update user profile: ", error.message);
        res.status(500).json({ error: "Something Went Wrong..." });
    }
}

export const deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if(!user) return res.status(404).json({ error: "User not found" });

        await user.deleteOne(); // delete the user from the database
        {/* deleteOne() for faster deletions and they ignore hooks */}
        
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log("Error in delete user profile: ", error.message);
        res.status(500).json({ error: "Something Went Wrong..." });
    }
}