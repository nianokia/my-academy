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
Enrollment.hasOne(Grade, { foreignKey: "enrollment_id", as: "Grade", onDelete: "CASCADE" });

// --- A grade belongs to an enrollment ---
Grade.belongsTo(Enrollment, { foreignKey: "enrollment_id", as: "Enrollment" });

// --- An Instructor assigns many grades ---
User.hasMany(Grade, { foreignKey: "assigned_by" });

// --- A grade belongs to an instuctor since they assigned it ---
Grade.belongsTo(User, { as: "instructor", foreignKey: "assigned_by" });

// --- Each enrollment belongs to one course ---
Enrollment.belongsTo(Course, { foreignKey: "course_id", as: "Course" });

// --- Each enrollment belongs to one student ---
Enrollment.belongsTo(User, { foreignKey: "student_id", as: "Student" });

// --- A course can have many enrollments ---
Course.hasMany(Enrollment, { foreignKey: "course_id", as: "Enrollments" });

// --- A student (User) can have many enrollments ---
User.hasMany(Enrollment, { foreignKey: "student_id", as: "Enrollments" });

export { User, Course, Enrollment, Prerequisite, Grade };