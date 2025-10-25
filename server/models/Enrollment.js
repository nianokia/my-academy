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

// -------- DEFINE ENROLLMENT MODEL --------
const Enrollment = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    student_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    course_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('enrolled', 'unenrolled'),
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