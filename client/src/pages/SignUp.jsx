// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link } from 'react-router'

const SignUp = () => {
  return (
    <>
      <h1>Sign Up</h1>
      <div className="row loginHub">
        <div className="col">
          <div className="card">
            <h3>Instructor Registration</h3>
            <button className="routeBtn">
              <Link to='/instructor'>Create Account</Link>
            </button>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <h3>Student Registration</h3>
            <button className="routeBtn">
              <Link to='/student'>Create Account</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;