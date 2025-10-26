import express from 'express';
import { updateUser, deleteUser, getAllUsers } from '../controllers/userController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// -------- GET ALL USERS ROUTE --------
router.get('/', verifyToken, getAllUsers)

// -------- UPDATE USER PROFILE ROUTE --------
router.put('/:id', verifyToken, updateUser);

// -------- DELETE USER ROUTE --------
router.delete('/:id', verifyToken, deleteUser);

export default router;