import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(401).json({ error: "Access denied. Invalid token." });
        }

        const user = await User.findById(verified.userId).select("-password");
        if(!user){
            return res.status(401).json({ error: "Access denied. User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in verifyToken middleware: ", error.message);
        res.status(500).json({ error: "Something went wrong..." });
    }
};

export default verifyToken;