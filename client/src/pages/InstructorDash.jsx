// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link, useNavigate } from "react-router";

const InstructorDash = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    // --- Remove authentication data ---
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // --- Redirect to login or homepage ---
    navigate('/');
  };

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
      <button className="routeBtn" onClick={handleLogout}>Log Out</button>
    </>
  );
};

export default InstructorDash;