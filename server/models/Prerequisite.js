import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConfig.js';
import 'dotenv/config';

// -------- DEFINE PREREQUISITE MODEL --------
const Prerequisite = sequelize.define('Prerequisite', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    course_id: {
        type: DataTypes.UUID,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: 'courses', key: 'id' },
        onDelete: 'CASCADE',
    },
    prerequisite_course_id: {
        type: DataTypes.UUID,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: 'courses', key: 'id' },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'prerequisites',
});

// -------- SYNC PREREQUISITE MODEL & TABLE --------
Prerequisite.sync().then((data) => {
    console.log('Prerequisite model & table synced successfully:', data);
}).catch((err) => {
    console.error('Error syncing Prerequisite table & model: ', err);
});

export default Prerequisite;