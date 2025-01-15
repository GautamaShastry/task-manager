import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectToMongo from "./db/connectToMongo.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8001;

app.use(express.json()); // to parse incoming requests with JSON payloads(from req.body)


app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectToMongo(); // connect to MongoDB database
    console.log(`Server running on port ${PORT}`);
});