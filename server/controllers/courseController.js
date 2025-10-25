import Course from "../models/Course.js";
import User from "../models/User.js";

// ------------ READ OPERATIONS ------------
// // -------- GET ALL COURSES --------
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll({
            // --- fetch additional info from User model ---
            include: [{ model: User, as: "creator", attributes: ["id", "name", "email"] }],
        });
        res.json(courses);
        console.log(`Courses: ${courses}`);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// ------------ CREATE OPERATIONS ------------


// ------------ UPDATE OPERATIONS ------------


// ------------ DELETE OPERATIONS ------------
