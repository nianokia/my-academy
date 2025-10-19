// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Routes, Route, Link } from 'react-router'

// -------- IMPORT PAGES --------
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import StudentDash from './pages/StudentDash.jsx'
import InstructorDash from './pages/InstructorDash.jsx'

// -------- IMPORT CSS --------
import './App.css'

//** -------- PSEUDOCODE --------
//   Develop a comprehensive e-learning management system that enables instructors to create courses
//   and students to enroll, participate, and track their progress. The application should demonstrate
//   strong object-oriented programming principles and provide a seamless learning experience.
//   Instructors can manage courses and content, while students can access learning materials, submit
//   assignments, and track their academic progress.

// FEATURES:
// - CRUD operations (Create, Read, Update, Delete).
// - User authentication (login, registration).
// - User Management: Creating and managing user accounts, handling patron information, and 
//   providing authentication for library services. User profiles to manage their personal library.
//    - Add New Students or Teachers: Create new user records with ID, name, email, and major
//    - Update Student or Teacher Information: Modify existing user details
//    - View Student or Teacher Details: Display all users in a sortable table
//    - Delete Users: Remove student records with confirmation
//    - Search Functionality: Filter users by ID, name, email, or major/course
//    - Input Validation: Comprehensive validation for all fields
//    - Duplicate Prevention: Prevents duplicate student IDs  
// - Course Management & Enrollment
//    - Add New Courses: Create course records with ID, name, credits, and enrollment limits
//    - Update Course Information: Modify existing course details
//    - View Course Details: Display all courses in a sortable table
//    - Delete Courses: Remove course records with confirmation
//    - Set Prerequisites: Define prerequisite courses required for enrollment
//    - Enrollment Limits: Set maximum number of students per course
//    - Available Seats: Track and display available seats for each course
//    - Course Selection: Dropdown menu for selecting available courses
//    - Student Lists: Separate lists for available and enrolled students
//    - Bulk Enrollment: Select and enroll multiple students simultaneously
//    - Unenrollment: Remove students from courses with confirmation
//    - Prerequisite Checking: Verify students meet prerequisites before enrollment
//    - Capacity Management: Prevent enrollment when courses reach capacity
//    - Student Filtering: Search functionality for both available and enrolled students
// - Grade Management
//    - Student Selection: Dropdown for choosing students
//    - Course Overview: Table showing all courses a student is enrolled in
//    - Grade Assignment: Assign grades from A+ to F scale
//    - Grade History: View current grades for all enrolled courses
//    - GPA Calculation: Automatic calculation and display of student GPA
//    - Color-Coded Grades: Visual indicators for different grade levels
//    - Date Tracking: Record and display when grades were assigned
// */

const App = () => {
  const Navigation = () => {
    return (
      <>
        <div className='navBar'>
          <header>
            <Link to='/home'>
              <img src="/book.svg" className="navIcon" alt="" />
              <h4 className='navTitle'>My Academy</h4>
            </Link>
          </header>
          <nav>
            <Link to='/home' className='navLink'>Home</Link>
            <Link to='/signup' className='navLink'>Sign Up</Link>
          </nav>
        </div>
      </>
    );
  };

  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/student' element={<StudentDash />} />
        <Route path='/instructor' element={<InstructorDash />} />
      </Routes>
    </>
  );
};

export default App;
