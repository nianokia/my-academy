import User from "./User.js";
import Course from "./Course.js";
import Enrollment from "./Enrollment.js";

Course.belongsTo(User, { foreignKey: "created_by", as: "instructor" });
User.hasMany(Course, { foreignKey: "created_by", as: "courses" });

Course.belongsToMany(User, { through: Enrollment, as: "students", foreignKey: "course_id", otherKey: "student_id" });
User.belongsToMany(Course, { through: Enrollment, as: "enrolledCourses", foreignKey: "student_id", otherKey: "course_id" });

export { User, Course, Enrollment };

// // --- a user can haave many courses through created_by ---
// User.hasMany(Course, {
//     foreignKey: "created_by",
//     as: "creator",
// });

// // --- a user can belong to many courses through enrollments ---
// User.belongsToMany(Course, {
//     through: 'Enrollments',
//     as: 'courses',
//     foreignKey: 'user_id'
// });

// Course.belongsTo(User, {
//     foreignKey: "created_by",
//     as: "creator",
// });

// // --- a course can belong to many students through enrollments ---
// Course.belongsToMany(User, {
//     through: 'Enrollments',
//     as: 'students',
//     foreignKey: 'course_id'
// });