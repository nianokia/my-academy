import axios from "axios";

// -------- DEFINE USER API BASE URL --------
const API_URL = `${import.meta.env.VITE_DOMAIN}/api/enrollments`;
console.log('ENROLLMENT API URL:', API_URL);


// ------------ GET OPERATIONS ------------
// -------- FETCH ALL ENROLLED STUDENTS --------
export const fetchEnrolledStudents = async (courseId, token) => {
  const res = await axios.get(`${API_URL}/${courseId}/students`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
