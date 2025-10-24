// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link, useNavigate } from "react-router";

const StudentDash = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // --- Remove authentication data ---
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // --- Redirect to login or homepage ---
    navigate('/');
  };

  return (
    <>
      <h1>Student Dashboard</h1>
      <Link to='/profile'>
        <img src="/src/assets/profile.gif" style={{ width: "30px", textAlign: "right", marginLeft: "350px" }} alt="profile icon" />
      </Link>
      <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px 0px" }}>
        <button>
          <Link to='/student-courses'>Student Courses</Link>
        </button>
        <button>
          <Link to='/student-grades'>Student Grades</Link>
        </button>
      </summary>
      <button className="routeBtn" onClick={handleLogout}>Log Out</button>
    </>
  );
};

export default StudentDash;