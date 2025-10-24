import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={handleBack} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <img src="/src/assets/back.svg" style={{ width: "20px", textAlign: "right", marginRight: "475px", marginTop: "20px" }} alt="Home" />
      </button>
      <h2>Login Page</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;