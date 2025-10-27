import { useNavigate } from "react-router";

export const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleBack} className="backBtn">
      <img src="/src/assets/back.svg" alt="Left Arrow signifying a back button" />
    </button>
  )
}

export const calculateGPA = (grades) => {
  // --- if no grades then GPA is 0 automatically ---
  if (!grades || grades.length === 0) return 0;

  const scale = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D": 1.0, "F": 0.0,
  };

  // --- move through each index to find sum of all scaledGrades ---
  const total = grades.reduce((sum, g) => sum + (scale[g.grade] || 0), 0);
  // --- find average rounding to the nearest hundreth ---
  return (total / grades.length).toFixed(2);
};

