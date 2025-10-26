import { useEffect, useState, useContext } from "react";
import { fetchEnrolledStudents, enrollStudents } from "../api/enrollment";
import AuthContext from "../context/AuthContext";
import { fetchUsers } from "../api/user";

const InstructorEnrollments = ({ courseId }) => {
  const { token } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [selected, setSelected] = useState([]);

  // -------- FETCH STUDENTS --------
  const fetchStudents = async () => {
    const allUsers = await fetchUsers(token);
    const enrolledStudents = await fetchEnrolledStudents(courseId, token);

    console.log("allUsers: ", allUsers);
    console.log("enrolledStudents: ", enrolledStudents);
    
    setEnrolled(enrolledStudents);
    setStudents(allUsers.filter((user) => {
      // --- filter for student & filter out enrolled students by user.id ---
      return user.role === "student" && !enrolledStudents.some(enrolled => enrolled.id === user.id);
    }));

    console.log("enrolled State: ", enrolled);
    console.log("students State: ", students);
  };

  useEffect(() => {
    fetchStudents();
  }, [courseId]);

  // -------- ENROLL STUDENTS --------
  const handleEnroll = async () => {
    await enrollStudents(courseId, selected, token);
    alert("Students enrolled succesfully");
    setSelected([]);
    fetchStudents();
  };

  const toggleSelection = (id) => {
    // --- if previous includes specified student.id then append it to the selected array, if not filter it out ---
    setSelected((prev) => prev.includes(id) ? prev.filter(selected => selected !== id) : [...prev, id]);
  }

  console.log("Selected: ", selected);

  return (
    <div className="InstructorEnrollments">
      <h2>Instructor Enrollments</h2>
      <h3>Enrolled Students</h3>
      <ul style={{ textAlign: 'start' }}>
        {enrolled.map(student => (
          <li key={student.id}>
            {student.first_name} {student.last_name}
          </li>
        ))}
      </ul>
      <h3>Available Students</h3>
      <ul style={{ textAlign: 'start', listStyle: 'none', margin: '0', padding: '0' }}>
        {students.map(student => (
          <li key={student.id}>
            <label>
              <input type="checkbox" checked={selected.includes(student.id)} onChange={() => toggleSelection(student.id)} />
              <span>{student.first_name} {student.last_name}</span>
            </label>
          </li>
        ))}
      </ul>
      {selected.length > 0 && (
        <button onClick={handleEnroll}>ENROLL</button>
      )}
    </div>
  )
};

export default InstructorEnrollments;