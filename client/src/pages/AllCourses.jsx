import { useState, useEffect } from "react";
import { BackButton } from "../constants/constants";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  // --- Define the API route using the environment variable ---
  const tableRoute = `${import.meta.env.VITE_DOMAIN}/api/courses`;
  console.log('Table Route:', tableRoute);
  
  // -------- FETCH ALL USERS --------
  const fetchCourses = async () => {
    try {
      const response = await fetch(tableRoute);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched courses:', data);
      
      setCourses(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };
    
  // --- Call fetchUsers whenever the tableRoute changes ---
  useEffect(() => {
    fetchCourses();
  }, [tableRoute]);

  return (
    <>
      <BackButton />
      <h1>Course List</h1>
      <ul>
          {courses.map((course) => (
          <ul>
            <li>Name: {course.name}</li>
            <li>Credits: {course.credits}</li>
            <li>Enrollment Limit: {course.enrollment_limit}</li>
            <li>Created by: {course.created_by}</li>
            <li>Created at: {course.created_at}</li>
            <li>ID: {course.id}</li>
          </ul>
        ))}
        {courses.length === 0 && <li>No courses found.</li>}
      </ul>
    </>
  )
}

export default AllCourses;