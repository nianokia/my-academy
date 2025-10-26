// -------- IMPORTS --------
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext.jsx";
import Modal from "../components/Modal.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import EditProfile from "../components/EditProfile.jsx";
import { deleteUser } from "../api/user";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, token, loading, logout } = useContext(AuthContext);
  console.log('Current User:', user);

  // --- Close modal & reset role ---
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (event) => {
    // event.preventDefault();
    try {
      // const deletedUser = await deleteUser(user, token);
      await deleteUser(user.id, token);
      alert('Your account has been deleted successfully!');
      // console.log(`${deletedUser.first_name} ${deletedUser.last_name}'s profile successfully deleted \n ID: ${deletedUser.id} \nEmail: ${deletedUser.email}`)
      
      logout();
    } catch (err) {
      alert('Failed to delete profile. Please try again.');
      // console.error('Error deleting profile:', err.name, '\n', err.message, '\n Url:', err.config?.url);
      console.error('Error deleting profile: ', err)
    }
  }

  const handleBack = () => {
    navigate(-1);
  };

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
              <ConfirmModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title={`${user.first_name}, are you sure you want to delete your account?`}
                message={`This action cannot be undone.`}
                confirmText="Yes, Delete"
                cancelText="No, Cancel"
              />
            </>
          )}
        </>
      )}
      <button className="deleteUserBtn" onClick={() => setIsDeleteModalOpen(true)}>Delete User</button>

      {/* -------- MODAL FOR REGISTRATION -------- */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* --- Render the appropriate registration form based on the selected role --- */}
        <EditProfile setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default UserProfile;