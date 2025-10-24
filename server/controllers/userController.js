import User from '../models/User.js';
import bcrypt from 'bcrypt';

// -------- UPDATE USER CONTROLLER --------
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, email, password_hash, major } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // --- Hash new password if provided ---
        let updatedPasswordHash = user.password_hash;
        if (password_hash) {
            updatedPasswordHash = await bcrypt.hash(password_hash, 10);
        }

        // --- Update user fields ---
        await user.update({
            first_name: first_name || user.first_name,
            last_name: last_name || user.last_name,
            email: email || user.email,
            password_hash: updatedPasswordHash,
            major: major || user.major
        });

        // --- Get plain JS object ---
        const updatedUser = user.get({ plain: true });
        // --- Remove this property to not leak password in the response ---
        delete updatedUser.password_hash;

        res.status(200).json({ message: 'User updated successfully: ', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user: ', error: err.message });
    }
};

// -------- DELETE USER CONTROLLER --------
export const deleteUser = async (req, res) => {
   const userId = req.params.id;

    // --- Authenticate current userId to grant permission to delete ---
   if (req.user.userId !== userId) {
    return res.status(403).json({ message: "Unauthorized to delete this user." });
   }

   try {
       const user = await User.findByPk(userId);
       if (!user) {
           return res.status(404).json({ message: 'User not found' });
       }

        // --- Delete user from DB ---
       await user.destroy();
       res.status(200).json({ message: 'User deleted successfully' });
   } catch (err) {
       res.status(500).json({ message: 'Error deleting user', error: err.message });
   }
};
