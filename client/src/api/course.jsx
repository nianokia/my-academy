import axios from "axios";

// -------- DEFINE USER API BASE URL --------
const API_URL = `${import.meta.env.VITE_DOMAIN}/api/courses`;
console.log('COURSE API URL:', API_URL);

// ------------ GET OPERATIONS ------------
// -------- FETCH ALL COURSES --------
export const fetchCourses = async (token) => {
    const res = await axios.get(API_URL, {
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