import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import { FollowerCreate, Followers } from "../types/Follower";
import Blog from "./blog.model";

class Follower extends Model<Followers, FollowerCreate> implements Followers {
  public id!: number;
  public parent_id!: number;
  public post_id!: number;
  public blog_id!: number;
  public follower_id!: number;
  public createdAt!: Date;
  public isActive!: boolean;
}
Follower.init(
  {
    parent_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.NUMBER,
    },
    blog_id: {
      type: DataTypes.NUMBER,
    },
    follower_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, tableName: "followers", timestamps: false }
);
Follower.belongsTo(Blog, { foreignKey: "blog_id" });
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Table created successfully!");
  })
  .catch((err) => {
    // console.log("Error while creating table:", err);
  });

export default Follower;
