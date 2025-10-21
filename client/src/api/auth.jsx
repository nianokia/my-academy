import axios from "axios";

// -------- DEFINE AUTH API BASE URL --------
const API_URL = `${import.meta.env.VITE_DOMAIN}/api/auth`;
console.log('API URL:', API_URL);

// -------- DEFINE AUTH API CALLS USING AXIOS --------
export const registerUser = (data) => axios.post(`${API_URL}/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/login`, data);