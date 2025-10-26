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

// ------------ CREATE OPERATIONS ------------
// -------- ENROLL STUDENTS --------
export const enrollStudents = async (courseId, studentIds, token) => {
  const res = await axios.post(
    `${API_URL}/${courseId}/enroll`,
    { studentIds },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// ------------ DELETE OPERATIONS ------------
// -------- UNENROLL STUDENT --------
export const unenrollStudent = async (courseId, studentId, token) => {
  const res = await axios.delete(`${API_URL}/${courseId}/unenroll/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
