import User from "./User.js";
import Course from "./Course.js";
import Enrollment from "./Enrollment.js";
import Prerequisite from "./Prerequisite.js";

// --- Each course belongs to an instructor ---
Course.belongsTo(User, { foreignKey: "created_by", as: "instructor" });

// --- An instructor can have many courses ---
User.hasMany(Course, { foreignKey: "created_by", as: "courses" });

// --- A course can have multiple students ---
Course.belongsToMany(User, { through: Enrollment, as: "students", foreignKey: "course_id", otherKey: "student_id" });

// --- A student can have multiple courses ---
User.belongsToMany(Course, { through: Enrollment, as: "enrolledCourses", foreignKey: "student_id", otherKey: "course_id" });

// --- A course can have multiple prerequisite courses ---
Course.belongsToMany(Course, {
  as: "prerequisites",
  through: Prerequisite,
  foreignKey: "course_id",
  otherKey: "prerequisite_course_id",
});

// --- A course can be a prerequisite for many other courses ---
Course.belongsToMany(Course, {
  as: "dependentCourses",
  through: Prerequisite,
  foreignKey: "prerequisite_course_id",
  otherKey: "course_id",
});

export { User, Course, Enrollment, Prerequisite };