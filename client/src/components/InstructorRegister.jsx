import { useState } from 'react';
import { registerUser } from '../api/auth';

// --- Send onSuccess prop from SignUp.jsx to here ---
export default function InstructorRegister({ onSuccess }) {
  // --- Set default role to 'instructor' for InstructorRegister form ---
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password_hash: '', role: 'instructor' });

  // --- Handle event changes ---
  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    // --- Prevent default form submission ---
    event.preventDefault();

    try {
      // --- Make API call to register user ---
      const res = await registerUser(formData);
      console.log('--- Register Response ---', res.data);

      const { user } = res.data;
      alert('Registered successfully!');

      // --- Call onSuccess callback with user role if it exists ---
      if (onSuccess) onSuccess(user.role);
    } catch (err) {
      alert(err.response?.data?.error || 'Error occurred');
      console.error('--- Err: ', err, 'Err.response: ',err.response, 'Err.response?.data: ', err.response?.data, 'Err.response?.data?.error: ', err.response?.data?.error, '---');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <input name="first_name" type="text" placeholder="First Name" required onChange={handleChange} />
      <input name="last_name" type="text" placeholder="Last Name" required onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
      <input name="password_hash" type="password" placeholder="Password" required onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}
