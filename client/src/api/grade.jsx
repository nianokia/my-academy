import axios from "axios";

// -------- DEFINE USER API BASE URL --------
const API_URL = `${import.meta.env.VITE_DOMAIN}/api/grades`;
console.log('GRADE API URL:', API_URL);

// ------------ GET OPERATIONS ------------
// -------- FETCH STUDENT'S GRADES --------
export const fetchStudentGrades = async (studentId, token) => {
  const res = await axios.get(`${API_URL}/student/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// -------- FETCH INSTRUCTOR'S ASSIGNED GRADES --------
export const fetchInstructorGrades = async (token) => {
  const res = await axios.get(`${API_URL}/instructor`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// -------- FETCH GRADE HISTORY FOR ENROLLMENT --------
export const fetchGradeHistory = async (enrollmentId, token) => {
  const res = await axios.get(`${API_URL}/history/${enrollmentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


// ------------ CREATE OPERATIONS ------------
// -------- ASSIGN GRADE --------
export const assignGrade = async (enrollmentId, grade, token) => {
  const res = await axios.post(`${API_URL}/assign/${enrollmentId}`, { grade }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
