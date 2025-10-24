import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={handleBack} className="backBtn">
        <img src="/src/assets/back.svg" alt="Left Arrow signifying a back button" />
      </button>
      <h2>Login Page</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;