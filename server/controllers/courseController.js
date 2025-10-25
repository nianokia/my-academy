import Course from "../models/Course.js";
import User from "../models/User.js";
import Prerequisite from "../models/Prerequisite.js";

// ------------ READ OPERATIONS ------------
// // -------- GET ALL COURSES --------
export const getAllCourses = async (req, res) => {
    try {
        // const userId = req.user.userId;
        // const user = await User.findByPk(userId, {
        //     include: [{ model: Course, as: 'createdCourses' }],
        // });

        // if (!user) throw new Error("User is not associated to Course");
        // const courses = await Course.findAll({
        //     // --- fetch additional info from User model ---
        //     include: [{ model: User, as: "creator", attributes: ["id", "name", "email"] }],
        // });
        const courses = await Course.findAll();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error getting all courses', error: err.message });
    }
};



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


// ------------ DELETE OPERATIONS ------------
