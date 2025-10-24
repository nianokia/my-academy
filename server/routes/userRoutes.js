import express from 'express';
import { updateUser, deleteUser } from '../controllers/userController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// -------- UPDATE USER PROFILE ROUTE --------
router.put('/:id', verifyToken, updateUser);

// -------- DELETE USER ROUTE --------
router.delete('/:id', verifyToken, deleteUser);

export default router;