import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";

// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link } from "react-router";

const InstructorDash = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <h1>Instructor Dashboard</h1>
      <h2>Welcome, {user.first_name}!</h2>
      <button style={{ margin: "20px 0px" }}>
        <Link to='/users'><strong>All Users</strong></Link>
      </button>
      <br />
      <button className="routeBtn" onClick={logout}>Log Out</button>
    </>
  );
};

export default InstructorDash;