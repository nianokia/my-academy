import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { enrollStudents, getEnrolledStudents, unenrollStudents } from '../controllers/enrollmentController.js';

const router = express.Router();

router.get('/:courseId/students', verifyToken, getEnrolledStudents);
router.post('/:courseId/enroll', verifyToken, enrollStudents)
router.delete("/:courseId/unenroll/", verifyToken, unenrollStudents);

export default router;