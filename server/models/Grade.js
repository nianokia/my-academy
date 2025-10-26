import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConfig.js';
import 'dotenv/config';

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