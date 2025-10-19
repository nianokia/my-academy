// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { useState, useEffect } from "react";
import { Link } from "react-router";

const InstructorDash = () => {
  const [users, setUsers] = useState([]);

  // Define the API route using the environment variable
  const tableRoute = `${import.meta.env.VITE_DOMAIN}/api/users`;
  console.log('Table Route:', tableRoute);

  // Fetch users from the tableRoute
  const fetchUsers = async () => {
    try {
      const response = await fetch(tableRoute);

      // Check if response is ok, if not throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse and log response in JSON format
      const data = await response.json();
      console.log('Fetched users:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  // Use useEffect to call fetchUsers whenever the tableRoute changes
  useEffect(() => {
    fetchUsers();
  }, [tableRoute]);

  return (
    <>
      <h1>Instructor Dashboard</h1>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.first_name} {user.last_name}</li>
        ))}
      </ul>
      <button className="routeBtn">
        <Link to='/home'>Log Out</Link>
      </button>
    </>
  );
};

export default InstructorDash;