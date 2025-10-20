// -------- IMPORT REACT-ROUTER ELEMENTS --------
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={handleBack} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <img src="/src/assets/back.svg" style={{ width: "20px", textAlign: "right", marginRight: "475px", marginTop: "20px" }} alt="Home" />
      </button>
      <h1>User Profile</h1>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {users.map((user) => (
          <li key={user.id}>
            <h3>{user.first_name} {user.last_name}</h3>
            <p>Email: {user.email}</p>
            <p>Password: ●●●●●●</p>
            <p>Role: {user.role}</p>
            <p>Major: {user.major || 'N/A'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;