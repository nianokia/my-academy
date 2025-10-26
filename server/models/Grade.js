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

// -------- DEFINE GRADE MODEL --------
const Grade = sequelize.define('Grade', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    enrollment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    assigned_by: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
    },
}, {
    tableName: 'grades',
    timestamps: true,
    createdAt: 'assigned_at',
    updatedAt: 'assigned_at',
});

// -------- SYNC GRADE MODEL & TABLE --------
Grade.sync().then((data) => {
    console.log('Grade model & table synced successfully:', data);
}).catch((err) => {
    console.error('Error syncing Grade table & model: ', err);
});

export default Grade;