import express from "express";
import { getAllCourses, getUserCourses, createCourse } from "../controllers/courseController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllCourses);
router.get("/instructor/:userId", verifyToken, getUserCourses);
router.post("/", verifyToken, createCourse);

export default router;