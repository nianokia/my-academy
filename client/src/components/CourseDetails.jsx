import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { BackButton } from "../constants/constants";
import { fetchCourseById } from "../api/course";
import AuthContext from "../context/AuthContext";
import EditCourse from "./EditCourse";
import Modal from "./Modal";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // --- Close modal & reset role ---
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <BackButton />
      <h1>Course Details</h1>
      {!course ? (
        <p>Course not found.</p>
      ) : (
        <ul className='courseList'>
          <li key={course.id} value={course.id} className="singleCourse">
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem auto' }}>
              <h3 style={{ margin: '0' }}>{course.name}</h3>
              <button className="editProfileIcon" onClick={() => setIsModalOpen(true)}>✎</button>
            </div>
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
      
      {/* -------- EDIT COURSE MODAL -------- */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* --- Render the appropriate registration form based on the selected role --- */}
        <EditCourse courseId={courseId} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </>
  );
};

export default CourseDetails;