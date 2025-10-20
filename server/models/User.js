import { Sequelize, DataTypes } from 'sequelize';
import 'dotenv/config';

// -------- INITIALIZE Sequelize & CONNECT with database --------
const sequelize = new Sequelize(process.env.DATABASE_URI, {
    dialect: 'postgres',
    logging: false,
});

// -------- VERIFY SEQUELIZE/ DATABASE CONNECTION --------
async function testDBConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection successful.');
    } catch (err) {
        console.error('Unable to connect to the database:', 
            { message: err.message, code: err.parent?.code, detail: err.parent?.detail });
            throw err;
    }
}
testDBConnection();

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
        type: DataTypes.ENUM('student', 'teacher'),
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
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'users',
    timestamps: false,
});

// -------- SYNC USER MODEL & TABLE --------
User.sync().then((data) => {
    console.log('User model & table synced successfully:', data);
}).catch((err) => {
    console.error('Error syncing User table & model: ', err);
});

export default User;
