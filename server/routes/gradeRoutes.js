import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { assignGrade, getStudentGrades, getInstructorGrades } from "../controllers/gradeController.js";

const router = express.Router();

router.post("/assign/:enrollmentId", verifyToken, assignGrade);
router.get("/student/:studentId", verifyToken, getStudentGrades);
router.get("/instructor", verifyToken, getInstructorGrades);

export default router;
