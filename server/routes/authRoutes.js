import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// -------- REGISTRATION ROUTE --------
router.post('/register', register);

// -------- LOGIN ROUTE --------
router.post('/login', login);

export default router;