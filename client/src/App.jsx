import { useContext } from 'react'

// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Routes, Route, Link } from 'react-router'

// -------- IMPORT PAGES --------
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import StudentDash from './pages/StudentDash.jsx'
import InstructorDash from './pages/InstructorDash.jsx'
import UserProfile from './pages/UserProfile.jsx'
import UserTable from './pages/UserTable.jsx'
import StudentCourses from './pages/StudentCourses.jsx'
import StudentGrades from './pages/StudentGrades.jsx'
import LoginPage from './pages/Login.jsx'
import AuthContext from './context/AuthContext.jsx'

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
    // const user = JSON.parse(localStorage.getItem('user'));
    const { user, logout, loading } = useContext(AuthContext);
    // const handleLogout = () => {
    //   // --- Remove authentication data ---
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('user');

    //   // --- Redirect to login or homepage ---
    //   navigate('/');
    // };

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
            {loading ? (
              <span>Loading...</span>
            ) : (
              <>
                {user ? (
                  <>
                    {user.role === 'student' && <Link to='/student' className='navLink'>Dashboard</Link>}
                    {user.role === 'instructor' && <Link to='/instructor' className='navLink'>Dashboard</Link>}
                    <span>{user.first_name}'s Profile</span>
                    <button onClick={logout}>Log Out</button>
                  </>) : (
                    <>
                      <Link to='/login' className='navLink'>Log In</Link>
                      <Link to='/signup' className='navLink'>Sign Up</Link>
                    </>
                  )
                }
              </>
            // {user ? (
            //   <>
            //     {user.role === 'student' && <Link to='/student' className='navLink'>Dashboard</Link>}
            //     {user.role === 'instructor' && <Link to='/instructor' className='navLink'>Dashboard</Link>}
            //     <span>{user.first_name}'s Profile</span>
            //     <button onClick={handleLogout}>Log Out</button>
            //   </>
            // ) : (
            //   <Link to='/signup' className='navLink'>Sign Up</Link>
            // )}
            )}
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
        <Route path="/login" element={<LoginPage />} />
        <Route path='/student' element={<StudentDash />} />
        <Route path='/instructor' element={<InstructorDash />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/users' element={<UserTable />} />
        <Route path='/student-courses' element={<StudentCourses />} />
        <Route path='/student-grades' element={<StudentGrades />} />
      </Routes>
      <footer><a href="https://lordicon.com/" target='onBlank' style={{fontSize: '10px'}}>Icons by Lordicon.com</a></footer>
    </>
  );
};

export default App;
