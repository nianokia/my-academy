// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link } from "react-router";

const StudentDash = () => {
  return (
    <>
      <h1>Student Dashboard</h1>
      <button className="routeBtn">
        <Link to='/home'>Log Out</Link>
      </button>
    </>
  );
};

export default StudentDash;