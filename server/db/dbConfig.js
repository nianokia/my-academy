import { Sequelize } from "sequelize";

// -------- INITIALIZE Sequelize & CONNECT with database --------
const sequelize = new Sequelize(process.env.DATABASE_URI, {
  dialect: "postgres",
  logging: false,
});

export default sequelize;