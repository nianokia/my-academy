import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { fetchUsers } from "../api/user";
import { BackButton } from "../constants/constants";

// - ⚠️ Grade Management
//    - ❌ Student Selection ––> Dropdown for choosing students
//    - ❌ Course Overview ––> Table showing all courses a student is enrolled in
//    - ❌ Grade Assignment ––> Assign grades from A+ to F scale
//    - ❌ Grade History ––> View current grades for all enrolled courses
//    - ❌ GPA Calculation ––> Automatic calculation and display of student GPA
//    - ❌ Color-Coded Grades ––> Visual indicators for different grade levels
//    - ❌ Date Tracking ––> Record and display when grades were assigned

const InstructorGrades = () => {
  const { token } = useContext(AuthContext);
  const [students, setStudents] = useState([]);

  // -------- FETCH ALL STUDENTS --------
  const fetchStudents = async () => {
    try {
      const allUsers = await fetchUsers(token);
      const allStudents = allUsers.filter((user) => user.role === "student");
      setStudents(allStudents);
    } catch (err) {
      console.error("Error fetching students:", err);
      alert("Failed to fetch all students.");
    }
  }

  // --- Call fetchStudents whenever the token changes ---
  useEffect(() => {
    if (token) fetchStudents();
  }, [token])

  return (
    <div className="InstructorGrades">
      <BackButton />
      <h1>Instructor Grades</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id} value={student.id}>
            {student.first_name} {student.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorGrades;