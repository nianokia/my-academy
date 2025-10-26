const InstructorEnrollments = () => {
  return (
    <div className="InstructorEnrollments">
      <h2>Instructor Enrollments</h2>
      <h3>Enrolled Students</h3>
      <ul style={{ textAlign: 'start' }}>
        <li>Lisa</li>
        <li>Henry</li>
      </ul>
      <h3>Available Students</h3>
      <ul style={{ textAlign: 'start' }}>
        <li>Tracy</li>
        <li>Gale</li>
        <li>Claire</li>
        <li>Mark</li>
      </ul>
      <button>ENROLL</button>
    </div>
  )
};

export default InstructorEnrollments;