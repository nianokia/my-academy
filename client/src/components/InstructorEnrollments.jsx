import { useEffect, useState, useContext } from "react";
import { fetchEnrolledStudents } from "../api/enrollment";
import AuthContext from "../context/AuthContext";
import { fetchUsers } from "../api/user";

const InstructorEnrollments = ({ courseId }) => {
  const { token } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [enrolled, setEnrolled] = useState([]);

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
      <ul style={{ textAlign: 'start' }}>
        {students.map(student => (
          <li key={student.id}>
            {student.first_name} {student.last_name}
          </li>
        ))}
      </ul>
      <button>ENROLL</button>
    </div>
  )
};

export default InstructorEnrollments;