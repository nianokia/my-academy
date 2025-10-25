import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";

// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link } from "react-router";

const StudentDash = () => {
  const { user, logout } = useContext(AuthContext);

// - Course Management & Enrollment
//    - ❌ Add New Courses ––> Create course records with ID, name, credits, and enrollment limits
//    - ❌ Update Course Information ––> Modify existing course details
//    - ❌ View Course Details ––> Display all courses in a sortable table
//    - ❌ Delete Courses ––> Remove course records with confirmation
//    - ❌ Set Prerequisites ––> Define prerequisite courses required for enrollment
//    - ❌ Enrollment Limits ––> Set maximum number of students per course
//    - ❌ Available Seats ––> Track and display available seats for each course
//    - ❌ Course Selection ––> Dropdown menu for selecting available courses
//    - ❌ Student Lists ––> Separate lists for available and enrolled students
//    - ❌ Bulk Enrollment ––> Select and enroll multiple students simultaneously
//    - ❌ Unenrollment ––> Remove students from courses with confirmation
//    - ❌ Prerequisite Checking ––> Verify students meet prerequisites before enrollment
//    - ❌ Capacity Management ––> Prevent enrollment when courses reach capacity
//    - ❌ Student Filtering ––> Search functionality for both available and enrolled students

  return (
    <>
      <h1>Student Dashboard</h1>
      <h2>Welcome, {user.first_name}!</h2>
      <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px 0px" }}>
        <button>
          <Link to='/student-courses'>Student Courses</Link>
        </button>
        <button>
          <Link to='/student-grades'>Student Grades</Link>
        </button>
      </summary>
      <ul style={{ textAlign: 'start' }}>
        <li>Course List
          <ul>
            <li>List All Courses</li>
            <li>Sort & Filter Courses</li>
            <li>Dropdown Menu to Select Available Courses</li>
            <li>Enroll in a Course
              <ul>
                <li>Check prereqs before enrolling</li>
                <li>Check seat availability before enrolling</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>My Courses
          <ul>
            <li>List Enrolled Courses</li>
            <li>View Course
              <ul>
                <li>Drop Course</li>
                <li>Display Available Seats</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <button className="routeBtn" onClick={logout}>Log Out</button>
    </>
  );
};

export default StudentDash;