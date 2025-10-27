import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConfig.js';
import 'dotenv/config';

// -------- DEFINE ENROLLMENT MODEL --------
const Enrollment = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    student_id: {
        type: DataTypes.UUID,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    course_id: {
        type: DataTypes.UUID,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: 'courses', key: 'id' },
    },
    status: {
        type: DataTypes.ENUM('enrolled', 'unenrolled'),
        defaultValue: 'enrolled',
        allowNull: false,
    },
}, {
    tableName: 'enrollments',
    timestamps: true,
    createdAt: 'enrolled_at',
    updatedAt: 'enrolled_at',
});

// -------- SYNC ENROLLMENT MODEL & TABLE --------
Enrollment.sync().then((data) => {
    console.log('Enrollment model & table synced successfully:', data);
}).catch((err) => {
    console.error('Error syncing Enrollment table & model: ', err);
});

export default Enrollment;