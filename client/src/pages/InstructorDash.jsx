import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import AddCourse from "../components/AddCourse.jsx";
import Modal from "../components/Modal.jsx";

// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link } from "react-router";

// - ✅ Course Management & Enrollment
//    - ✅ Add New Courses ––> Create course records with ID, name, credits, and enrollment limits
//    - ✅ Update Course Information ––> Modify existing course details
//    - ✅ View Course Details ––> Display all courses in a sortable table
//    - ✅ Delete Courses ––> Remove course records with confirmation
//    - ✅ Set Prerequisites ––> Define prerequisite courses required for enrollment
//    - ✅ Enrollment Limits ––> Set maximum number of students per course
//    - ✅ Available Seats ––> Track and display available seats for each course
//    - ✅ Student Lists ––> Separate lists for available and enrolled students
//    - ✅ Bulk Enrollment ––> Select and enroll multiple students simultaneously
//    - ✅ Unenrollment ––> Remove students from courses with confirmation
//    - ✅ Prerequisite Checking ––> Verify students meet prerequisites before enrollment
//    - ✅ Capacity Management ––> Prevent enrollment when courses reach capacity
//    - ✅ Student Filtering ––> Search functionality for both available and enrolled students

// - ⚠️ Grade Management
//    - ❌ Student Selection ––> Dropdown for choosing students
//    - ❌ Course Overview ––> Table showing all courses a student is enrolled in
//    - ❌ Grade Assignment ––> Assign grades from A+ to F scale
//    - ❌ Grade History ––> View current grades for all enrolled courses
//    - ❌ GPA Calculation ––> Automatic calculation and display of student GPA
//    - ❌ Color-Coded Grades ––> Visual indicators for different grade levels
//    - ❌ Date Tracking ––> Record and display when grades were assigned

const InstructorDash = () => {
  const { user, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Close modal ---
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1>Instructor Dashboard</h1>
      <h2>Welcome, {user.first_name}!</h2>
      <button className="addCourseBtn" onClick={() => setIsModalOpen(true)}>+ New Course</button>
      <br />
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px 0px 10px" }}>
        <button>
          <Link to='/courses'>All Courses List</Link>
        </button>
        <br />
        <button>
          <Link to='/instructor-courses'>My Courses</Link>
        </button>
      </div>
      <button style={{ margin: "10px 0px" }}>
        <Link to='/users'><strong>All Users</strong></Link>
      </button>
      <br />
      <button style={{ margin: "10px 0px 20px" }}>
        <Link to='/instructor/grades'><strong>Grades</strong></Link>
      </button>
      <br />
      <button className="routeBtn" onClick={logout}>Log Out</button>

      {/* -------- ADD COURSE MODAL -------- */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddCourse onSuccess={handleCloseModal} />
      </Modal>
    </>
  );
};

export default InstructorDash;