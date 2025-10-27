import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { BackButton } from "../constants/constants";
import AddCourse from "./AddCourse";
import Modal from "./Modal";
import { fetchUserCourses } from "../api/course";
import { useNavigate } from "react-router";

const StudentCourses = ({ userId }) => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- Close modal ---
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // --- Define the API route using the environment variable ---
  const tableRoute = `${import.meta.env.VITE_DOMAIN}/api/courses`;
  console.log('Table Route:', tableRoute);
  
  // -------- FETCH ALL COURSES --------
  const getStudentCourses = async () => {
    try {
      const response = await fetchUserCourses(userId, token);
      console.log('Fetched Instructor\'s courses:', response);
      
      setCourses(response);
    } catch (err) {
      console.error('Error fetching instructor\'s courses:', err);
      alert("Failed to load instructor's courses. Please try again.")
    }
  };
    
  // --- Call getStudentCourses whenever the tableRoute changes ---
  useEffect(() => {
    if (token) getStudentCourses();
  }, [token]);

  return (
    <>
      <BackButton />
      <h1>My Courses</h1>
      <button className="addCourseBtn" onClick={() => setIsModalOpen(true)}>
        + COURSE
      </button>
      {courses.length > 0 ? (
        <>
          <ul className='courseList'>
            {courses.map((course) => (
              <li key={course.id} value={course.id} className="singleCourse" onClick={() => navigate(`/courses/${course.id}`)}>
                <strong>{course.name}</strong>
                <ul>
                  <li>Credits: {course.credits}</li>
                  <li>Enrollment Limit: {course.enrollment_limit}</li>
                </ul>
              </li>
            ))}
          </ul>
          <h4 style={{ textAlign: 'start', color: 'cornflowerblue', marginLeft: '30px' }}>(Total Courses: {courses.length})</h4>
        </>
      ) : (
        <p>No courses found.</p>
      )}

      {/* -------- ADD COURSE MODAL -------- */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddCourse onSuccess={handleCloseModal} />
      </Modal>
    </>
  );
};

export default StudentCourses;