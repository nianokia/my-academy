// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link } from "react-router";

const InstructorDash = () => {
  return (
    <>
      <h1>Instructor Dashboard</h1>
      <button className="routeBtn">
        <Link to='/home'>Log Out</Link>
      </button>
    </>
  );
};

export default InstructorDash;