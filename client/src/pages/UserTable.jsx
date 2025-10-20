import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const UserTable = () => {
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
    <>
      <button onClick={handleBack} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <img src="/src/assets/back.svg" style={{ width: "20px", textAlign: "right", marginRight: "475px", marginTop: "20px" }} alt="Home" />
      </button>
      <div>
        <h1>User Table</h1>
        <table style={{ width: "550px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Major</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td width="20%">{user.id}</td>
                <td width="20%">{user.first_name} {user.last_name}</td>
                <td width="20%">{user.email}</td>
                <td width="20%">{user.role}</td>
                <td width="20%">{user.major || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
