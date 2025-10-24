import axios from "axios";

// -------- DEFINE USER API BASE URL --------
const API_URL = `${import.meta.env.VITE_DOMAIN}/api/user`;
console.log('API URL:', API_URL);

export const updateUser = async (userId, updatedData, token) => {
    const res = await axios.put(
        `${API_URL}/${userId}`,
        updatedData, {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return res.data;
};

export const deleteUser = async (userId, token) => {
    const res = await axios.delete(`${API_URL}/${userId}`, {
        headers: {Authorization: `Bearer ${token}`},
    });
    return res.data;
}