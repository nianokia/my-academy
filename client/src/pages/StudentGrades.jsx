import { useNavigate } from "react-router";

const StudentGrades = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <button onClick={handleBack} className="backBtn">
        <img src="/src/assets/back.svg" alt="Left Arrow signifying a back button" />
      </button>
      <h1>Student Grades</h1>
    </>
  );
};

export default StudentGrades;
