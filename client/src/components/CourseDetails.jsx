import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { BackButton } from "../constants/constants";
import { fetchCourseById } from "../api/course";
import AuthContext from "../context/AuthContext";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  // --- get ID from the URL ---
  const { courseId } = useParams();
  const { token } = useContext(AuthContext);

  const getCourse = async () => {
    try {
      const data = await fetchCourseById(courseId, token);
      setCourse(data);
      console.log("Course Details: ", data);
    } catch (err) {
      console.error("Error fetching course details: ", err);
    }
  };

  // --- Call getCourse whenever id or token changes ---
  useEffect(() => {
    getCourse();
  }, [courseId, token]);

  return (
    <>
      <BackButton />
      <h1>Course Details</h1>
      {!course ? (
        <p>Course not found.</p>
      ) : (
        <ul style={{ textAlign: 'start'}}>
          <li key={course.id} value={course.id}>
            <strong>{course.name}</strong>
            <ul>
              <li>ID: {course.id}</li>
              <li>Credits: {course.credits}</li>
              <li>Enrollment Limit: {course.enrollment_limit}</li>
              <li>Created by: {course.created_by}</li>
              <li>Created at: {course.created_at}</li>
            </ul>
          </li>
      </ul>
      )}
    </>
  );
};

export default CourseDetails;