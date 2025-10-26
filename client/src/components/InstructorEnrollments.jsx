import { useEffect, useState, useContext } from "react";
import { fetchEnrolledStudents, enrollStudents, unenrollStudent } from "../api/enrollment";
import AuthContext from "../context/AuthContext";
import { fetchUsers } from "../api/user";
import ConfirmModal from "./ConfirmModal";

const InstructorEnrollments = ({ courseId }) => {
  const { token } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isUnenrollModalOpen, setIsUnenrollModalOpen] = useState(false);

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
    try {
      await enrollStudents(courseId, selected, token);
      alert("Students enrolled succesfully");
      setSelected([]);
      fetchStudents();
    } catch (err) {
      if (err.response.status === 400) {
        alert(err.response.data.message)
      } else {
        alert("Unexpected error enrolling students");
      }
    }
  };

  const handleUnenroll = async () => {
    try {
      await unenrollStudent(courseId, selectedStudent.id, token);
      alert(`${selectedStudent.first_name} ${selectedStudent.last_name} has been unenrolled.`);
      
      // --- refresh student lists ---
      fetchStudents();
    } catch (err) {
      console.error("Error unenrolling student: ", err);
      alert(`Failed to unenroll ${selectedStudent.first_name} ${selectedStudent.last_name}. Please try again.`);
    }
  };

  const toggleSelection = (id) => {
    // --- if previous includes specified student.id then append it to the selected array, if not filter it out ---
    setSelected((prev) => prev.includes(id) ? prev.filter(selected => selected !== id) : [...prev, id]);
  }

  const openUnenrollModal = (student) => {
    setSelectedStudent(student);
    setIsUnenrollModalOpen(true);
  };

  console.log("Selected: ", selected);

  return (
    <div className="InstructorEnrollments">
      <h2 style={{ margin: '0.5rem 0rem' }}>Student Enrollment</h2>
      
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <h3 style={{ margin: '0.25rem 0rem 0.75rem' }}>Enrolled Students</h3>
          <ul style={{ textAlign: 'start', listStyle: 'none', margin: '0', padding: '0', overflowY: 'auto', maxHeight: '10rem', background: 'rgba(0,0,0,0.07)' }}>
          {enrolled.map(student => (
            <li key={student.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.2rem 1rem'}}>
              <span>{student.first_name} {student.last_name}</span>
              <button onClick={() => openUnenrollModal(student)}>Unenroll</button>
            </li>
          ))}
        </ul>
        </div>
        <div style={{ width: '50%' }}>
          <h3 style={{ margin: '0.25rem 0rem 0.75rem' }}>Available Students</h3>
          <ul style={{ textAlign: 'start', listStyle: 'none', margin: '0', padding: '0', overflowY: 'auto', maxHeight: '10rem', background: 'rgba(0,0,0,0.07)', borderRadius: '10px' }}>
            {students.map(student => (
              <li key={student.id}>
                <label style={{ display: 'flex' }}>
                  <input type="checkbox" 
                    checked={selected.includes(student.id)}
                    onChange={() => toggleSelection(student.id)}
                  />
                  <span style={{ marginLeft: '-2rem'}}>{student.first_name} {student.last_name}</span>
                </label>
              </li>
            ))}
          </ul>
          {selected.length > 0 && (
            <button onClick={handleEnroll} style={{ marginTop: '1rem' }}>ENROLL</button>
          )}
          </div>
        </div>

      <ConfirmModal
        isOpen={isUnenrollModalOpen}
        onClose={() => setIsUnenrollModalOpen(false)}
        onConfirm={handleUnenroll}
        title={`Unenroll ${selectedStudent?.first_name} ${selectedStudent?.last_name}?`}
        message={`Are you sure you want to unenroll ${selectedStudent?.first_name} ${selectedStudent?.last_name} from this course?`}
        confirmText="Yes, Unenroll"
      />

    </div>
  )
};

export default InstructorEnrollments;