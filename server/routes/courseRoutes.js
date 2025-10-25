import express from "express";
import { getAllCourses, createCourse } from "../controllers/courseController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllCourses);
router.post("/", verifyToken, createCourse);

export default router;