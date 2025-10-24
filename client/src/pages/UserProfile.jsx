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
    <div className="UserProfile">
      <button onClick={handleBack} className="backBtn">
        <img src="/src/assets/back.svg" alt="Left Arrow signifying a back button" />
      </button>
      <h1>{user.first_name}'s Profile</h1>
      <ul>
        <li>
          <span>Name:</span>
          <span>{user.first_name} {user.last_name}</span>
          <span className="editProfile">✎</span>
        </li>
        <li>
          <span>Email:</span>
          <span>{user.email}</span>
          <span className="editProfile">✎</span>
        </li>
        <li>
          <span>Password:</span>
          <span>●●●●●●</span>
          <span className="editProfile">✎</span>
        </li>
        <li>
          <span>Role:</span>
          <span>{user.role}</span>
          <span className="editProfile">✎</span>
        </li>
        {user.role === 'student' && (
          <li>
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