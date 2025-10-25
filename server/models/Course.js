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