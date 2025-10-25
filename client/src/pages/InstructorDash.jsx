import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";

// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link } from "react-router";

// - Course Management & Enrollment
//    - ❌ Add New Courses ––> Create course records with ID, name, credits, and enrollment limits
//    - ❌ Update Course Information ––> Modify existing course details
//    - ⚠️ View Course Details ––> Display all courses in a sortable table
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

const InstructorDash = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <h1>Instructor Dashboard</h1>
      <h2>Welcome, {user.first_name}!</h2>
      <ul style={{ textAlign: 'start' }}>
        <li><button>Add (+) New Course</button></li>
        <li>
          <button><Link to='/courses'>All Courses List</Link></button>
          <ul>
            <li>Sort & Filter Courses</li>
          </ul>
        </li>
        <li><button>My Courses</button>
          <ul>
            <li>(+) New Course</li>
            <li>List All Instructor's Courses</li>
            <li><button>View Course</button>
              <ul>
                <li><button>Update Course</button>
                  <ul>
                    <li>Set Prerequisites</li>
                    <li>Set Enrollment Limit</li>
                  </ul>
                </li>
                <li><button>Delete Course</button></li>
                <li>Display Available Seats
                  <ul>
                    <li>Search & Filter available vs enrolled students</li>
                    <li>List all enrolled students
                      <ul>
                        <li><button>Drop a Student</button> (CONFIRMATION BOX)</li>
                      </ul>
                    </li>
                    <li>List all available students
                      <ul>
                        <li><button>Enroll Student in a Course</button>
                          <ul>
                            <li>Check prereqs before enrolling</li>
                            <li>Check seat availability before enrolling</li>
                          </ul>
                        </li>
                        <li><button>Bulk enroll available students</button></li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <button style={{ margin: "20px 0px" }}>
        <Link to='/users'><strong>All Users</strong></Link>
      </button>
      <br />
      <button className="routeBtn" onClick={logout}>Log Out</button>
    </>
  );
};

export default InstructorDash;