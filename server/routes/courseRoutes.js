import express from "express";
import { getAllCourses } from "../controllers/courseController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/courses", verifyToken, getAllCourses);

export default router;