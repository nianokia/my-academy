import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";

// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link } from "react-router";

// - ✅ Course Management & Enrollment
//    - ✅ View Course Details ––> Display all courses in a sortable table
//    - ✅ Available Seats ––> Track and display available seats for each course
//    - ✅ Course Selection ––> Dropdown menu for selecting available courses
//    - ✅ Unenrollment ––> Remove students from courses with confirmation
//    - ✅ Prerequisite Checking ––> Verify students meet prerequisites before enrollment
//    - ✅ Capacity Management ––> Prevent enrollment when courses reach capacity
// - ⚠️ Grade Management
//    - ❌ Course Overview ––> Table showing all courses a student is enrolled in
//    - ❌ Grade History ––> View current grades for all enrolled courses
//    - ❌ GPA Calculation ––> Automatic calculation and display of student GPA
//    - ❌ Color-Coded Grades ––> Visual indicators for different grade levels
//    - ❌ Date Tracking ––> Record and display when grades were assigned

const StudentDash = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <h1>Student Dashboard</h1>
      <h2>Welcome, {user.first_name}!</h2>
      <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px 0px" }}>
        <button>
          <Link to='/student-courses'>Course Enrollment</Link>
        </button>
        <button>
          <Link to='/student-grades'>Student Grades</Link>
        </button>
      </summary>
      <button style={{ margin: "10px 0px" }}>
        <Link to='/courses'>All Courses List</Link>
      </button>
      <br />
      <button className="routeBtn" onClick={logout}>Log Out</button>
    </>
  );
};

export default StudentDash;