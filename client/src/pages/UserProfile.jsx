// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext.jsx";
import Modal from "../components/Modal.jsx";
import EditProfile from "../components/EditProfile.jsx";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  console.log('Current User:', user);

  // --- Close modal & reset role ---
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // if (loading) return <p>Loading profile...</p>;
  // if (!user) return <p>No user found. Please log in again.</p>;

  return (
    <div className="UserProfile">
      <button onClick={handleBack} className="backBtn">
        <img src="/src/assets/back.svg" alt="Left Arrow signifying a back button" />
      </button>
      {loading ? (
        <p>Loading profile...</p>
      ) : (
        <>
          {!user ? (
            <p>No user found. Please log in again.</p>
          ) : (
            <>
              <h1>{user.first_name}'s Profile</h1>
              <ul>
                <li>
                  <span>Name:</span>
                  <span>{user.first_name} {user.last_name}</span>
                  <span className="editProfileIcon">✎</span>
                </li>
                <li>
                  <span>Email:</span>
                  <span>{user.email}</span>
                  <span className="editProfileIcon" onClick={() => setIsModalOpen(true)}>✎</span>
                </li>
                <li>
                  <span>Password:</span>
                  <span>●●●●●●</span>
                  <span className="editProfileIcon" onClick={() => setIsModalOpen(true)}>✎</span>
                </li>
                <li>
                  <span>Role:</span>
                  <span>{user.role}</span>
                  <span className="editProfileIcon">✎</span>
                </li>
                {user.role === 'student' && (
                  <li>
                    <span>Major:</span>
                    <span>{user.major || 'N/A'}</span>
                    <span className="editProfileIcon" onClick={() => setIsModalOpen(true)}>✎</span>
                  </li>
                )}
              </ul>
            </>
          )}
        </>
      )}
      {/* <h1>{user.first_name}'s Profile</h1>
      <ul>
        <li>
          <span>Name:</span>
          <span>{user.first_name} {user.last_name}</span>
          <span className="editProfileIcon">✎</span>
        </li>
        <li>
          <span>Email:</span>
          <span>{user.email}</span>
          <span className="editProfileIcon" onClick={() => setIsModalOpen(true)}>✎</span>
        </li>
        <li>
          <span>Password:</span>
          <span>●●●●●●</span>
          <span className="editProfileIcon" onClick={() => setIsModalOpen(true)}>✎</span>
        </li>
        <li>
          <span>Role:</span>
          <span>{user.role}</span>
          <span className="editProfileIcon">✎</span>
        </li>
        {user.role === 'student' && (
          <li>
            <span>Major:</span>
            <span>{user.major || 'N/A'}</span>
            <span className="editProfileIcon" onClick={() => setIsModalOpen(true)}>✎</span>
          </li>
        )}
      </ul> */}

      {/* -------- MODAL FOR REGISTRATION -------- */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* --- Render the appropriate registration form based on the selected role --- */}
        <EditProfile setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default UserProfile;