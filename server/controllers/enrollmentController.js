// import User from "../models/User.js";
// import Course from "../models/Course.js";
import { User, Course } from "../models/associations.js";

// ------------ READ OPERATIONS ------------
// -------- GET ENROLLED STUDENTS FOR COURSE --------
export const getEnrolledStudents = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findByPk(courseId, {
            include: { model: User, as: "students", attributes: ["id", "first_name", "last_name", "email"] },
        });

        if (!course) return res.status(404).json({ message: "Course not found" });
        res.status(200).json(course.students);
    } catch (err) {
        console.error("Error fetching enrolled students: ", err);
        res.status(500).json({ message: "Error fetching enrolled students", error: err.message });
    }
};

// ------------ POST OPERATIONS ------------
// -------- ENROLL STUDENTS --------
export const enrollStudents = async (req, res) => {
    try {
        const { courseId } = req.params;
        // --- collect array of ids ---
        const { studentIds } = req.body;

        const course = await Course.findByPk(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // --- collect detailed list of all identified students ---
        const students = await User.findAll({ where: { id: studentIds } });
        if (!students) return res.status(404).json({ message: "No student(s) found" });

        // --- addStudents is derived from Course.belongsToMany association ---
        await course.addStudents(students);

        res.status(200).json({ message: "Student(s) enrolled successfully" });
    } catch (err) {
        console.error("Error enrolling student(s): ", err);
        res.status(500).json({ message: "Error enrolling student(s)", error: err.message });
    }
};


// ------------ DELETE OPERATIONS ------------
// -------- UNENROLL STUDENTS --------
export const unenrollStudents = async (req, res) => {
    try {
        const { courseId } = req.params;
        // --- collect array of ids ---
        const { studentIds } = req.body;

        const course = await Course.findByPk(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // --- collect detailed list of all identified students ---
        const students = await User.findAll({ where: { id: studentIds } });
        if (!students) return res.status(404).json({ message: "No student(s) found" });

        // --- removeStudents is derived from Course.belongsToMany association ---
        await course.removeStudents(students);

        res.status(200).json({ message: "Student(s) unenrolled successfully" });
    } catch (err) {
        console.error("Error unenrolling student(s): ", err);
        res.status(500).json({ message: "Error unenrolling student(s)", error: err.message });
    }
};