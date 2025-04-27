import sequelize from "./config/db";
import app from "./middlewares/app";
import env from "dotenv";
env.config();

const dataseConnection = async () => {
  try {
    sequelize.authenticate();
    console.log("Connected to db!");
  } catch (error) {
    console.log("Db connection error:", error);
  }
};
dataseConnection();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on:", process.env.PORT);
});
