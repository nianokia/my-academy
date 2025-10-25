// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link } from 'react-router'

const Home = () => {
  return (
    <>
      <h1>Welcome to the My Academy Homepage</h1>
      <h2>Sign In or Create Account</h2>
      <div className="row loginHub">
        <div className="col">
          <div className="card">
            <h3>Sign In</h3>
            <button className="routeBtn">
              <Link to='/login'>Login</Link>
            </button>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <h3>Create Account</h3>
            <button className="routeBtn">
              <Link to='/signup'>Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;