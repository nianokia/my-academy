# My Academy
My Academy is a FS web application that allows instructors to manage courses, enrollments, and grades, while students can browse available courses, enroll, and track their academic progress in an interactive dashboard.  


## ✨ Features  

### 🎓 Instructor Features  
- Manage course creation, editing, and deletion  
- View all enrolled students per course  
- Enroll or unenroll students directly  
- Assign and update grades using an A+ - F grading scale  
- Track student performance with automated GPA calculation  
- Access historical grading records with timestamps  

### 🧑‍🎓 Student Features  
- Browse and filter available courses  
- Enroll or unenroll from available courses  
- View enrolled courses and course details  
- View current grades and grade history  
- See automatically calculated GPA with color-coded grade visualization  

### ⚙️ System Features  
- Full CRUD operations for courses, users, enrollments, and grades  
- Role-based authentication & authorization (Student / Instructor)  
- Real-time GPA calculation  
- Color-coded grade indicators (A = green, F = red, etc.)  
- Date tracking for grade assignment history  
- Modular RESTful API architecture  

---

## 🧰 Technologies Used  

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

**Frontend:** React (Vite), React Router, Axios  
**Backend:** Node.js, Express.js, Sequelize  
**Database:** PostgreSQL  
**Authentication:** JWT (JSON Web Tokens)  
**Additional Tools:** Nodemon, Concurrently, Dotenv  

---

## 🎬 Demo  

![demo](https://media4.giphy.com/media/v1.Y2/giphy.gif)

<!-- _Full [Demo](https://youtu.be/r6pMR) on YouTube_ -->

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
* **For both the client (frontend) and server (backend) directories:**
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

    * This will install all the necessary packages for both the frontend (Vite and React) and backend (Express.js, cors, and nodemon).

### 3. Environment Variables
Create a .env file in the server folder.
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
2. There are two ways to restore the DB dump file the project already contains:
    * A- If you have postgres, set it up with your user: 

        ```psql -U <your_user> -d my_academy -f db.sql```
        * Make sure that you have your Postgres password on hand as the console will ask for it.

    * B- If your initial configuration of postgres doesn't require a User:

        ```psql -d my_academy -f db.sql```


### 5. Run the App

***Run frontend & backend concurrently from the server directory:**    
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


## 🛸 Future Implementations
### Stretch Goals :
* Utilize 3rd party styling framework, like Bootstrap or Tailwind.CSS
* Present a pop-up modal on form submission to allow user to review and update submission before sending it

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
