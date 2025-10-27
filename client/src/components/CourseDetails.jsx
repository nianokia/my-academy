import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { BackButton } from "../constants/constants";
import { fetchCourseById, deleteCourse } from "../api/course";
import AuthContext from "../context/AuthContext";
import EditCourse from "./EditCourse";
import Modal from "./Modal";
import ConfirmModal from "./ConfirmModal";
import InstructorEnrollments from "./InstructorEnrollments";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // --- get ID from the URL ---
  const { courseId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

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

  // --- dynamically display updated Course ---
  const handleUpdatedCourse = (updatedCourse) => {
    setCourse(updatedCourse);
  };

  const handleDelete = async (event) => {
    try {
      await deleteCourse(courseId, token);
      alert(`${course?.name ?? "Course"} has been deleted successfully!`);
      
      navigate(-1)
    } catch (err) {
      alert('Failed to delete course. Please try again.');
      console.error('Error deleting course: ', err)
    }
  }

  // --- Close modal & reset role ---
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="CourseDetails">
      <BackButton />
      {!course ? (
        <p>Course not found.</p>
      ) : (
        <>
          <header>
            <button className="editProfileIcon" onClick={() => setIsModalOpen(true)}>✎</button>
            <h1>{course.name}</h1>
          </header>
          <ul className='courseList'>
            <li key={course.id} value={course.id} className="singleCourse">              
              <ul>
                <li>ID: {course.id}</li>
                <li>Credits: {course.credits}</li>
                <li>Enrollment Limit: {course.enrollment_limit}
                  <ul>
                    <li>Currently Enrolled: {course.enrolled_count}</li>
                    <li>Seats Available: {course.seats_available}</li>
                  </ul>
                </li>
                <li>Created by: {course.created_by}</li>
                <li>Created at: {course.created_at}</li>
              </ul>
              <h2>Prerequisites</h2>
              {course.prerequisites?.length > 0 ? (
                <ul>
                  {course.prerequisites.map((prereq) => (
                    <li key={prereq.id}>{prereq.name}</li>
                  ))}
                </ul>
              ) : (
                <p>No prerequisites for this course.</p>
              )}
            </li>
          </ul>
          <InstructorEnrollments courseId={courseId} />
          <button className="deleteUserBtn" onClick={() => setIsDeleteModalOpen(true)}>Delete Course</button>
          
          {/* -------- DELETE COURSE MODAL -------- */}
          <ConfirmModal 
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            title={`Are you sure you want to delete "${course.name}"?`}
            message={`This action will permanently delete (${course.name}) from the database.`}
            confirmText="Yes, Delete"
            cancelText="No, Cancel"
          />
        </>
      )}

      {/* -------- EDIT COURSE MODAL -------- */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <EditCourse courseId={courseId} setIsModalOpen={setIsModalOpen} onCourseUpdated={handleUpdatedCourse} />
      </Modal>
    </div>
  );
};

export default CourseDetails;