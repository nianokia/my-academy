import { useNavigate } from "react-router";

const StudentGrades = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <button onClick={handleBack} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <img src="/src/assets/back.svg" style={{ width: "20px", textAlign: "right", marginRight: "475px", marginTop: "20px" }} alt="Home" />
      </button>
      <h1>Student Grades</h1>
    </>
  );
};

export default StudentGrades;
