import express from "express";
import { createTask, getAllTasks,updateTaskStatus,getTaskById, updateTask, deleteTask , archiveTask,getAllArchiveTasks, StartTask, PauseTask, CompleteTask, updateTaskDetailsDescription, restoreTask, updateTaskForEdit } from "../controllers/task.controller.js";
import authenticateToken from "../middlewares/authenticate.js";

const router = express.Router();


router.post("/createTask", createTask);           // Create a new Task
router.get("/getAllTasks" ,authenticateToken,getAllTasks);           // Get all Tasks
router.get("/getTaskById/:id", getTaskById);       // Get a single Task by ID
router.put("/updateTask/:id", updateTask);        // Update a Task by ID
router.put("/updateTaskForEdit/:id", updateTaskForEdit);        // Update a Task by ID
router.delete("/deleteTask/:id", deleteTask);     // Delete a Task by ID
router.put("/archiveTask/:id",authenticateToken, archiveTask);     // archive a Task by ID
router.put("/restoreTask/:id",authenticateToken, restoreTask);     // archive a Task by ID
router.get("/getAllArchiveTasks",authenticateToken, getAllArchiveTasks);     // archive a Task by ID
router.post("/updateTaskStatus/:id", updateTaskStatus);     // archive a Task by ID
router.post("/StartTask/:id", StartTask);     // archive a Task by ID
router.post("/PauseTask/:id", PauseTask);     // archive a Task by ID
router.post("/CompleteTask/:id", CompleteTask);     // archive a Task by ID
router.post("/updateTaskDetailsDescription/:id", updateTaskDetailsDescription);     // archive a Task by ID



export default router;
