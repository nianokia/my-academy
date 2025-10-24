import { useState, useContext } from 'react';
import { loginUser } from '../api/auth';
import AuthContext from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router';

export default function LoginForm() {
  // --- Set initial form data ---
  const [formData, setFormData] = useState({ email: '', password_hash: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- Handle event changes ---
  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    // --- Prevent default form submission ---
    event.preventDefault();

    try {
      // --- Make API call to login user ---
      const res = await loginUser(formData);
      const { token, user } = res.data;

      // --- Update global auth state via context ---
      login(user, token);

      console.log('Logged in successfully!');
      console.log('User Data:', user);

      // --- Redirect based on role ---
      navigate(user.role === 'student' ? '/student' : '/instructor');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-around' }}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password_hash" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}
