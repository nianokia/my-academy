import { request } from "express";
import app from "../server";
import sequelize from "../db/dbConfig";
import { User, Course, Enrollment } from "../models/associations"
import { beforeAll, describe, expect, test } from '@jest/globals';

describe("Enrollment API", () => {
    let student, course, token;

    // --- execute before all tests ---
    beforeAll(async () => {
        await sequelize.sync({ force: true });

        //  ------- CREATE TEST USER -------
        student = await User.create({ 
            first_name: "Jane",
            last_name: "Doe",
            email: "jdoe@gmail.com",
            password_hash: "jdoe",
            role: "student"
        });
        //  ------- CREATE TEST COURSE -------
        course = await Course.create({
            name: "Test 101",
            credits: 3,
            enrollment_limit:  10,
            created_by: student.id,
        });

        // ------- CREATE MOCK TOKEN -------
        token = "mock-jwt-token"
    })


    // ------- TEST STUDENT ENROLLMENT -------
    test("enrolls student in a course", async () => {
        const res = await request(app);
    });

    // ------- TEST FETCHING STUDENT'S ENROLLED COURSES -------
    test("fetches all courses student is enrolled in", async () => {
        const res = await request(app);
    })
})