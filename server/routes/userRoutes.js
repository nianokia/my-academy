import express from 'express';
import { updateUser } from '../controllers/userController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// -------- UPDATE USER PROFILE ROUTE --------
router.put('/:id', verifyToken, updateUser);

export default router;