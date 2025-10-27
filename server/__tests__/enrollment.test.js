import request from "supertest";
import app from "../server.js";
import sequelize from "../db/dbConfig.js";
import "../models/associations.js"
import { User, Course } from "../models/associations"
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';



describe("Enrollment API", () => {
    let student, course, token;

    // --- execute before all tests ---
    beforeAll(async () => {
        try {
            await sequelize.authenticate();
            console.log("Database connection successful!");
            
            // --- SYNCHRONIZE TABLES: FORCE=TRUE drops & recreates tables ---
            await sequelize.sync({ force: true });
            console.log("Database SYNCED (tables created)!");

            //  ------- CREATE TEST STUDENT -------
            student = await User.create({
                first_name: "Jane",
                last_name: "Doe",
                email: "jdoe@gmail.com",
                password_hash: "jdoe",
                role: "student"
            });
            //  ------- CREATE TEST INSTRUCTOR -------
            const instructor = await User.create({
                first_name: "Prof",
                last_name: "X",
                email: "prof@example.com",
                password_hash: "prof",
                role: "instructor"
            });
            //  ------- CREATE TEST COURSE -------
            course = await Course.create({
                name: "Test 101",
                credits: 3,
                enrollment_limit:  10,
                created_by: instructor.id
            });
            
            
        } catch (err) {
            console.error("Unable to connect or sync to the database:", err);
            // --- Re-throw the error to fail the test suite if setup fails ---
            throw err; 
        }
        
        // ------- CREATE MOCK TOKEN -------
        token = "mock-jwt-token"
    });

    afterAll(async () => {
        try {
            await sequelize.drop();
        } catch (err) {
            console.error('Error dropping DB during cleanup:', err);
        }
        await sequelize.close();
    });

    // ------- BASIC TEST -------
    describe("Basic API Check", () => {
        it("should return 404 for unknown route", async () => {
            const res = await request(app).get("/api/unknown-route");
            expect(res.statusCode).toBe(404);
        });
    });


    // ------- TEST STUDENT ENROLLMENT -------
    test("enrolls student in a course", async () => {
        // ---
        const res = await request(app)
            .post(`/api/enrollments/student/${student.id}/enroll/${course.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({}) // send an empty object instead of the Sequelize instance
        
        // --- expect status to be 200 ---
        expect(res.statusCode).toBe(200);
        // --- expect message to have text "enrolled"
        expect(res.body.message).toMatch(/enrolled/i);
    });

    // ------- TEST FETCHING STUDENT'S ENROLLED COURSES -------
    test("fetches all courses student is enrolled in", async () => {
        const res = await request(app)
            .get(`/api/enrollments/student/${student.id}`)
            .set("Authorization", `Bearer ${token}`);

        // --- expect status to be 200 ---
        expect(res.statusCode).toBe(200);
        // --- expect the res.body to be an array ---
        expect(Array.isArray(res.body)).toBe(true);
    })
})