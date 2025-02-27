import express from "express";
import { createTaskDetails ,getDetailsByTaskId} from "../controllers/taskdetails.controller.js";
import authenticateToken from "../middlewares/authenticate.js";

const router = express.Router();


router.post("/createTaskDetails", createTaskDetails);           // Create a new Task
router.get("/getDetailsByTaskId/:id",getDetailsByTaskId);           // Create a new Task


export default router;
