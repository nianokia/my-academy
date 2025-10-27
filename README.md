# My Academy
My Academy is a full-stack web application that allows **instructors** to manage courses, enrollments, and student grades, while **students** can view available courses, enroll, track grades, and calculate their GPA. 

This project integrates a Postgres database with an Express.js backend and a modern React + Vite frontend.

## ✨ Features  

### 🎓 Instructor Features  
- Create, edit, and manage courses
- Enroll and unenroll students from courses
- Enforce prerequisites and seat availability checks
- Assign, update, and view grades (A+–F scale)
- Track grading history and assignment dates
- Color-coded grade visualization for performance clarity 

### 🧑‍🎓 Student Features  
- View available and enrolled courses
- Enroll or unenroll from courses
- View current grades and grading history
- Automatic GPA calculation
- Color-coded grade display by performance
- View course details including prerequisites and seat availability

---

## 🧰 Technologies Used  

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
### Backend
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)


## ⚙️ Dependencies Overview

| Package | Purpose |
|----------|----------|
| **React / Vite** | Frontend framework & dev environment |
| **Axios** | Handles HTTP requests between frontend & backend |
| **Express.js** | Web framework for routing & middleware handling |
| **Sequelize** | ORM for interacting with PostgreSQL database |
| **pg / pg-hstore** | PostgreSQL driver & data serialization |
| **bcrypt** | Password hashing for user authentication |
| **jsonwebtoken (JWT)** | Secure token-based authentication |
| **dotenv** | Loads environment variables from `.env` file |
| **cors** | Enables cross-origin resource sharing |
| **concurrently** | Runs client & server concurrently in dev mode |
| **nodemon** | Auto-restarts server when backend files change |
---

## 🎬 Demo  
![demo](https://media4.giphy.com/media/v1.Y2/giphy.gif)

---
## 🗄️ Database Setup

**Database:** PostgreSQL  
**ORM:** Sequelize  

### Schema Overview
The application uses five main tables:

| Table | Description |
|--------|--------------|
| **users** | Stores all user data including role (student or instructor) |
| **courses** | Contains all course details & instructor associations |
| **enrollments** | Junction table linking students to courses |
| **grades** | Stores grades, instructor assignment, and timestamp |
| **prerequisites** | Manages many-to-many relationships between courses |

**Foreign Key Relationships:**
- `grades.assigned_by → users.id`
- `grades.enrollment_id → enrollments.id`
- `enrollments.course_id → courses.id`
- `enrollments.student_id → users.id`

A database dump file (`db.sql`) can be restored for quick setup.


---

## ⚙️ Setup Instructions  

### 1. Clone the Repository  
```bash
git clone git@github.com:nianokia/my-academy.git
```
(Optional) Remove the existing .git history if you want fresh ownership:
```bash
rm -rf .git
```

### 2. Install Dependencies  
* **Backend Setup:**
    ```bash
    cd server
    npm install
    ```
* **Frontend Setup:**

    ```bash
    cd client
    npm install
    ```

This will install all the necessary packages for both the frontend (Vite and React) and backend (Express.js, cors, and nodemon).

### 3. Environment Variables
Create 2 .env files (one in the server and the other in the client).
* **Backend Setup:**
    ```bash
    <!-- Define your server listening port -->
    PORT={yourServerListeningPort}
    DOMAIN='http://localhost:{yourServerListeningPort}/'

    <!-- To connect to database -->
    DATABASE_URI='postgresql://localhost/{yourDatabaseName}'

    <!-- generate a random 64-char code (run openssl rand -base64 64 in terminal) -->
    JWT_SECRET='generatedSecret'
    ```
* **Frontend Setup:**
    ```bash
    <!-- VITE_DOMAIN variable is different depending on the environment (local vs production) -->
    VITE_DOMAIN='http://localhost:{yourServerListeningPort}'
    ```

### 4. Database Setup

1. Create the database:

    ```CREATE DATABASE my_academy;```
2. There are 2 ways to restore the DB dump file from root folder:
    * A- If you have postgres, set it up with your user: 

        ```psql -U <your_user> -d my_academy -f server/db/db.sql```
        * Make sure that you have your Postgres password on hand as the console will ask for it.

    * B- If your initial configuration of postgres doesn't require a User:

        ```psql my_academy -f server/db/db.sql```


### 5. Run the App

**Run frontend & backend concurrently from the server directory:**    
```bash
cd server
npm run dev
```

The app should now be running at `http://localhost:5173` *or whatever URL the server specifies*.

---
## 🧩 Implementation Details

**Backend**
* `server.js` configures Express routes, JWT authentication, and Sequelize models.
* `controllers/` handle CRUD logic for users, courses, enrollments, grades and authentication.
* `models/` define Sequelize models with relationships (User, Course, Enrollment, Grade, etc.).

**Frontend**
* `StudentCourses.jsx` — lists available/enrolled courses with search & enroll/ unenroll features.
* `InstructorCourses.jsx` — allows instructors to manage & edit their created courses and enroll/ unenroll student(s).
* `InstructorGrades.jsx` — manage, assign, and update student grades with GPA calculation & grade history modal.
* `StudentGrades.jsx` — view enrolled courses details, GPA, and grade history with color-coded grade indicators.
* `AllCourses.jsx` – view, search, sort, and filter all courses in table or list view.
* `UserTable.jsx` – view, search, sort, and filter all users in a table.
* `UserProfile.jsx` – view account details, edit or delete account.

## 🌐 API Routes Overview
### Auth Routes
|Method	| Endpoint	| Description |
|-------|----------|--------------|
|POST	|/api/auth/register|	Register new user |
|POST	|/api/auth/login	|Login and receive JWT token |
### Course Routes
|Method	|Endpoint   | Description |
|-------|----------|--------------|
|GET	|/api/courses	|Fetch all courses |
|GET	|/api/courses/:id	|Fetch single course by ID |
|POST	|/api/courses	|Create new course (Instructor only) |
|PUT	|/api/courses/:id	|Update course (Instructor only) |
DELETE	|/api/courses/:id	|Delete course (Instructor only) |
### Enrollment Routes
|Method	|Endpoint	|Description |
|-------|----------|--------------|
|GET	|/api/enrollments/:studentId	|Fetch all enrollments for a student |
|POST	|/api/enroll/:studentId/:courseId	|Enroll a student (checks prerequisites/seats) |
|DELETE	|/api/unenroll/:studentId/:courseId	|Unenroll student from a course |
### Grade Routes
|Method	|Endpoint	|Description |
|-------|----------|--------------|
|GET	|/api/grades/student/:studentId	|Fetch grades for a student |
|GET	|/api/grades/history/:enrollmentId	|Fetch grade history for an enrollment |
|POST	|/api/grades/:enrollmentId	|Assign or update a grade (Instructor only) |

## 🛸 Future Implementations
* Utilize 3rd party styling framework, like Bootstrap or Tailwind.CSS
* Put Instructor & Student files in separate folder (Ex: `/src/pages/instructor`)

## 📚 Resources
(*Refer to official documentation for setup specifics*)
* [Vite Documentation](https://vitejs.dev/)
* [Express Documentation](https://expressjs.com/)
* [Sequelize Documentation](https://sequelize.org/)

## 👩‍💻 About the Developer
Nia Wright is a software engineer who primarily works with HTML, CSS, Javascript, and React. Check out her other [projects](https://niawright.netlify.app/)!

## 📄 License

MIT License

This project is open-source and licensed under the MIT License.
