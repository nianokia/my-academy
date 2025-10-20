// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link } from "react-router";

const InstructorDash = () => {
  return (
    <>
      <h1>Instructor Dashboard</h1>
      <Link to='/profile'>
        <img src="/src/assets/profile.gif" style={{ width: "30px", textAlign: "right", marginLeft: "350px" }} alt="" />
      </Link>
      <br />
      <button style={{ margin: "20px 0px" }}>
        <Link to='/users'><strong>All Users</strong></Link>
      </button>
      <br />
      <button className="routeBtn">
        <Link to='/home'>Log Out</Link>
      </button>
    </>
  );
};

export default InstructorDash;