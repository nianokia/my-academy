import { Grade, Enrollment, Course, User } from "../models/associations.js";

// ------------ READ OPERATIONS ------------
// -------- GET STUDENT GRADES --------
export const getStudentGrades = async (req, res) => {
    try {
        const { studentId } = req.params;
        // --- collect all of a student's enrollments including course & assigned instructor name ---
        const enrollments = await Enrollment.findAll({
            where: { student_id: studentId },
            include: [
                { model: Course, attributes: ["id", "name", "credits"] },
                { model: Grade, include: [{ 
                    model: User, as: "instructor", attributes: ["first_name", "last_name"] 
                }]},
            ],
        });

        res.status(200).json(enrollments);
    } catch (err) {
        console.error("Error fetching student grades:", err);
        res.status(500).json({ message: "Error fetching student grades", error: err.message });
    }
};

// ------------ POST OPERATIONS ------------
// -------- ASSIGN OR UPDATE GRADE --------
export const assignGrade = async (req, res) => {
    try {
        const { enrollmentId } = req.params;
        const { grade } = req.body;
        // --- this userId is the instructor because thats how assigned the grade ---
        const instructorId = req.user.userId;

        const enrollment = await Enrollment.findByPk(enrollmentId);
        if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

        // --- collect existing grad (if it exists) ---
        let existingGrade = await Grade.findOne({ where: { enrollment_id: enrollmentId } });

        // --- if it exists replace it with the new grade & assign instructor who assigned it ---
        // --- if it doesn't exist create a new grade ---
        if (existingGrade) {
            existingGrade.grade = grade;
            existingGrade.assigned_by = instructorId;
            await existingGrade.save();
        } else {
            existingGrade = await Grade.create({
                enrollment_id: enrollmentId,
                grade,
                assigned_by: instructorId,
            });
        }

        res.status(200).json({ message: "Grade assigned successfully", grade: existingGrade });
    } catch (err) {
        console.error("Error assigning grade:", err);
        res.status(500).json({ message: "Error assigning grade", error: err.message });
    }
};
