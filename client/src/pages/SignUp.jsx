// ------- IMPORTS --------
import { useState } from 'react';
import InstructorRegister from '../components/InstructorRegister';
import StudentRegister from '../components/StudentRegister';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router'

const SignUp = () => {
  const [role, setRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // --- Handle role selection & open modal on click ---
  const handleClick = (selectedRole) => {
    setRole(selectedRole);
    setIsModalOpen(true);
  };

  // --- Close modal & reset role ---
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRole('');
  };

  // --- Handle successful registration and redirect based on role ---
  const handleSuccessfulRegistration = (role) => {
    setIsModalOpen(false);
    setRole('');
    navigate(role === 'student' ? '/student' : '/instructor');
  };

  return (
    <>
      <h1>Sign Up</h1>
      <div className="row loginHub">
        <div className="col">
          <div className="card">
            <h3>Instructor Registration</h3>
            <button className="routeBtn" onClick={() => handleClick('instructor')}>
              Create Account
            </button>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <h3>Student Registration</h3>
            <button className="routeBtn" onClick={() => handleClick('student')}>
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* -------- MODAL FOR REGISTRATION -------- */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* --- Render the appropriate registration form based on the selected role --- */}
        {role === 'instructor' && <InstructorRegister onSuccess={handleSuccessfulRegistration} />}
        {role === 'student' && <StudentRegister onSuccess={handleSuccessfulRegistration} />}
      </Modal>
    </>
  );
};

export default SignUp;