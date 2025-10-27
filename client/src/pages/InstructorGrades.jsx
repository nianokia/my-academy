import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { fetchUsers } from "../api/user";
import { fetchStudentGrades, assignGrade } from "../api/grade";
import { BackButton, calculateGPA } from "../constants/constants";

// - ⚠️ Grade Management
//    - ✅ Student Selection ––> Dropdown for choosing students
//    - ✅ Course Overview ––> Table showing all courses a student is enrolled in
//    - ✅ Grade Assignment ––> Assign grades from A+ to F scale
//    - ❌ Grade History ––> View current grades for all enrolled courses
//    - ❌ GPA Calculation ––> Automatic calculation and display of student GPA
//    - ❌ Color-Coded Grades ––> Visual indicators for different grade levels
//    - ❌ Date Tracking ––> Record and display when grades were assigned

const InstructorGrades = () => {
  const { token } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);

  const gradeOptions = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];

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
  }, [token]);

  // -------- FETCH GRADES FOR SELECTED STUDENT --------
  const fetchGrades = async (studentId) => {
    setLoading(true);
    try {
      const data = await fetchStudentGrades(studentId, token);
      setGrades(data);
    } catch (err) {
      console.error("Error fetching grades:", err);
      alert("Failed to fetch student grades.");
    } finally {
      setLoading(false);
    }
  };

  // -------- HANDLE STUDENT SELECTION --------
  const handleStudentSelect = (event) => {
    const studentId = event.target.value;
    const selected = students.find((student) => student.id === studentId);
    setSelectedStudent(selected);
    if (studentId) fetchGrades(studentId);
  };

  // -------- HANDLE GRADE ASSIGNMENT --------
  const handleGradeChange = async (enrollmentId, newGrade) => {
    try {
      await assignGrade(enrollmentId, newGrade, token);
      alert("Grade updated successfully!");
      if (selectedStudent) fetchGrades(selectedStudent.id);
    } catch (err) {
      console.error("Error assigning grade:", err);
      alert(err.response?.data?.message || "Error assigning grade");
    }
  };

  // -------- GPA CALCULATION --------
  // --- collect array of enrolled grades to send to calculateGPA---
  const gpa = calculateGPA(
    grades
      .map((enrolled) => enrolled.Grade)
      .filter((g) => g && g.grade)
  );

  return (
    <div className="InstructorGrades">
      <BackButton />
      <h1>Gradebook</h1>

      {/* -------- STUDENT DROPDOWN -------- */}
      <div className="studentSelect" style={{ display: 'flex', justifyContent: "space-between", aoptiongnItems: 'center', width: '60%', margin: '0.5rem auto', padding: '0' }}>
        <label htmlFor="student">Select Student:</label>
        <select id="student" value={selectedStudent?.id || ""} onChange={handleStudentSelect} >
          <option value="">--Choose a student --</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.first_name} {student.last_name}
            </option>
          ))}
        </select>
      </div>

      {/* -------- GRADE TABLE -------- */}
      {loading && <p>Loading grades...</p>}
      {!loading && selectedStudent && (
        <>
          <h2>Grades for {selectedStudent.first_name} {selectedStudent.last_name}</h2>
          {grades.length === 0 ? (
            <p>No enrolled courses found for this student.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Credits</th>
                  <th>Current Grade</th>
                  <th>Assigned By</th>
                  <th>Assigned At</th>
                  <th>Update Grade</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((enrollment) => (
                  <tr key={enrollment.id}>
                    <td>{enrollment.Course?.name}</td>
                    <td>{enrollment.Course?.credits}</td>
                    <td>{enrollment.Grade?.grade || "N/A"}</td>
                    <td>
                      {
                        enrollment.Grade?.instructor
                        ? `${enrollment.Grade.instructor.first_name} ${enrollment.Grade.instructor.last_name}`
                        : "--"
                      }
                    </td>
                    <td>
                      {enrollment.Grade?.assigned_at ? enrollment.Grade.assigned_at : "--"}
                    </td>
                    <td>
                      <select defaultValue={enrollment.Grade?.grade || ""}
                        onChange={(e) => handleGradeChange(enrollment.id, e.target.value)}
                      >
                        <option value="">-- Assign Grade --</option>
                        {gradeOptions.map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* -------- GPA DISPLAY -------- */}
          {grades.length > 0 && (
            <h3>Current GPA: <span className="gpaDisplay">{gpa}</span></h3>
          )}
        </>
      )}
    </div>
  );
};

export default InstructorGrades;