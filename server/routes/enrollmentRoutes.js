import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { 
    enrollStudents, 
    getStudentEnrollments, 
    getEnrolledStudents, 
    enrollStudent, 
    unenrollStudent,
    unenrollStudentByStudent,
} from '../controllers/enrollmentController.js';

const router = express.Router();

// -------- INSTRUCTOR ROUTES --------
router.get('/:courseId/students', verifyToken, getEnrolledStudents);
router.post('/:courseId/enroll', verifyToken, enrollStudents)
router.delete("/:courseId/unenroll/:studentId", verifyToken, unenrollStudent);

// -------- STUDENT ROUTES --------
router.get("/student/:studentId", verifyToken, getStudentEnrollments);
router.post("/student/:studentId/enroll/:courseId", verifyToken, enrollStudent);
router.delete("/student/:studentId/unenroll/:courseId", verifyToken, unenrollStudentByStudent);

export default router;