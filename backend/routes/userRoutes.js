import verifyToken from "../middleware/verifyToken.js";
import express from "express";
import { deleteUserProfile, getUserProfile, updateUserProfile } from "../controller/userController.js";

const router = express.Router();

router.get("/profile", verifyToken, getUserProfile);

router.put("/profile", verifyToken, updateUserProfile);

router.delete("/profile", verifyToken, deleteUserProfile);

export default router;