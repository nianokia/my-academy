// import User from "../models/User.js";
// import Course from "../models/Course.js";
import { User, Course, Enrollment } from "../models/associations.js";

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

        // --- collect course data including prereqs ---
        const course = await Course.findByPk(courseId, {
            include: [{ association: "prerequisites" }],
        });
        if (!course) return res.status(404).json({ message: "Course not found" });

        // -------- CALCULATE SEAT AVAILABILITY --------
        // --- count # 'enrolled' statuses linked to the courseId ---
        const enrolledCount = await Enrollment.count({
            where: { course_id: courseId, status: "enrolled" },
        });

        // --- if selected students surpass available seats then send message ---
        if (enrolledCount + studentIds.length > course.enrollment_limit){
            return res.status(400).json({
                message: `Course full: ${course.enrollment_limit - enrolledCount} seats left`,
            })
        }

        // -------- VERIFY PREREQUISITES --------
        // --- array to list unqualified students ---
        const unqualified = [];

        for (const studentId of studentIds) {
            // --- collect all prereq ids for the course ---
            // const prereqIds = course.prerequisites.map((prereq) => prereq.prerequisite_course_id);
            const prereqIds = course.prerequisites.map((prereq) => prereq.id);
            console.log("Prerequisites for course:", prereqIds);

            if (prereqIds.length > 0) {
                // --- verify if student completed all prereqs ---
                const completed = await Enrollment.findAll({
                    where: { student_id: studentId, course_id: prereqIds, status: "enrolled" }
                });
                
                // --- if student has less prereqs completed than required then add them to unqualified array ---
                if (completed.length < prereqIds.length) unqualified.push(studentId);
            }
        }

        // --- notify user that some of the selected students are not qualified to enroll ---
        if (unqualified.length > 0) {
            return res.status(400).json({
                message: "Some students do not have all the prerequisites",
                unqualified,
            });
        }

        // -------- PROCEED WITH ENROLLMENT --------

        // --- collect detailed list of all identified students ---
        const students = await User.findAll({ where: { id: studentIds } });
        if (!students) return res.status(404).json({ message: "No student(s) found" });

        const selectedCourse = await Course.findByPk(courseId);

        // --- addStudents is derived from Course.belongsToMany association ---
        await selectedCourse.addStudents(students, { through: { status: "enrolled" } });

        res.status(200).json({ message: "Student(s) enrolled successfully" });
    } catch (err) {
        console.error("Error enrolling student(s): ", err);
        res.status(500).json({ message: "Error enrolling student(s)", error: err.message });
    }
};


// ------------ DELETE OPERATIONS ------------
// -------- UNENROLL STUDENT --------
export const unenrollStudent = async (req, res) => {
    try {
        const { courseId, studentId } = req.params;
        const course = await Course.findByPk(courseId);
        const student = await User.findByPk(studentId);

        if (!course || !student) return res.status(404).json({ message: "Course or Student not found" });

        // --- removeStudent is derived from Course.belongsToMany association ---
        await course.removeStudent(student);

        res.status(200).json({ message: "Student unenrolled successfully" });
    } catch (err) {
        console.error("Error unenrolling student: ", err);
        res.status(500).json({ message: "Error unenrolling student", error: err.message });
    }
};