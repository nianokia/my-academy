import axios from "axios";

// -------- DEFINE USER API BASE URL --------
const API_URL = `${import.meta.env.VITE_DOMAIN}/api/courses`;
console.log('COURSE API URL:', API_URL);

// ------------ GET OPERATIONS ------------
// -------- FETCH ALL COURSES --------
export const fetchCourses = async (token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await axios.get(API_URL, { headers });
  return res.data;
};

// -------- FETCH USER'S COURSES --------
export const fetchUserCourses = async (userId, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await axios.get(`${API_URL}/instructor/${userId}`, { headers });
  return res.data;
};

// -------- FETCH SINGLE COURSE DETAILS --------
export const fetchCourseById = async (courseId, token) => {
  const res = await axios.get(`${API_URL}/${courseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


// ------------ POST OPERATIONS ------------
// -------- CREATE COURSE --------
export const createCourse = async (courseData, token) => {
  const res = await axios.post(API_URL, courseData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ------------ PUT OPERATIONS ------------
// // -------- UPDATE A COURSE --------
export const updateCourse = async (courseId, updatedData, token) => {
  const res = await axios.put(`${API_URL}/${courseId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};