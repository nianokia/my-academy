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
    console.error("Error: ", err);
    res.status(500).json({ message: "Error fetching enrolled students", error: err.message });
  }
};