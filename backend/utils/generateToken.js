import jwt from "jsonwebtoken";

const generateCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    res.cookie("user", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "strict"
    });
};

export default generateCookie;