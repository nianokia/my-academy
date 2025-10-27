import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { BackButton } from "../constants/constants";
import { unenrollStudentByStudent } from "../api/enrollment";
import { fetchCourseById } from "../api/course";
import AuthContext from "../context/AuthContext";
import ConfirmModal from "./ConfirmModal";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // --- get ID from the URL ---
  const { courseId } = useParams();
  const { user, token } = useContext(AuthContext);
  const userId = user?.id;
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

  // -------- UNENROLL IN COURSE --------
  const handleUnenroll = async () => {
    try {
      await unenrollStudentByStudent(userId, course.id, token);
      alert(`Unenrolled from ${course.name}`);
      setIsModalOpen(false);
      navigate(-1);
    } catch (err) {
      console.error("Error unenrolling:", err);
      alert("Failed to unenroll");
    }
  };

  return (
    <div className="CourseDetails">
      <BackButton />
      {!course ? (
        <p>Course not found.</p>
      ) : (
        <>
          <h1>{course.name}</h1>
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
          <button className="unenrollBtn" onClick={() => { setIsModalOpen(true); }}>
            Unenroll
          </button>
          
          {/* -------- CONFIRM UNENROLL MODAL -------- */}
          <ConfirmModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleUnenroll}
            title={`Unenroll from ${course.name}?`}
            message={`Are you sure you want to unenroll from ${course.name}?`}
            confirmText="Yes, Unenroll"
          />
        </>
      )}
    </div>
  );
};

export default CourseDetails;