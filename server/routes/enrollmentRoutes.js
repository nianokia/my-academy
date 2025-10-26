import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { getEnrolledStudents } from '../controllers/enrollmentController.js';

const router = express.Router();

router.get('/:courseId/students', verifyToken, getEnrolledStudents);

export default router;