import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import AuthContext from "../context/AuthContext";
import { fetchStudentGrades, fetchGradeHistory } from "../api/grade";
import { BackButton, gradeOptions, calculateGPA, getGradeColor } from "../constants/constants";
import Modal from "../components/Modal";

// - ⚠️ Grade Management
//    - ❌ Course Overview ––> Table showing all courses a student is enrolled in
//    - ❌ Grade History ––> View current grades for all enrolled courses
//    - ❌ GPA Calculation ––> Automatic calculation and display of student GPA
//    - ❌ Color-Coded Grades ––> Visual indicators for different grade levels
//    - ❌ Date Tracking ––> Record and display when grades were assigned

const StudentGrades = () => {
  const { user, token } = useContext(AuthContext);
  const userId = user?.id;
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // -------- FETCH GRADES FOR SELECTED STUDENT --------
  const fetchGrades = async (userId) => {
    setLoading(true);
    try {
      const data = await fetchStudentGrades(userId, token);
      setGrades(data);
    } catch (err) {
      console.error("Error fetching grades:", err);
      alert("Failed to fetch student grades.");
    } finally {
      setLoading(false);
    }
  };

  // --- Call fetchGrades whenever the token or user changes ---
  useEffect(() => {
    if (token && user?.id) fetchGrades(userId);
  }, [token, user]);

  // -------- HANDLE VIEW GRADE HISTORY --------
  const handleViewHistory = async (enrollmentId) => {
  try {
    const gradeHistory = await fetchGradeHistory(enrollmentId, token);
    setHistory(gradeHistory);
    setIsModalOpen(true);
  } catch (err) {
    console.error("Error fetching grade history:", err);
    alert("Failed to load grade history");
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
    <div className="Student Grades">
      <BackButton />
      <h1>My Grades</h1>

      {/* -------- GRADE TABLE -------- */}
      {loading && <p>Loading grades...</p>}
      {!loading && (
        <>
          {grades.length === 0 ? (
            <div>
              <p>You are not enrolled in any courses yet.</p>
              <button>
                <Link to='/student-courses'>→ Course Enrollment</Link>
              </button>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Credits</th>
                  <th>Current Grade</th>
                  <th>Assigned By</th>
                  <th>Assigned At</th>
                  <th>Grade History</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((enrollment) => (
                  // --- ensure all keys are unique (enrollUUID-gradeUUID / enrollUUID-no-grade) ---
                  <tr key={`${enrollment.id}-${enrollment.Grade?.id || "no-grade"}`}>
                    <td>{enrollment.Course?.name}</td>
                    <td>{enrollment.Course?.credits}</td>
                    <td style={{ backgroundColor: getGradeColor(enrollment.Grade?.grade), color: "black" }}>
                      {enrollment.Grade?.grade || "N/A"}
                    </td>
                    <td>
                      {
                        enrollment.Grade?.instructor
                        ? `${enrollment.Grade.instructor.first_name} ${enrollment.Grade.instructor.last_name}`
                        : "--"
                      }
                    </td>
                    <td>
                      {
                        enrollment.Grade?.assigned_at
                        ? new Date(enrollment.Grade.assigned_at).toLocaleDateString()
                        : "--"
                      }
                    </td>
                    <td>
                      <button onClick={() => handleViewHistory(enrollment.id)}>View</button>
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

          {/* -------- GRADE HISTORY MODAL -------- */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h3 className="gradeHistoryTitle">Grade History</h3>
            {history.length > 0 ? (
              <ul className="gradeHistoryContainer">
                {history.map((g) => (
                  <li key={g.id} className="gradeHistoryRecord" style={{ backgroundColor: getGradeColor(g.grade) }}>
                    <span>
                      {g.grade}
                    </span>{" "}
                    {`- Assigned by ${g.instructor?.first_name} ${g.instructor?.last_name} on ${new Date(g.assigned_at).toLocaleDateString()}`}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No history found.</p>
            )}
          </Modal>

        </>
      )}
    </div>
  );
};

export default StudentGrades;
