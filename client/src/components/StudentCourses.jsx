import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { fetchCourses } from "../api/course";
import { fetchStudentEnrollments, enrollStudent, unenrollStudentByStudent } from "../api/enrollment";
import ConfirmModal from "./ConfirmModal";
import { BackButton } from "../constants/constants";
import { useNavigate } from "react-router";

const StudentCourses = () => {
  const { token, user } = useContext(AuthContext);
  const userId = user.id; 
  const navigate = useNavigate();
  const [availableCourses, setAvailableCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchAvailable, setSearchAvailable] = useState("");
  const [searchEnrolled, setSearchEnrolled] = useState("");

  // -------- FETCH ALL COURSES --------
  const getCourses = async () => {
    try {
      const allCoursesList = await fetchCourses(token);
      const enrolledCourses = await fetchStudentEnrollments(userId, token);

      console.log("fetchCourses ->", allCoursesList);
      console.log("fetchStudentEnrollments ->", enrolledCourses);

      // --- ensure arrays are valid ---
      const allCourses = Array.isArray(allCoursesList) ? allCoursesList : [];
      const myCourses = Array.isArray(enrolledCourses) ? enrolledCourses.filter(course => course && course.id) : [];

      /// --- filter out myCourses from allCourses to find available courses ---
      const availableList = allCourses.filter(
        (course) => !myCourses.some((enroll) => enroll.id === course.id)
      );

      setAvailableCourses(availableList);
      setEnrolledCourses(myCourses);
    } catch (err) {
      console.error("Error fetching courses:", err);
      alert("Failed to load course data");
    }
  };

  useEffect(() => {
    if (token && userId) getCourses();
  }, [token, userId]);

  // -------- ENROLL IN COURSE --------
  const handleEnroll = async (courseId) => {
    try {
      await enrollStudent(userId, courseId, token);
      alert("Enrolled successfully!");
      // getCourses();
      setTimeout(() => getCourses(), 500);
    } catch (err) {
      console.error("Error enrolling in course:", err);
      alert(err.response?.data?.message || "Error enrolling in course");
    }
  };

  // -------- UNENROLL IN COURSE --------
  const handleUnenroll = async () => {
    try {
      await unenrollStudentByStudent(userId, selectedCourse.id, token);
      alert(`Unenrolled from ${selectedCourse.name}`);
      setIsModalOpen(false);
      setSelectedCourse(null);

      // await getCourses();
      setTimeout(() => getCourses(), 500);
    } catch (err) {
      console.error("Error unenrolling:", err);
      alert("Failed to unenroll");
    }
  };

  // -------- FILTERED RESULTS --------
  const filteredAvailable = availableCourses.filter((course) =>
    course.name.toLowerCase().includes(searchAvailable.toLowerCase())
  );

  const filteredEnrolled = enrolledCourses.filter((course) =>
    course.name.toLowerCase().includes(searchEnrolled.toLowerCase())
  );

  return (
    <div className="StudentCourses">
      <BackButton />
      <h1>Course Enrollment</h1>

      <div className="courseContainer">
        {/* -------- ENROLLED COURSES -------- */}
        <div className="enrolledCourses">
          <h2>My Enrolled Courses</h2>
          <input
            type="text"
            placeholder="Search enrolled..."
            value={searchEnrolled}
            onChange={(event) => setSearchEnrolled(event.target.value)}
          />
          <ul className="courseList">
            {filteredEnrolled.map((course) => (
              <li key={course.id} className="singleCourse" onClick={() => navigate(`/student/courses/${course.id}`)}>
                <span><strong>{course.name}</strong> ({course.credits} credits)</span>
                <button
                  className="unenrollBtn"
                  onClick={(event) => {
                    event.stopPropagation()
                    setSelectedCourse(course);
                    setIsModalOpen(true);
                  }}
                >
                  Unenroll
                </button>
              </li>
            ))}
            {filteredEnrolled.length === 0 && <li>No enrolled courses found.</li>}
          </ul>
        </div>

        {/* -------- AVAILABLE COURSES -------- */}
        <div className="availableCourses">
          <h2>Available Courses</h2>
          <input
            type="text"
            placeholder="Search available..."
            value={searchAvailable}
            onChange={(event) => setSearchAvailable(event.target.value)}
          />
          <ul className="courseList">
            {filteredAvailable.map((course) => (
              <li key={course.id} className="singleCourse" onClick={() => navigate(`/student/courses/${course.id}`)}>
                <span><strong>{course.name}</strong> ({course.credits} credits)</span>
                <button
                  className="enrollBtn"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEnroll(course.id);
                  }}
                >
                  Enroll
                </button>
              </li>
            ))}
            {filteredAvailable.length === 0 && <li>No courses available.</li>}
          </ul>
        </div>
      </div>

      {/* -------- CONFIRM UNENROLL MODAL -------- */}
      {isModalOpen && selectedCourse && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleUnenroll}
          title={`Unenroll from ${selectedCourse?.name}?`}
          message={`Are you sure you want to unenroll from ${selectedCourse?.name}?`}
          confirmText="Yes, Unenroll"
        />
      )}
    </div>
  );
};

export default StudentCourses;
