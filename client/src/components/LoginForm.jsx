import { useState } from 'react';
import { loginUser } from '../api/auth';

export default function LoginForm() {
  // --- Set initial form data ---
  const [formData, setFormData] = useState({ email: '', password_hash: '' });

  // --- Handle event changes ---
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    // --- Prevent default form submission behavior ---
    e.preventDefault();

    try {
      // --- Make API call to login user ---
      const res = await loginUser(formData);

      // --- Store the received token in localStorage ---
      localStorage.setItem('token', res.data.token);

      alert('Logged in successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password_hash" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}
