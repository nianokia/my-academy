import { useNavigate } from "react-router";

// ----------- BACK BUTTON --------
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

export const gradeOptions = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];

// ----------- CALCULATE GPA --------
export const calculateGPA = (grades) => {
  // --- if no grades then GPA is 0 automatically ---
  if (!grades || grades.length === 0) return 0;

  const scale = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "D-": 0.7,
    "F": 0.0,
  };

  // --- move through each index to find sum of all scaledGrades ---
  const total = grades.reduce((sum, g) => sum + (scale[g.grade] || 0), 0);
  // --- find average rounding to the nearest hundreth ---
  return (total / grades.length).toFixed(2);
};

// ----------- GRADE COLOR MAP --------
export const getGradeColor = (grade) => {
  if (!grade) return "#ccc"; // neutral gray for N/A

  const colorMap = {
    "A+": "#006400", // dark green
    "A":  "#228B22", // forest green
    "A-": "#32CD32", // lime green

    "B+": "#9ACD32", // yellow-green
    "B":  "#ADFF2F", // green-yellow
    "B-": "#CCCC00", // olive

    "C+": "#FFD700", // gold
    "C":  "#FFA500", // orange
    "C-": "#FF8C00", // dark orange

    "D+": "#FF6347", // tomato
    "D":  "#FF4500", // orange-red
    "D-": "#d84100", // firebrick

    "F": "#B22222",
  };

  return colorMap[grade] || "#999";
};


