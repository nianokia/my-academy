import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConfig.js';
import 'dotenv/config';

// -------- DEFINE COURSE MODEL --------
const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    credits: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    enrollment_limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
}, {
    tableName: 'courses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// -------- SYNC COURSE MODEL & TABLE --------
Course.sync().then((data) => {
    console.log('Course model & table synced successfully:', data);
}).catch((err) => {
    console.error('Error syncing Course table & model: ', err);
});

export default Course;