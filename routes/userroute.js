import express from "express";
import { createUser, getAllUsers, validateToken,getUserById, updateUser, deleteUser , loginUser, getAllCategory,  getAllSubCategoryList } from "../controllers/user.controller.js";
import authenticateToken from "../middlewares/authenticate.js";

const router = express.Router();


router.post("/createUser", createUser);           // Create a new Task
router.get("/getAllUsers",authenticateToken, getAllUsers);           // Get all Tasks
router.get("/getAllCategory",authenticateToken, getAllCategory);           // Get all Tasks
router.get("/getAllSubCategoryList",authenticateToken, getAllSubCategoryList);           // Get all Tasks

router.get("/getUserById/:id",authenticateToken, getUserById);       // Get a single Task by ID
router.put("/updateUser/:id", updateUser);        // Update a Task by ID
router.post("/login", loginUser);        // Update a Task by ID
router.delete("/deleteUser/:id", deleteUser);     // Delete a Task by ID
router.get("/validateToken", validateToken);     // Delete a Task by ID


export default router;
