import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import { logger, loggerUpdate } from "../types/logger";

class Logger extends Model<logger, loggerUpdate> implements logger {
  public id!: number;
  public time!: string;
  public ip!: string;
  public method!: string;
}
Logger.init(
  {
    time: { type: DataTypes.STRING },
    ip: { type: DataTypes.STRING },
    method: { type: DataTypes.STRING },
  },
  { sequelize, tableName: "logger", timestamps: false }
);
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Table created successfully!");
  })
  .catch((err) => {
    // console.log("Error while creating table:", err);
  });

export default Logger;
