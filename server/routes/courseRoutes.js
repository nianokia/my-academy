import express from "express";
import { getAllCourses, getUserCourses, getCourseById, createCourse, updateCourse, deleteCourse } from "../controllers/courseController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllCourses);
router.get("/instructor/:userId", verifyToken, getUserCourses);
router.get("/:courseId", verifyToken, getCourseById);
router.post("/", verifyToken, createCourse);
router.put("/:courseId", verifyToken, updateCourse);
router.delete("/:courseId", verifyToken, deleteCourse);

export default router;