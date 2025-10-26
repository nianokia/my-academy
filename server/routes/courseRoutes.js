import express from "express";
import { getAllCourses, getUserCourses, getCourseById, createCourse, updateCourse } from "../controllers/courseController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllCourses);
router.get("/instructor/:userId", verifyToken, getUserCourses);
router.get("/:courseId", verifyToken, getCourseById);
router.post("/", verifyToken, createCourse);
router.put("/:courseId", verifyToken, updateCourse);

export default router;