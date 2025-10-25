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

// -------- DEFINE PREREQUISITE MODEL --------
const Prerequisite = sequelize.define('Prerequisite', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    course_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    prerequisite_course_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
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