import User from "./User.js";
import Course from "./Course.js";
import Enrollment from "./Enrollment.js";
import Prerequisite from "./Prerequisite.js";
import Grade from "./Grade.js";

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

// --- One Enrollment has one Grade ---
Enrollment.hasOne(Grade, { foreignKey: "enrollment_id", onDelete: "CASCADE" });

// --- A grade belongs to an enrollment ---
Grade.belongsTo(Enrollment, { foreignKey: "enrollment_id" });

// --- An Instructor assigns many grades ---
User.hasMany(Grade, { foreignKey: "assigned_by" });

// --- A grade belongs to an instuctor since they assigned it ---
Grade.belongsTo(User, { as: "instructor", foreignKey: "assigned_by" });

export { User, Course, Enrollment, Prerequisite, Grade };