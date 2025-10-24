// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { Link } from 'react-router'

const Home = () => {
  return (
    <>
      <h1>Welcome to the My Academy Homepage</h1>
      <h2>Please login as Instructor or Student</h2>
      <div className="row loginHub">
        <div className="col">
          <div className="card">
            <h3>Instructor Login</h3>
            <button className="routeBtn">
              <Link to='/login'>Login</Link>
            </button>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <h3>Student Login</h3>
            <button className="routeBtn">
              <Link to='/login'>Login</Link>
            </button>
          </div>
        </div>
      </div>
      <Link to='/signup'>Create Account</Link>
    </>
  );
};

export default Home;