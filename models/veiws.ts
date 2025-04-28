import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import { PostCreate, Posts } from "../types/posts";
import { ViewCreate, Views } from "../types/views";

class View extends Model<Views, ViewCreate> implements Views {
  public id!: number;
  public post_id!: number;
  public blog_id!: number;
  public views_count!: number;
}

View.init(
  {
    blog_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.NUMBER,
    },
    views_count: {
      type: DataTypes.NUMBER,
    },
  },
  { sequelize, tableName: "views", timestamps: false }
);
View.hasMany(View, { foreignKey: "id" });
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Table created successfully!");
  })
  .catch((err) => {
    // console.log("Error while creating table:", err);
  });

export default View;
