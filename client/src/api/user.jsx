import axios from "axios";

// -------- DEFINE USER API BASE URL --------
const API_URL = `${import.meta.env.VITE_DOMAIN}/api/user`;
console.log('API URL:', API_URL);

// -------- FETCH ALL USERS --------
export const fetchUsers = async (token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await axios.get(API_URL, { headers });
  return res.data;
};

// -------- UPDATE USER -------
export const updateUser = async (userId, updatedData, token) => {
  const res = await axios.put(
    `${API_URL}/${userId}`,
    updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// -------- DELETE USER --------
export const deleteUser = async (userId, token) => {
  const res = await axios.delete(`${API_URL}/${userId}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return res.data;
}