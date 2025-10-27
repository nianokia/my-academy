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
  const [searchAvailable, setSearchAvailable] = useState('');
  const [searchEnrolled, setSearchEnrolled] = useState('');

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

  // -------- FILTERED LISTS --------
  // --- normalize full name and filter results based on matching search input ---
  const filteredAvailable = students.filter(student =>
    `${student.first_name} ${student.last_name}`
      .toLowerCase()
      .includes(searchAvailable.toLowerCase())
  );

  const filteredEnrolled = enrolled.filter(student =>
    `${student.first_name} ${student.last_name}`
      .toLowerCase()
      .includes(searchEnrolled.toLowerCase())
  );


  console.log("Selected: ", selected);

  return (
    <div className="InstructorEnrollments">
      <h2>Student Enrollment</h2>
      
      <div className="enrollmentContainer flex">
        <div className="enrolledStudents halfWidth">
          <h3>Enrolled Students</h3>
          {/* -------- SEARCH ENROLLED -------- */}
          <input type="text" value={searchEnrolled}
            onChange={(event) => setSearchEnrolled(event.target.value)}
            placeholder="Search enrolled..."
          />
          {/* -------- ENROLLED RESULTS -------- */}
          <ul>
            {filteredEnrolled.map((student) => (
              <li key={student.id}>
                <span>{student.first_name} {student.last_name}</span>
                <button onClick={() => openUnenrollModal(student)}>Unenroll</button>
              </li>
            ))}
            {filteredEnrolled.length === 0 && <li className="noEnrolled">No students found</li>}
          </ul>
        </div>

        <div className="availableStudents halfWidth">
          <h3>Available Students</h3>
          {/* -------- SEARCH AVAILABLE -------- */}
          <input type="text" value={searchAvailable} className="availableSearch"
            onChange={(event) => setSearchAvailable(event.target.value)}
            placeholder="Search available..."
          />
          {/* -------- AVAILABLE RESULTS -------- */}
          <ul>
            {filteredAvailable.map((student) => (
              <li key={student.id}>
                <label className="flex">
                  <input type="checkbox" 
                    checked={selected.includes(student.id)}
                    onChange={() => toggleSelection(student.id)}
                  />
                  <span>{student.first_name} {student.last_name}</span>
                </label>
              </li>
            ))}
            {filteredAvailable.length === 0 && <li className="noneAvailable">No students found</li>}
          </ul>
          {/* -------- CONDITIONAL ENROLL BUTTON -------- */}
          {selected.length > 0 && (
            <button className="enrollBtn" onClick={handleEnroll}>ENROLL</button>
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