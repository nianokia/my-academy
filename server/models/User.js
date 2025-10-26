import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConfig.js';
import 'dotenv/config';

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


// -------- SYNC USER MODEL & TABLE --------
User.sync().then((data) => {
    console.log('User model & table synced successfully:', data);
}).catch((err) => {
    console.error('Error syncing User table & model: ', err);
});

export default User;
