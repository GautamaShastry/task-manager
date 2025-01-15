import express from "express";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controller/taskController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/tasks",verifyToken, createTask);

router.get("/tasks",verifyToken, getTasks);

router.get("/tasks/:id",verifyToken, getTaskById);

router.put("/tasks/:id",verifyToken, updateTask);

router.delete("/tasks/:id",verifyToken, deleteTask);

export default router;