import { useState } from 'react';
import { registerUser } from '../api/auth';

export default function InstructorRegister() {
  // --- Set default role to 'instructor' for InstructorRegister form ---
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password_hash: '', role: 'instructor' });

  // --- Handle event changes ---
  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    // --- Prevent default form submission behavior ---
    event.preventDefault();

    try {
      // --- Make API call to register user ---
      await registerUser(formData);
      
      alert('Registered successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="first_name" type="text" placeholder="First Name" required onChange={handleChange} />
      <input name="last_name" type="text" placeholder="Last Name" required onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
      <input name="password_hash" type="password" placeholder="Password" required onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}
