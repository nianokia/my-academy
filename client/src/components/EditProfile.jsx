import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { updateUser } from "../api/user";

// -------- EDIT PROFILE COMPONENT --------
// --- retrieve prop from UserProfile ---
const EditProfile = ({ setIsModalOpen }) => {
  const { user, token, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: '',
    major: user.major || '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateUser(user.id, formData, token);

      const updatedUser = response.user || response;

      // --- Update user data & close modal ---
      setUser(updatedUser);
      alert('Profile updated successfully!');
      setIsModalOpen(false);
    } catch (error) {
      alert('Failed to update profile. Please try again.');
      console.error('Error updating profile:', error.name, '\n', error.message, '\n Url:', error.config.url);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="EditProfile">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="New Password" />
        {/* If user is a student, show major field */}
        {user.role === 'student' && (
          <input type="text" name="major" value={formData.major} onChange={handleChange} placeholder="Major" />
        )}
        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProfile;