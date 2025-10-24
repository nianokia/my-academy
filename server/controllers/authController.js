import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import 'dotenv/config';

// -------- DEFINE USER REGISTRATION CONTROLLER --------
export const register = async (req, res) => {
    // --- destructure req.body to retrieve the following properties ---
    const { first_name, last_name, email, password_hash, role, major } = req.body;

    try {
        // --- hash the password before storing in db ---
        const hashedPassword = await bcrypt.hash(password_hash, 10);

        // --- add properties from req.body into users table through the create User model ---
        const newUser = await User.create({ first_name, last_name, email, password_hash: hashedPassword, role, major });
        
        res.status(201).json({ 
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                role: newUser.role,
                major: newUser.major
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

// -------- DEFINE USER LOGIN CONTROLLER --------
export const login = async (req, res) => {
    // --- destructure req.body to retrieve email and password ---
    const { email, password_hash } = req.body;

    try {
        // --- find user by email ---
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }

        // --- compare provided password with stored hashed password ---
        const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed: Invalid password' });
        }

        // --- generate JWT token ---
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'Login successful', token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};