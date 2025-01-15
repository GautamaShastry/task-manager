import express from "express";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controller/taskController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/",verifyToken, createTask);

router.get("/",verifyToken, getTasks);

router.get("/:id",verifyToken, getTaskById);

router.put("/:id",verifyToken, updateTask);

router.delete("/:id",verifyToken, deleteTask);

export default router;