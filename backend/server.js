import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectToMongo from "./db/connectToMongo.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8001;

app.use(express.json()); // to parse incoming requests with JSON payloads(from req.body)
app.use(cookieParser()); //


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes)
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    connectToMongo(); // connect to MongoDB database
    console.log(`Server running on port ${PORT}`);
});