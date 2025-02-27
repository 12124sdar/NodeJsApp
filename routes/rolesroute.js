import express from "express";
import { getAllRoles} from "../controllers/roles.controller.js";

const router = express.Router();


router.get("/getRoles", getAllRoles);           // Create a new Task
 


export default router;
