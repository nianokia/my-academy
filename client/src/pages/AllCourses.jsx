import { useState, useEffect, useContext } from "react";
import { BackButton } from "../constants/constants";
import AuthContext from "../context/AuthContext";
import { fetchCourses } from "../api/course";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const { token } = useContext(AuthContext);

  // --- Define the API route using the environment variable ---
    const tableRoute = `${import.meta.env.VITE_DOMAIN}/api/courses`;
    console.log('Table Route:', tableRoute);
    
    // -------- FETCH ALL COURSES --------
    const getCourses = async () => {
      try {
        const response = await fetchCourses(token);
        
        setCourses(response);
      } catch (err) {
        console.error('Error fetching courses:', err);
        alert("Failed to load courses. Please try again.")
      }
    };
      
    // --- Call fetchCourses whenever the tableRoute changes ---
    useEffect(() => {
      if (token) getCourses();
    }, [token]);
  ;

  return (
    <>
      <BackButton />
      <h1>Course List</h1>
      <ul style={{ textAlign: 'start' }}>
        {courses.map((course) => (
          <li key={course.id} value={course.id}>
            <strong>{course.name}</strong>
            <ul>
              <li>Credits: {course.credits}</li>
              <li>Enrollment Limit: {course.enrollment_limit}</li>
              <li>Created by: {course.created_by}</li>
            </ul>
          </li>
        ))}
        {courses.length === 0 && <li>No courses found.</li>}
      </ul>
    </>
  )
}

export default AllCourses;