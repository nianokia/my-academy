import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';

const UserTable = () => {
  // -------- SET STATES --------
  const [users, setUsers] = useState([]);
  // --- key collects sorted column identifier, direction toggles baseed off of event listener ---
  const [sort, setSort] = useState({ key: 'id', direction: 'asc' });
  // --- track input changes to each filter ---
  const [filters, setFilters] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    major: '',
  });
  
  const navigate = useNavigate();

  // --- Define the API route using the environment variable ---
  const tableRoute = `${import.meta.env.VITE_DOMAIN}/api/users`;
  console.log('Table Route:', tableRoute);

  // -------- FETCH ALL USERS --------
  const fetchUsers = async () => {
    try {
      const response = await fetch(tableRoute);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // --- Log response in JSON format ---
      const data = await response.json();
      console.log('Fetched users:', data);
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };
  
  // --- Call fetchUsers whenever the tableRoute changes ---
  useEffect(() => {
    fetchUsers();
  }, [tableRoute]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    // --- only updates the filter being changed, while leaving the other filters alone ---
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSort = (key) => {
    setSort((prev) => {
      // --- update sort state depending on event listener to toggle direction up or down ---
      const direction = prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc';
      return { key, direction };
    });
  };

  // -------- APPLY SORT & FILTER --------
  // --- useMemo to recalculate only when the users, filters, or sort states change ---
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter((user) => {
      // --- filter user data only if it matches the search input for each column ---
      const idMatch = (user.id?.toLowerCase() || "").includes(filters.id.toLowerCase());
      const emailMatch = (user.email?.toLowerCase() || "").includes(filters.email.toLowerCase());
      const roleMatch = (user.role?.toLowerCase() || "").includes(filters.role.toLowerCase());
      const firstNameMatch = (user.first_name?.toLowerCase() || "").includes(filters.first_name.toLowerCase());
      const lastNameMatch = (user.last_name?.toLowerCase() || "").includes(filters.last_name.toLowerCase());
      const majorMatch = (user.major?.toLowerCase() || "").includes(filters.major.toLowerCase());

      return idMatch && firstNameMatch && lastNameMatch && emailMatch && roleMatch && majorMatch;
    });

    filtered.sort((a, b) => {
      const key = sort.key;
      // --- convert key's value to a lowercase string or "" if value is null/ undefined --- 
      const aValue = a[key]?.toString().toLowerCase() ?? '';
      const bValue = b[key]?.toString().toLowerCase() ?? '';

      // --- compare values to properly order records based on sort direction ---
      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return filtered;
  }, [users, filters, sort]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button onClick={handleBack} className="backBtn">
        <img src="/src/assets/back.svg" alt="Left Arrow signifying a back button" />
      </button>
      <div className='UserTable'>
        <h1>User Table</h1>

        {/* -------- FILTERS -------- */}
         <div className='userFilters'>
           {Object.keys(filters).map((key) => (
             <input
               key={key}
               type="text"
               name={key}
               placeholder={`Filter by ${key}`}
               value={filters[key]}
               onChange={handleFilterChange}
             />
           ))}
         </div>

        {/* -------- FILTERED & SORTED TABLE -------- */}
         <table>
           <thead>
             <tr>
               {["id", "first_name", "last_name", "email", "role", "major"].map((key) => (
                 <th key={key} onClick={() => handleSort(key)}>
                   {key.toUpperCase()}{" "}
                   {sort.key === key
                     ? sort.direction === "asc"
                       ? "↑"
                       : "↓"
                     : ""}
                 </th>
               ))}
             </tr>
           </thead>
           <tbody>
             {filteredAndSortedUsers.map((user) => (
               <tr key={user.id}>
                 <td width="25%" style={{ fontSize: '0.62rem' }}>{user.id}</td>
                 <td width="15%">{user.first_name}</td>
                 <td width="15%">{user.last_name}</td>
                 <td width="15%">{user.email}</td>
                 <td width="15%">{user.role}</td>
                 <td width="15%">{user.major || "N/A"}</td>
               </tr>
             ))}
           </tbody>
         </table>

         {/* --- Display "No users found" if there are no matching filters --- */}
        {filteredAndSortedUsers.length === 0 && <p>No users found.</p>}
      </div>
    </>
  );
};

export default UserTable;


      // const userLC = (column) => { column?.toLowerCase(); };
      // const filterLC = (column) => { column.toLowerCase(); };

      // const idMatch = (userLC(user.id) || "").includes(filterLC(filters.id));
      // const emailMatch = (userLC(user.email) || "").includes(filterLC(filters.email));
      // const roleMatch = (userLC(user.role) || "").includes(filterLC(filters.role));
      // const firstNameMatch = (userLC(user.first_name) || "").includes(filterLC(filters.first_name));
      // const lastNameMatch = (userLC(user.last_name) || "").includes(filterLC(filters.last_name));
      // const majorMatch = (userLC(user.major) || "").includes(filterLC(filters.major));