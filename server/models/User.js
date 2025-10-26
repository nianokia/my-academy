import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConfig.js';
import 'dotenv/config';

// // -------- VERIFY SEQUELIZE/ DATABASE CONNECTION --------
// async function testDBConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connection successful.');
//     } catch (err) {
//         console.error('Unable to connect to the database:', 
//             { message: err.message, code: err.parent?.code, detail: err.parent?.detail });
//             throw err;
//     }
// }
// testDBConnection();

// -------- DEFINE USER MODEL --------
const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    role: {
        type: DataTypes.ENUM('student', 'instructor'),
        allowNull: false,
    },
    major: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// // --- a user can haave many courses through created_by ---
// User.hasMany(Course, {
//     foreignKey: "created_by",
//     as: "creator",
// });

// // --- a user can belong to many courses through enrollments ---
// User.belongsToMany(Course, {
//     through: 'Enrollments',
//     as: 'courses',
//     foreignKey: 'user_id'
// });

// -------- SYNC USER MODEL & TABLE --------
User.sync().then((data) => {
    console.log('User model & table synced successfully:', data);
}).catch((err) => {
    console.error('Error syncing User table & model: ', err);
});

export default User;
