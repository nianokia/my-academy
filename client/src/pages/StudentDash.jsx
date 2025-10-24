import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";

// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link } from "react-router";

const StudentDash = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <h1>Student Dashboard</h1>
      <h2>Welcome, {user.first_name}!</h2>
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
      <button className="routeBtn" onClick={logout}>Log Out</button>
    </>
  );
};

export default StudentDash;