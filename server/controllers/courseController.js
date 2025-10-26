import Course from "../models/Course.js";
import User from "../models/User.js";
import Prerequisite from "../models/Prerequisite.js";
import Enrollment from "../models/Enrollment.js";

// ------------ READ OPERATIONS ------------
// // -------- GET ALL COURSES --------
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error getting all courses', error: err.message });
    }
};

// // -------- GET ALL USER COURSES --------
export const getUserCourses = async (req, res) => {
    try {
        const userId = req.user.userId;
        const courses = await Course.findAll({ where: { created_by: userId }});
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error getting all user\'s courses', error: err.message });
   }
};

// -------- GET SINGLE COURSE BY ID --------
export const getCourseById = async (req, res) => {
    try {
        // --- find course by ID from the URL ---
        const { courseId } = req.params;
        // --- collect all course data including prereq info ---
        const course = await Course.findByPk(courseId, {
            include: [{
                association: "prerequisites",
                attributes: ["id", "name"],
                through: { attributes: [] },
            }],
        });

        if (!course) return res.status(404).json({ message: "Course not found" });

        // --- count enrolled students ---
        const enrolledCount = await Enrollment.count({
            where: { course_id: courseId, status: "enrolled" },
        });

        // --- add seat availability & enrolledCount to course response ---
        const allCourseData = {
            ...course.toJSON(),
            seats_available: course.enrollment_limit - enrolledCount,
            enrolled_count: enrolledCount,
        };

        res.status(200).json(allCourseData);
    } catch (err) {
        console.error("Error fetching course details", err);
        res.status(500).json({ message: "Error fetching course details", error: err.message });
    }
}


// ------------ CREATE OPERATIONS ------------
// // -------- CREATE A COURSE --------
export const createCourse = async (req, res) => {
   try {
    const { name, credits, enrollment_limit, prerequisites } = req.body;
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ message: "Unauthorized: missing user id in token" });

    if (!name || !credits || !enrollment_limit) {
        return res.status(400).json({ message: "Missing required course fields" });
    }

    // --- add new course to table (exclude prerequisites) ---
    const newCourse = await Course.create({
        name,
        credits,
        enrollment_limit,
        created_by: userId,
    });

    // --- if they selected prereqs, add each to the course_prerequisites table ---
    if (prerequisites?.length) {
        await Promise.all(
            prerequisites.map((prereq) =>
                Prerequisite.create({ course_id: newCourse.id, prerequisite_course_id: prereq })
            )
        );
    }

    res.status(201).json(newCourse);
   } catch (err) {
    console.error("createCourse error:", err);
    res.status(500).json({ message: 'Error creating course', error: err.message });
   }
};


// ------------ UPDATE OPERATIONS ------------
// // -------- UPDATE A COURSE --------
export const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const { name, credits, enrollment_limit } = req.body;
    try {
        const course = await Course.findByPk(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // --- Update user fields ---
        await course.update({
            name: name || course.name,
            credits: credits || course.credits,
            enrollment_limit: enrollment_limit || course.enrollment_limit,
        });

        // --- Get plain JS object ---
        const updatedCourse = course.get({ plain: true });
        res.status(200).json({ message: 'User updated successfully: ', course: updatedCourse });
    } catch (err) {
        res.status(500).json({ message: "Error updating course", error: err.message });
    }
};


// ------------ DELETE OPERATIONS ------------
// // -------- DELETE A COURSE --------
export const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findByPk(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // --- delete course ---
        await course.destroy();
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting course", error: err.message });
    }
};
