// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext.jsx";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log('Current User:', user);

  // const editProfile = () => {
  //   navigate('/edit-profile');
  // }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={handleBack} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <img src="/src/assets/back.svg" style={{ width: "20px", textAlign: "right", marginRight: "475px", marginTop: "20px" }} alt="Home" />
      </button>
      <h1>{user.first_name}'s Profile</h1>
      <ul style={{ listStyle: 'none', textAlign: 'start', padding: 0, margin: 0 }}>
        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Name:</span>
          <span>{user.first_name} {user.last_name}</span>
          <span className="editProfile">✎</span>
        </li>
        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Email:</span>
          <span>{user.email}</span>
          <span className="editProfile">✎</span>
        </li>
        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Password:</span>
          <span>●●●●●●</span>
          <span className="editProfile">✎</span>
        </li>
        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Role:</span>
          <span>{user.role}</span>
          <span className="editProfile">✎</span>
        </li>
        {user.role === 'student' && (
          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Major:</span>
            <span>{user.major || 'N/A'}</span>
            <span className="editProfile">✎</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserProfile;