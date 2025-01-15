import express from "express";
import { createTask, deleteTask, getTaskById, getTasks, updateTask, updateTaskStatus } from "../controller/taskController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/",verifyToken, createTask);

router.get("/",verifyToken, getTasks);

router.get("/:id",verifyToken, getTaskById);

router.put("/:id",verifyToken, updateTask);

router.delete("/:id",verifyToken, deleteTask);

router.patch("/:id/status", verifyToken, updateTaskStatus);

export default router;