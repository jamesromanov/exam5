import { Sequelize } from "sequelize";
import env from "dotenv";
env.config();

if (!process.env.DATABASE) throw new Error("DATABASE is missing in env!");
const sequelize = new Sequelize(process.env.DATABASE, {
  dialect: "postgres",
  logging: console.log,
});

export default sequelize;
