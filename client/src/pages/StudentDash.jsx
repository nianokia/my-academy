// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link } from "react-router";

const StudentDash = () => {
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
      <button className="routeBtn">
        <Link to='/home'>Log Out</Link>
      </button>
    </>
  );
};

export default StudentDash;